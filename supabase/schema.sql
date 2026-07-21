-- ============================================================
-- Klickhafen CRM — Datenbankschema (RESET-Version)
--
-- So einspielen: Supabase-Dashboard → SQL Editor → dieses Skript einfügen →
-- "Run". Danach unter Authentication → Providers "Allow new users to sign up"
-- AUSSCHALTEN, damit sich niemand außer dir anlegen kann.
--
-- ⚠️  ACHTUNG: Der DROP-Block unten LÖSCHT die sechs CRM-Tabellen samt Inhalt
--    und legt sie sauber neu an. Solange keine echten Daten drin sind, ist das
--    unkritisch — NICHT ausführen, wenn du später echte Kundendaten hast.
--
-- Geldmodell (der Kern): Einnahmen und Ausgaben tragen ein Kennzeichen, ob sie
-- DIR gehören ('umsatz' / 'eigen') oder nur DURCHLAUFEN ('durchlauf') — z. B.
-- Google-Ads-Budget des Kunden. Dein Gewinn zählt nur die eigenen Posten.
-- ============================================================

-- --- Reset: ALLE Tabellen im public-Schema entfernen ------------------------
-- Löscht jede vorhandene Tabelle in "public", egal wie sie heißt (deine
-- bisherigen Versuche also inklusive). Supabases eigene Schemas (auth, storage,
-- …) liegen NICHT in public und bleiben unberührt. CASCADE räumt Abhängig-
-- keiten, Policies und Indizes mit ab.
do $$
declare r record;
begin
  for r in (select tablename from pg_tables where schemaname = 'public')
  loop
    execute format('drop table if exists public.%I cascade;', r.tablename);
  end loop;
end $$;

create extension if not exists "pgcrypto";

-- --- Kunden -----------------------------------------------------------------
create table if not exists public.kunden (
  id        uuid primary key default gen_random_uuid(),
  name      text not null,
  firma     text,
  email     text,
  telefon   text,
  adresse   text,
  notiz     text,
  erstellt  timestamptz not null default now()
);

-- --- Projekte ---------------------------------------------------------------
create table if not exists public.projekte (
  id        uuid primary key default gen_random_uuid(),
  kunde_id  uuid references public.kunden(id) on delete cascade,
  name      text not null,                       -- z. B. "Website xyz.com"
  status    text not null default 'aktiv'
              check (status in ('angebot', 'aktiv', 'abgeschlossen')),
  notiz     text,
  erstellt  timestamptz not null default now()
);

-- --- Einnahmen-Posten -------------------------------------------------------
-- art: 'umsatz'    = dein Ertrag (zählt zum Gewinn)
--      'durchlauf' = Kundengeld, das du weiterreichst (zählt NICHT zum Gewinn)
create table if not exists public.posten (
  id           uuid primary key default gen_random_uuid(),
  projekt_id   uuid not null references public.projekte(id) on delete cascade,
  bezeichnung  text not null,                    -- z. B. "Website", "Ads-Budget"
  betrag       numeric(12, 2) not null default 0,
  art          text not null default 'umsatz'
                 check (art in ('umsatz', 'durchlauf')),
  bezahlt      boolean not null default false,
  datum        date not null default current_date,
  erstellt     timestamptz not null default now()
);

-- --- Ausgaben ---------------------------------------------------------------
-- art: 'eigen'     = deine Betriebsausgabe (zählt gegen den Gewinn)
--      'durchlauf' = im Kundenauftrag ausgegeben, z. B. an Google gezahlt
create table if not exists public.ausgaben (
  id           uuid primary key default gen_random_uuid(),
  projekt_id   uuid references public.projekte(id) on delete set null,
  bezeichnung  text not null,
  betrag       numeric(12, 2) not null default 0,
  art          text not null default 'eigen'
                 check (art in ('eigen', 'durchlauf')),
  kategorie    text,
  datum        date not null default current_date,
  erstellt     timestamptz not null default now()
);

-- --- Rechnungen (Kleinunternehmer § 19 UStG, keine USt) ---------------------
create table if not exists public.rechnungen (
  id           uuid primary key default gen_random_uuid(),
  projekt_id   uuid references public.projekte(id) on delete set null,
  kunde_id     uuid references public.kunden(id) on delete set null,
  nummer       text not null unique,             -- z. B. "2026-001"
  datum        date not null default current_date,
  faellig      date,
  status       text not null default 'entwurf'
                 check (status in ('entwurf', 'gesendet', 'bezahlt')),
  notiz        text,
  erstellt     timestamptz not null default now()
);

create table if not exists public.rechnung_posten (
  id            uuid primary key default gen_random_uuid(),
  rechnung_id   uuid not null references public.rechnungen(id) on delete cascade,
  bezeichnung   text not null,
  menge         numeric(12, 2) not null default 1,
  einzelpreis   numeric(12, 2) not null default 0,
  position      int not null default 0
);

-- --- Row-Level-Security -----------------------------------------------------
-- Einzelnutzer-CRM: nur eingeloggte Nutzer dürfen lesen/schreiben. Da sich
-- außer dir niemand anlegen kann (Signup aus + ADMIN_EMAIL-Sperre in der App),
-- ist "authenticated" hier gleichbedeutend mit "du".
alter table public.kunden          enable row level security;
alter table public.projekte        enable row level security;
alter table public.posten          enable row level security;
alter table public.ausgaben        enable row level security;
alter table public.rechnungen      enable row level security;
alter table public.rechnung_posten enable row level security;

do $$
declare t text;
begin
  foreach t in array array[
    'kunden','projekte','posten','ausgaben','rechnungen','rechnung_posten'
  ]
  loop
    execute format(
      'create policy %I on public.%I for all to authenticated using (true) with check (true);',
      t || '_alle', t
    );
  end loop;
end $$;

-- Indizes für die häufigen Abfragen.
create index if not exists idx_projekte_kunde   on public.projekte(kunde_id);
create index if not exists idx_posten_projekt   on public.posten(projekt_id);
create index if not exists idx_ausgaben_projekt on public.ausgaben(projekt_id);
create index if not exists idx_rp_rechnung      on public.rechnung_posten(rechnung_id);
