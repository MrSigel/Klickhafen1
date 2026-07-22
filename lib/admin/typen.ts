/** Typen des CRM — spiegeln supabase/schema.sql. */

export type Kunde = {
  id: string;
  name: string;
  firma: string | null;
  email: string | null;
  telefon: string | null;
  adresse: string | null;
  notiz: string | null;
  erstellt: string;
};

export type ProjektStatus = "angebot" | "aktiv" | "abgeschlossen";

export type Projekt = {
  id: string;
  kunde_id: string | null;
  name: string;
  status: ProjektStatus;
  notiz: string | null;
  erstellt: string;
};

/** 'umsatz' = mein Ertrag, 'durchlauf' = Kundengeld (z. B. Ads-Budget). */
export type PostenArt = "umsatz" | "durchlauf";

export type Posten = {
  id: string;
  projekt_id: string;
  bezeichnung: string;
  betrag: number;
  art: PostenArt;
  bezahlt: boolean;
  datum: string;
  erstellt: string;
};

/** 'eigen' = meine Betriebsausgabe, 'durchlauf' = im Kundenauftrag gezahlt. */
export type AusgabeArt = "eigen" | "durchlauf";

export type Ausgabe = {
  id: string;
  projekt_id: string | null;
  bezeichnung: string;
  betrag: number;
  art: AusgabeArt;
  kategorie: string | null;
  datum: string;
  erstellt: string;
};

export type RechnungStatus = "entwurf" | "gesendet" | "bezahlt";

export type Rechnung = {
  id: string;
  projekt_id: string | null;
  kunde_id: string | null;
  nummer: string;
  datum: string;
  faellig: string | null;
  status: RechnungStatus;
  notiz: string | null;
  erstellt: string;
};

export type RechnungPosten = {
  id: string;
  rechnung_id: string;
  bezeichnung: string;
  menge: number;
  einzelpreis: number;
  position: number;
};

/**
 * Firmen-/Rechnungseinstellungen — spiegelt supabase/einstellungen.sql.
 * Genau eine Zeile (id = 1). Steuert alles, was auf der Rechnung steht.
 */
export type Einstellungen = {
  firma: string;
  eyebrow: string | null;
  logoZeigen: boolean;
  inhaber: string;
  strasse: string | null;
  plz: string | null;
  ort: string | null;
  email: string | null;
  telefon: string | null;
  web: string | null;
  bankInhaber: string | null;
  iban: string | null;
  bic: string | null;
  bankName: string | null;
  /** true = § 19 UStG (keine USt); false = Regelbesteuerung (USt ausweisen). */
  kleinunternehmer: boolean;
  ustSatz: number;
  ustId: string | null;
  steuernummer: string | null;
  zahlungszielTage: number;
  rechnungFuss: string | null;
};

/** Auswertung fürs Dashboard — der Kern des Geldmodells. */
export type Auswertung = {
  /** Mein Ertrag (Posten art='umsatz'). */
  umsatz: number;
  /** Davon schon eingegangen (bezahlt=true). */
  umsatzBezahlt: number;
  /** Davon noch offen. */
  umsatzOffen: number;
  /** Meine Betriebsausgaben (art='eigen'). */
  ausgabenEigen: number;
  /** Mein echter Gewinn = umsatz − ausgabenEigen. */
  gewinn: number;
  /** Durchlaufende Einnahmen (Kundengeld, z. B. Ads-Budget). */
  durchlaufEin: number;
  /** Durchlaufende Ausgaben (an Plattformen weitergereicht). */
  durchlaufAus: number;
  /** Noch nicht verausgabtes Kundengeld (Ein − Aus). */
  durchlaufOffen: number;
};
