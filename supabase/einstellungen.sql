-- ============================================================
-- Klickhafen CRM — Firmen-/Rechnungseinstellungen (Zusatz-Migration)
--
-- So einspielen: Supabase-Dashboard → SQL Editor → dieses Skript einfügen →
-- "Run". NICHT-destruktiv: legt nur EINE neue Tabelle an und lässt alle
-- bestehenden Daten (Kunden, Projekte, Rechnungen …) unberührt.
--
-- Zweck: Alles, was auf der Rechnung steht, an einer Stelle einstellbar machen —
-- Absender, Kontakt, Bankverbindung, § 19 UStG (an/aus), USt-Satz, Steuernummer
-- und der Rechnungs-Fußtext. Genau eine Zeile (id = 1) trägt die Werte.
-- ============================================================

create table if not exists public.einstellungen (
  id                integer primary key default 1 check (id = 1),

  -- Marke & Absender
  firma             text    not null default 'Klickhafen',
  eyebrow           text             default 'WEBDESIGN · RUHRGEBIET',
  logo_zeigen       boolean not null default true,
  inhaber           text    not null default 'Enrico Gross',
  strasse           text             default 'Gerther Straße 76',
  plz               text             default '44577',
  ort               text             default 'Castrop-Rauxel',

  -- Kontakt
  email             text             default 'kontakt@klickhafen.com',
  telefon           text             default '+4915563535989',
  web               text             default 'klickhafen.info',

  -- Bankverbindung (leer = neutrale Zahlungszeile auf der Rechnung)
  bank_inhaber      text,
  iban              text,
  bic               text,
  bank_name         text,

  -- Steuer
  -- kleinunternehmer = true  → § 19 UStG, keine Umsatzsteuer
  -- kleinunternehmer = false → Regelbesteuerung, USt mit ust_satz ausweisen
  kleinunternehmer  boolean not null default true,
  ust_satz          numeric(4, 1) not null default 19.0,
  ust_id            text,            -- USt-IdNr. (bei Regelbesteuerung)
  steuernummer      text,

  -- Rechnung
  zahlungsziel_tage integer not null default 14,
  rechnung_fuss     text,            -- optionaler Fußtext / Dankeszeile

  aktualisiert      timestamptz not null default now()
);

-- Die eine Zeile anlegen (falls noch nicht vorhanden). Alle Spalten haben
-- sinnvolle Defaults, die Rechnung funktioniert also sofort.
insert into public.einstellungen (id) values (1)
on conflict (id) do nothing;

-- Row-Level-Security: wie im übrigen CRM — nur eingeloggte Nutzer.
alter table public.einstellungen enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'einstellungen'
      and policyname = 'einstellungen_alle'
  ) then
    create policy einstellungen_alle on public.einstellungen
      for all to authenticated using (true) with check (true);
  end if;
end $$;
