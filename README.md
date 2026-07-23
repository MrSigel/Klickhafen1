# Klickhafen

Agentur-Website für klickhafen.com. Next.js 16 (App Router), TypeScript,
Tailwind v4, React Three Fiber für die 3D-Signature.

```bash
npm run dev     # Entwicklung
npm run build   # Produktionsbuild (~40 Seiten, vollständig statisch)
npx eslint .    # Linting — Next 16 führt das beim Build NICHT mehr aus
```

## CRM (privat, unter /admin)

Ein internes CRM für Kunden, Projekte, Einnahmen/Ausgaben und Rechnungen —
**nur für Enrico**, nicht öffentlich. Getrennt vom Marketing-Auftritt über
Route-Gruppen: `app/(site)/` = öffentliche Seite, `app/admin/` = CRM (eigene
Hülle, `noindex`, in robots gesperrt, nicht in der Sitemap).

**Der Kern — das Geldmodell:** Einnahmen (`posten`) und Ausgaben tragen ein
Kennzeichen `eigen`/`umsatz` vs. `durchlauf`. Google-Ads-Budget des Kunden ist
`durchlauf` — es zählt NICHT zum Gewinn. Dashboard: `Gewinn = eigener Umsatz −
eigene Ausgaben`, durchlaufende Posten separat ausgewiesen. Logik in
`lib/admin/daten.ts` (`auswertungLaden`).

Stack: **Supabase** (Postgres + Auth + RLS), **Resend** (Rechnungsversand),
**@react-pdf/renderer** (Rechnungs-PDF). Login per **E-Mail + Passwort**
(`signInWithPassword`), beschränkt auf `ADMIN_EMAIL` (`app/admin/login`). Den
Nutzer legst du direkt in Supabase an (Authentication → Users). Doppelt gesichert:
`proxy.ts` (optimistischer Redirect) **und** `aktuellerNutzer()` in jeder Seite
(Next-Doku rät, sich nicht allein auf den Proxy zu verlassen).

**Verifiziert (ohne deine Keys):** Build grün, Rechnungs-PDF rendert korrekt
(`/admin/rechnung-vorschau` — Muster mit § 19 UStG), Admin-Shell rendert,
Setup-Bildschirm greift bei fehlender DB, /admin ist noindex + gesperrt, die
öffentliche Seite läuft nach dem Layout-Umbau unverändert (Pre-Launch sauber).

### CRM einrichten (dein Teil)

1. **Supabase-Projekt** auf supabase.com anlegen. Im SQL-Editor
   `supabase/schema.sql` ausführen (legt Tabellen + RLS an).
2. Authentication → Users → **Add user**: E-Mail = `ADMIN_EMAIL`
   (`kontakt@klickhafen.com`) + ein Passwort, „Auto Confirm User" an. Danach
   Authentication → Providers → „Allow new users to sign up" **ausschalten**
   (nur du sollst rein).
3. **Resend-Konto** anlegen, Domain `klickhafen.com` verifizieren, API-Key holen
   (nur für den Rechnungsversand, nicht für den Login).
4. `.env.local` aus `.env.local.example` anlegen und ausfüllen
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ADMIN_EMAIL`,
   `RESEND_API_KEY`, `RESEND_FROM`, `NEXT_PUBLIC_SITE_URL`). In Vercel dieselben
   Variablen unter Settings → Environment Variables.
5. Bankdaten in `lib/site.ts` (`bank`) eintragen — dann stehen sie auf der
   Rechnung; sonst druckt sie eine neutrale Zahlungszeile.

### Noch offen (nächster Schritt, sobald Supabase live ist)

Erfassungsmasken (Kunden/Projekte/Posten/Ausgaben/Rechnungen anlegen & ändern),
Dashboard an Live-Daten hängen, PDF-Rechnung aus echten Daten + Versand per
Resend, alles gegen die echte DB testen. Der Rahmen (Schema, Auth, Shell,
Auswertung, PDF) steht — es fehlt die CRUD-Oberfläche.

## Live gehen (Vercel)

1. Code in ein Git-Repo (GitHub/GitLab) pushen.
2. Auf vercel.com das Repo importieren → Framework „Next.js" wird erkannt →
   Deploy. Kein Build-Befehl nötig, Vercel kennt Next 16.
3. Domain `klickhafen.com` in Vercel unter „Domains" hinzufügen und die zwei
   DNS-Einträge beim Domain-Anbieter setzen (Vercel zeigt sie an).
4. **Vercel-DPA bestätigen** (Settings → Legal) — nötig für die Datenschutz-
   erklärung.
5. Nach Livegang: `klickhafen.com/sitemap.xml` in der **Google Search Console**
   einreichen; Property vorher per DNS verifizieren.

Alle URLs (Canonical, OG, Schema, Sitemap) zeigen bereits auf
`https://klickhafen.com` (`metadataBase` in `app/layout.tsx`). Bis die Domain
verbunden ist, keine Vercel-Preview-URL bei Google einreichen — Previews sind
ohnehin auf noindex.

## Google Ads: Konformität & Tracking

**Landingpage-Konformität ist erfüllt:** vollständiges Impressum + Datenschutz
(footerverlinkt auf jeder Seite), klares Angebot, funktionierende Navigation,
keine Platzhalter, keine kaputten Links, schnelle Ladezeit. Das sind die
Punkte, an denen die Ads-Prüfung eine Landingpage ablehnt.

**Der Haken beim Conversion-Tracking:** Sobald du den Google-Tag (gtag/GA4)
für Conversion-Messung einbaust, setzt er Cookies → dann ist in der EU ein
**Cookie-Consent-Banner (TTDSG) + Google Consent Mode v2** Pflicht, BEVOR
Tracking-Cookies gesetzt werden, und die Datenschutzerklärung muss den
Abschnitt „Cookies, Analyse und Werbung" ersetzen. Aktuell setzt die Seite
**null Cookies** — das ist der einfachste konforme Zustand für den Start.

Empfehlung: erst live gehen und Ads mit reinem Klick-Ziel starten; das
Conversion-Tracking (WhatsApp-Klick als Conversion) samt Consent-Banner in
einem zweiten Schritt sauber nachrüsten. Das braucht deine GA4-/Ads-IDs und
eine Entscheidung zum Consent-Tool — sag Bescheid, dann baue ich es.

## Wo was liegt

| Ich will …                        | Datei                                   |
| --------------------------------- | --------------------------------------- |
| eine Leistung ändern/hinzufügen   | `lib/services.ts`                       |
| eine Referenz ändern/hinzufügen   | `lib/referenzen.ts`                     |
| einen Blogbeitrag schreiben       | `lib/blog.ts`                           |
| das Vorschaubild (OG) ändern      | `lib/og.tsx`                            |
| die KI-Kurzfassung anpassen       | `app/llms.txt/route.ts`                 |
| WhatsApp-Nummer oder -Texte       | `lib/whatsapp.ts`                       |
| Adresse, Domain, Stammdaten       | `lib/site.ts`                           |
| Farben, Schriften, Type-Scale     | `app/globals.css` (`:root` + `@theme`)  |
| Seitenbreite und Ränder           | `components/ui.tsx` → `Container`       |
| die Navigation (Kopf)             | `components/Header.tsx`                 |
| den Kopf einer Unterseite         | `components/SeitenHero.tsx`             |
| Logo, Favicon, Wortmarke          | `components/Logo.tsx`, `app/icon.svg`, `Anker.tsx` |
| strukturierte Daten (JSON-LD)     | `lib/seo.ts`                            |

**`lib/services.ts` ist die einzige Quelle für Leistungen.** Ein neuer Eintrag
erzeugt automatisch: Detailseite unter `/leistungen/<slug>`, Karte in Übersicht
und Startseite, Footer-Link, mobiler Menüeintrag, Sitemap-Eintrag und
Service-Schema. Ein passender Text in `lib/whatsapp.ts` unter demselben Slug
füllt die WhatsApp-Erstnachricht — fehlt er, greift der Standardtext.

## Hausdesign — dunkle Basis

Umgesetzt nach dem Skill `klickdesigns-house-style`. Tailwind v4 kennt keine
`tailwind.config.js` mehr; die Tokens sind in `app/globals.css` per `@theme`
registriert und damit als `bg-paper`, `text-ink`, `border-line`, `text-accent`
usw. verfügbar. Verboten und im Build nachweislich nicht vorhanden:
`slate/gray/zinc/neutral`, Inter, `rounded-2xl shadow-lg` als Card-Default.

**Die Token-Namen aus dem Skill bleiben, die Werte sind gedreht:** `paper` ist
die Fläche (jetzt Tiefwasser `#0b0f0e`), `ink` der Text darauf (`#eceae3`).
Deshalb bedeutet `bg-paper text-ink` weiterhin „Hintergrund + Text" und alle
Komponenten funktionieren unverändert.

- Akzent: `#45a182` — Tannengrün, für dunklen Grund angehoben. Genau einer.
  Das ursprüngliche `#1b4d3e` lebt als `--accent-deep` für Flächen weiter.
- Flächen-Staffelung: `paper-deep` (tiefste) → `paper` (Basis) →
  `paper-sunk` (Sektionswechsel) → `paper-lift` (Karte/Hover).
  **Auf dunklem Grund muss eine Karte heller sein als ihr Untergrund** —
  sonst kehrt sich die Elevation um.
- Display: Fraunces · Body: Hanken Grotesk · Utility: Geist Mono
- Fonts über `next/font` lokal eingebettet — keine Google-Verbindung des Besuchers
- Leuchten nur über die Klasse `.schein`, und nur an zwei Stellen (hinter der
  3D-Signature, unter dem CTA-Band). Flächige Gradients sind bewusst tabu.
  Jeder `.schein` MUSS in einem `relative overflow-hidden`-Elternteil liegen.

### Kontrast nachrechnen

Die Farben sind gegen WCAG AA geprüft, nicht geschätzt. Alle 17 Textpaare
bestehen 4.5:1, Button-Rahmen und Focus-Ring bestehen 3:1 (WCAG 1.4.11).
Wer Tokens ändert, rechnet nach — sonst fällt genau der Button-Rahmen durch,
der auf Dunkel ohnehin am ehesten unsichtbar wird.

## Der Hero der Startseite

Er ist auf **Klarheit in drei Sekunden** gebaut, nicht auf Stimmung. Die frühere
Fassung öffnete mit „Jedes Projekt braucht einen Hafen" — poetisch, aber ein
generischer Claim: Wer eine Website braucht, erfuhr daraus nichts. Der Hausstil
verlangt ausdrücklich das Gegenteil („öffne mit dem konkretesten Element").
Die Metapher lebt in den Eyebrows und auf `/philosophie` weiter, sie trägt aber
nicht mehr den Verkauf.

Reihenfolge über der Falzlinie — **nachgemessen auf 360/375/1280/1440/1920**,
nicht geschätzt:

1. **H1** — das konkrete Versprechen.
2. **Absatz** — Umfang und Unterschied (eine Person, kein Formular).
3. **Ein CTA.** Nur einer. Der zweite Button führte nach `/referenzen`, wohin
   der Beleg direkt darunter auch führt — doppelt, und auf 360px-Geräten brach
   er um und schob den Beleg unter die Falz.
4. **Beleg** — die sechs echten Kundenprojekte. Das stärkste Signal der Seite.
5. **Fakten-Sockel** — Festpreis / Antwortzeit / Code gehört Ihnen, aus
   `site.fakten`. Beantwortet die drei Einwände, die vor jedem Auftrag stehen.

Auf Mobile ist die Reihenfolge per `order` bewusst anders als im DOM: Text →
Beleg → 3D-Signature. Der Anker ist quadratisch und fraß sonst 375px Höhe, die
den Beleg auf 1101px schoben. Beweis schlägt Atmosphäre.

**Wer hier etwas hinzufügt, misst nach** (`falz.mjs`-Muster: Viewport setzen,
`getBoundingClientRect().top` gegen `innerHeight`). Jedes zusätzliche Element
kostet einen anderen den Platz über der Falz.

## Blog („Klartext")

Beiträge stehen als typisierte Daten in `lib/blog.ts` — dieselbe Architektur wie
`services.ts`, kein MDX, keine zusätzliche Abhängigkeit. Ein neuer Eintrag
erzeugt automatisch: Beitragsseite, Eintrag in der Übersicht, eigenes OG-Bild,
Zähler in der Navigation, Sitemap-Eintrag, BlogPosting- und FAQPage-Schema,
Verlinkung von den passenden Leistungsseiten und den Abschnitt in `llms.txt`.

**Das Feld `kurzantwort` ist der AEO/GEO-Kern**, kein Teaser: die direkte
Antwort auf die Titelfrage in zwei bis vier Sätzen. Sie steht optisch abgesetzt
ganz oben auf der Seite, ist der Anreißer in der Übersicht, liegt als
`abstract` im Schema und steht vollständig in `llms.txt`. Antwortmaschinen
zitieren genau diesen Absatz — wer die Antwort in Absatz sieben versteckt, wird
nicht genannt. Jeder neue Beitrag braucht sie, das erzwingt der Typ.

## Vorschaubilder (OG)

`lib/og.tsx` erzeugt sie über `next/og`. Es gibt Bilder für die Wurzel, jede
Leistung und jeden Beitrag; alle anderen Seiten erben das Wurzelbild. Grenzen,
die den Aufbau bestimmen (aus der Next-Doku):

- Satori kennt **nur Flexbox**, kein CSS Grid.
- Nur **ttf/otf/woff** — kein woff2.
- **500KB Bundle-Limit inkl. Fonts.** Deshalb liegen in `assets/` zwei
  subsettete, statische Schnitte (39KB). Die Variable Fraunces allein würde
  das Limit sprengen. Fonts nicht gegen die Variable-Version tauschen.
- `twitter-image.tsx` ist eine **eigene** Konvention: `opengraph-image` erzeugt
  kein `twitter:image`. Deshalb der Re-Export.
- Dateibasierte Metadaten schlagen `metadata.openGraph.images` — ein manueller
  Eintrag dort wäre wirkungslos.

## llms.txt

`/llms.txt` ist das GEO-Gegenstück zu robots.txt: die Website als Markdown für
KI-Systeme, damit sie nicht aus Navigation und Markup raten müssen. Speist sich
aus denselben Datenquellen wie die Seiten, kann also nicht auseinanderlaufen.
Enthält am Ende bewusst den Hinweis, dass es keine veröffentlichten Kennzahlen
gibt und keine erfunden werden sollen.

## Der Kopf der Unterseiten

**Alle** Unterseiten nutzen `components/SeitenHero.tsx` — bitte keinen eigenen
Hero mehr pro Seite bauen, genau daher kam die Uneinheitlichkeit. Der Hero
bringt Brotkrumen, Eyebrow, H1 und eine rechte Spalte mit (Intro → Aktion →
Beleg), oder per `children` einen beliebigen Inhalt (so machen es `/kontakt`
und die Rechtsseiten).

Die Startseite hat den 3D-Anker als Signature; die Unterseiten bekommen
denselben Motivkreis als statische `Peilkreis`-SVG — angeschnitten über der
rechten oberen Ecke, ein paar hundert Byte, kein WebGL.

`HeroBeleg` zeigt auf jeder Leistungsseite die echten Projekte, in denen genau
diese Leistung steckt (`referenzenFuerLeistung()`). Für Automationen,
individuelle und Baukasten-Lösungen gibt es keine → der Beleg rendert dann gar
nicht. Das ist Absicht: eine Beleg-Zeile ohne Beleg ist schlimmer als keine.

## Das Logo

`Anker.tsx` ist **gefüllte Geometrie**, keine Strich-Ikone — eine 1,6px-Kontur
verschwindet neben der Fraunces-Wortmarke und bricht bei 20px weg. Auf einem
24er-Raster konstruiert; die Zahlen im SVG hängen voneinander ab:

- Der Schaft endet bei `21.2`, die Flunke bei `21.6`. Wird der Schaft länger,
  lugt unten ein Nippel unter dem Bogen heraus.
- Die Widerhaken zeigen nach außen-oben (Radial- plus Gegentangentenrichtung
  am Bogenende bei 22°). Zeigen sie senkrecht nach oben, entsteht am Übergang
  zum Bogen eine sichtbare Kerbe.

`Logo.tsx` ist das Lockup. Die Platte ist bewusst **nicht** vollflächig im
Akzent: ein Akzentsignal pro Screen, und das ist der CTA. Erst beim Hover
füllt sie.

## Die Navigation (Kopf)

Oben, `components/Header.tsx`. Auf Enricos Wunsch von der (zwischenzeitlich
getesteten) schwebenden Tab-Leiste zurück auf eine Kopf-Navigation gebracht —
aber bewusst besser als der erste Masthead.

Die Signature, damit es NICHT nach Default aussieht: **die Peilmarke.** Der
aktive/gehoverte Punkt bekommt keine gleitende Unterstreichung (der KI-Reflex),
sondern eine feine Akzent-Hairline ÜBER dem Wort, die von links einwischt
(`origin-left scale-x-0 → scale-x-100`). Das greift das Hairline-vor-Eyebrow-
Motiv der Marke auf. Tailwind v4 setzt `scale-x-*` über die `scale`-Eigenschaft
(nicht `transform`) — beim Testen per `getComputedStyle(el).scale` prüfen, nicht
`.transform`.

Weitere bewusste Entscheidungen:

- **Datentreue Mono-Zähler** (`Leistungen 7`, `Referenzen 4`, `Klartext 5`) aus
  `services.length` / `referenzen.length` / `posts.length` — eine achte
  Leistung ändert die Ziffer von selbst. Screenreader hören „(7 Einträge)"; die
  sichtbare Ziffer ist `aria-hidden`.
- **Transparent oben, fest beim Scrollen.** Über dem Hero schwebt der Header
  ohne Fläche; ab 8px Scroll bekommt er Tiefwasser-Fläche + Blur + Hairline
  (`gescrollt`-State). Ruhiger Premium-Wechsel, keine Höhenänderung → kein
  Layout-Shift.
- **WhatsApp-CTA ist das eine Akzentsignal**, auf jedem Gerät im Header (nie nur
  im Menü versteckt).
- **Inline-Nav ab `lg`**, darunter der Hamburger mit dem Logbuch-Panel (große
  Fraunces-Punkte + Zähler, dann Ausrüstung/Leistungen, dann Im Logbuch/
  Referenzen). Body-Scroll-Lock, Escape schließt, Routenwechsel schließt.

**Zwei bewusste Mikro-Bewegungen** (auf Enricos Wunsch, „sah zu statisch aus")
— bitte nicht „aufräumen", aber auch nicht vermehren; mehr wäre selbst ein Tell:

- **Logo:** Der Anker schwingt sacht an seiner Öse (`.anker-idle` in
  `globals.css`, Drehpunkt oben Mitte, ±2,4° über 5,5s). Ruht bei 0°, damit
  `prefers-reduced-motion` ihn aufrecht einfriert (nachgemessen). Beim Hover
  füllt die Platte.
- **CTA:** Der primäre `CtaWhatsApp` hebt sich beim Hover leicht (`-translate-y`)
  und bekommt einen weichen Akzent-Schein (`box-shadow`), der Pfeil läuft mit.
  Im Header ist der Pfeil unter `sm` ausgeblendet (`pfeilClassName`), sonst
  Überlauf auf 360px. Gilt global für alle primären CTAs — konsistent taktil.

## Gemessen (Lighthouse, mobil)

Nicht behauptet, sondern gemessen — Median aus drei Läufen gegen
`next start` auf einem Entwicklungsrechner (absolute Werte schwanken dort
stark, auf CDN-Hosting eher besser):

| Kategorie        | Wert |
| ---------------- | ---- |
| Performance      | 92 (Bestlauf 98) |
| Barrierefreiheit | 100  |
| Best Practices   | 100  |
| SEO              | 100  |
| CLS              | 0    |

Zwei Performance-Funde, die dabei behoben wurden:

- **Fraunces lud die Achsen `SOFT` und `WONK` mit, die nirgends benutzt wurden.**
  Die Schrift war die größte Ressource der Seite und die `<h1>` das
  LCP-Element. Nur noch `opsz` → 118 KB auf 66 KB, LCP spürbar besser.
- **three.js lud sofort**, weil der Hero beim Aufruf im Bild steht — und belegte
  den Hauptthread, während die Schrift für das LCP-Element lud. Jetzt wartet die
  Szene zusätzlich auf `requestIdleCallback`; das statische SVG steht ja bereits.

Barrierefreiheit lag bei 93 und ist jetzt bei 100. Die drei Defekte waren:
ungültige `<dl>`-Struktur in der FAQ (ein Wrapper zu viel zwischen `dl` und
`dt`/`dd`), ein `<p>` in der Fakten-Liste des Heros, und — am wichtigsten —
`aria-label` auf den WhatsApp-CTAs, die den sichtbaren Text aus dem
Accessibility-Namen verdrängten (**WCAG 2.5.3**: wer per Sprachsteuerung
„Projekt besprechen" sagt, konnte den Knopf nicht auslösen). Kontext hängt
jetzt als `.sr-only`-Zusatz hinten dran statt den Namen zu ersetzen — siehe
`waZusatz()` in `lib/whatsapp.ts`. **Bitte kein `aria-label` mit abweichendem
Text auf Elemente mit sichtbarer Beschriftung setzen.**

## Lokale SEO (Castrop-Rauxel / Ruhrgebiet)

On-Page ist stark aufgestellt — der Rest liegt bei dir und braucht Zeit.

**Auf der Seite umgesetzt:**
- **Eine** starke lokale Landingpage: `/webdesign-castrop-rauxel`
  (`app/webdesign-castrop-rauxel/page.tsx` + `lib/lokal.ts`). Eigener Inhalt,
  kein Doorway (nachgemessen: 34 % Hauptinhalt-Überschneidung mit der
  Webdesign-Leistungsseite; ein Doorway läge bei ~90 %). Bewusst **keine**
  Stadt-Seiten-Flut — Nachbarorte werden als Text + im `areaServed`-Schema
  genannt, nicht als eigene Seiten.
- Lokaler Ratgeber-Beitrag `/blog/webdesigner-castrop-rauxel-finden`.
- **NAP auf jeder Seite:** vollständige Anschrift im Footer (`<address>`).
- LocalBusiness-Schema mit `hasMap` und `geo`-Slot (in `lib/site.ts`
  `adresse.geo` die exakten Koordinaten aus dem GBP eintragen → wird dann
  automatisch ausgegeben).
- Lokale FAQ mit FAQPage-Schema, lokale Keywords, Ort in Title/H1/Description.

**Was #1 lokal WIRKLICH bringt — und nur du kannst es (Reihenfolge = Wirkung):**
1. **Google-Unternehmensprofil optimieren** (du hast es): richtige
   Kategorien (Primär „Webdesigner"), alle Leistungen eintragen, Fotos,
   regelmäßige Beiträge, Adresse/Telefon exakt wie im Impressum. Das ist der
   größte lokale Hebel — größer als jede Unterseite.
2. **Bewertungen** aktiv einholen (Google). Aktuell null. Lokaler Top-Faktor.
3. **Citations / NAP-Konsistenz**: Einträge in Branchenverzeichnissen, überall
   identische Angaben (Name, Adresse, Telefon).
4. **Backlinks + Zeit.** `klickhafen.com` ist neu = kaum Autorität. Platz 1
   ist Wochen bis Monate Arbeit, kein Schalter. Niemand kann #1 garantieren.

## SEO / AEO / GEO — die technische Ebene

Alles aus `lib/seo.ts`, gespeist aus den Datenquellen. Vorhanden und im Build
geprüft:

- **Strukturierte Daten:** Organization, ProfessionalService (LocalBusiness mit
  `hasOfferCatalog` aller Leistungen), WebSite, Person (nur wenn Nachname
  gepflegt), Service, FAQPage (inkl. Startseite), BlogPosting (mit `speakable`
  für Sprachassistenten), Blog, ItemList, BreadcrumbList. IDs sind verknüpft
  (`@id`-Referenzen), nicht dupliziert.
- **Marken-Assets:** `app/icon.svg` (Vektor-Favicon, Anker), `app/apple-icon.tsx`
  (180px PNG, dient auch als Schema-`logo`), `app/manifest.ts` (installierbar).
  Die Next-Default-`favicon.ico` ist entfernt.
- **`robots` mit `googleBot`-Direktiven** (`max-image-preview:large`,
  `max-snippet:-1`) — Voraussetzung für Rich Results und Snippet-Übernahme.
- **RSS-Feed** unter `app/blog/rss.xml`, im `<head>` der Blog-Seiten verlinkt.
- **Keywords** pro Seite über `keywordsFuer()` — bewusst knapp (max. 12), weil
  Stuffing ein negatives Signal ist. Google wertet das Meta zwar nicht, andere
  Systeme lesen es, und es kostet nichts.
- **`formatDetection` aus** — iOS soll Nummern/Adressen im Fließtext nicht
  eigenmächtig verlinken; die echten CTAs sind explizite Links.

## WhatsApp-Funnel

Es gibt **kein Kontaktformular**. Jeder CTA läuft über `waLink()` aus
`lib/whatsapp.ts` und öffnet WhatsApp in neuem Tab mit kontextabhängiger,
URL-kodierter Erstnachricht. Neue CTAs bitte ausschließlich über
`<CtaWhatsApp>` aus `components/ui.tsx` bauen.

## Noch von Enrico zu befüllen

- [x] ~~Impressum~~ — Pflichtangaben eingetragen (Enrico Gross, Gerther Straße 76,
      44577 Castrop-Rauxel, Kleinunternehmer § 19 UStG). Seite ist jetzt
      indexierbar. **Bitte einmal gegenlesen**, v. a. die Streitschlichtung.
- [x] ~~Straße/PLZ und Nachname in `lib/site.ts`~~ — dadurch werden jetzt das
      **Person-Schema** (E-E-A-T) und die vollständige Anschrift in Organization
      und LocalBusiness ausgegeben.
- [x] ~~Datenschutzerklärung~~ — vollständig geschrieben auf Basis dessen, was
      die Seite **tatsächlich** tut (Hosting Vercel, Server-Logs, lokale Fonts,
      kein Formular, WhatsApp, aktuell keine Cookies/kein Tracking). Seite ist
      indexierbar, kein Platzhalter mehr. **Zwei Aktionen offen:**
      (a) Vercel-DPA im Dashboard bestätigen (Settings → Legal),
      (b) rechtlich prüfen lassen — der Text ist sorgfältig, aber ich bin kein
      Anwalt. **UND:** Sobald du Google-Ads-Conversion-Tracking einbaust, MUSS
      der Abschnitt „Cookies, Analyse und Werbung" ersetzt und ein
      Consent-Banner ergänzt werden (siehe unten).
- [ ] **Blogbeiträge gegenlesen** — die fünf Beiträge in `lib/blog.ts` sind
      fachlich und enthalten bewusst keine Kennzahlen zu deinen Projekten,
      aber sie erscheinen unter deinem Namen. Prüfe besonders die Aussagen zu
      Preisspannen und Antwortzeiten („in der Regel am selben Werktag") — das
      ist ein Versprechen, das du halten musst.
- [ ] **Veröffentlichungsdaten** — alle Beiträge stehen auf `2026-07-17`, dem
      Tag, an dem sie entstanden sind. Bewusst nicht rückdatiert. Setz das
      Feld `datum` auf den echten Livegang, wenn du sie gestaffelt
      veröffentlichst.
- [ ] **Ergebnisse je Referenz** — Feld `ergebnis` in `lib/referenzen.ts`, weiter
      leer. Gemessen (Lighthouse mobil) taugen die Referenzen aktuell **nicht**
      als Beleg: limit-breakers.de Performance 57 / LCP 9,3 s,
      sibylle-bergold.com 49 / LCP 8,6 s, selin-weikard.de CLS 0,186,
      alpendry.de 76. SEO (92–100) und Barrierefreiheit (95–100) sind dagegen
      stark. Nur die guten Werte zu zeigen wäre Rosinenpickerei — wer nachmisst,
      sieht die schlechten. **Erst die Seiten beschleunigen, dann werben.**
- [ ] **Kundenstimmen** — es gibt weiterhin KEINE. Website-Texte der Kunden sind
      Aussagen über *deren* Geschäft, keine Aussagen über die Zusammenarbeit mit
      dir; als „Kundenstimme" wäre das eine erfundene Empfehlung (und
      Review-Schema darauf ein Verstoß gegen Googles Richtlinien). Gebraucht
      wird je ein echter Satz der Kunden über die Zusammenarbeit — dann baue ich
      Sektion + Review-Schema.
- [ ] **Referenz-Screenshots aktuell halten** — die Bilder in
      `/public/referenzen/` sind echte Aufnahmen der Live-Seiten (1440×900, 2x).
      Cookie-Banner wurden für die Aufnahme per CSS ausgeblendet, **nicht**
      weggeklickt. Ändert ein Kunde sein Design, neu aufnehmen.
- [ ] **`lib/site.ts` → `sozialprofile`** — das Google-Unternehmensprofil
      existiert bereits; es fehlt nur die **URL** (Maps-Link des Profils), dann
      trage ich sie in `sameAs` ein. Dazu ggf. LinkedIn/Instagram. Starkes
      E-E-A-T-Signal, aktuell ungenutzt.
- [ ] **Geschäftliche E-Mail** — im Impressum steht die Gmail-Adresse. Eine
      Adresse auf der eigenen Domain (z. B. `info@klickhafen.com`) wirkt für
      eine Agentur deutlich professioneller.
- [ ] **`lib/site.ts` → `fakten` gegenlesen.** Das sind Zusagen, keine
      Werbetexte: „Festpreis", „Antwort am selben Werktag", „Code gehört Ihnen"
      stehen jetzt oben auf der Startseite und in `llms.txt`. Wenn du eine davon
      nicht halten kannst, ändere sie.
- [ ] Preise/Aussagen in den FAQ gegenlesen — sie sind plausibel formuliert,
      aber es sind meine Annahmen, nicht deine Zusagen.
