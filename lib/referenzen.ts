/**
 * Die eine Quelle für Referenzen. Startseite, Referenzseite, Sitemap und
 * Schema lesen hier. Alle Angaben stammen von den echten, öffentlich
 * erreichbaren Websites — nichts davon ist ausgedacht.
 *
 * WICHTIG: Keine Zahlen ohne Beleg. Wo eine Kennzahl stünde, steht ein
 * markierter Platzhalter, den Enrico selbst füllt. Erfundene Ergebnisse
 * sind ein Rechtsrisiko und fallen im ersten Kundengespräch auf.
 */

export type Referenz = {
  slug: string;
  /** Anzeigename des Projekts */
  name: string;
  /** Volle URL inkl. Protokoll */
  url: string;
  /** Ohne Protokoll — für die Mono-Anzeige */
  domain: string;
  branche: string;
  /** Ein Satz: worum es bei dem Kunden geht */
  claim: string;
  /** Was die Website leisten muss */
  aufgabe: string;
  /** Welche Klickhafen-Leistungen hier drinstecken (Slugs aus lib/services.ts) */
  leistungen: string[];
  /**
   * Kennzahl/Ergebnis. TODO(Enrico): mit echten Werten füllen oder das
   * Feld weglassen — die Karte rendert dann sauber ohne Zeile.
   */
  ergebnis?: string;
  /**
   * Screenshot unter /public/referenzen/<datei>, 16:10 als WebP.
   * Fehlt er, rendert die Karte eine typografische Platte statt eines
   * kaputten Bildrahmens — eine neue Referenz funktioniert also sofort,
   * auch bevor ein Bild da ist.
   *
   * Die vorhandenen Bilder sind echte Aufnahmen der Live-Seiten (1440x900,
   * 2x, Consent-Banner für die Aufnahme ausgeblendet — nicht weggeklickt).
   * Sie veralten, wenn ein Kunde sein Design ändert: dann neu aufnehmen.
   */
  bild?: string;
};

export const referenzen: Referenz[] = [
  {
    slug: "limit-breakers",
    bild: "limit-breakers.webp",
    name: "Limit Breakers",
    url: "https://limit-breakers.de",
    domain: "limit-breakers.de",
    branche: "Unternehmensberatung · Energiebranche",
    claim:
      "Unternehmensberatung für planbaren Vertrieb in der Energiebranche — Photovoltaik, Wärmepumpe, Strom und Gas.",
    aufgabe:
      "Ein Auftritt, der Beratungskompetenz sofort belegt statt sie zu behaupten. Dunkel gehalten, mit klarer Führung auf den Erstkontakt — die Zielgruppe entscheidet nach Seriosität, nicht nach Farbe.",
    leistungen: ["webdesign", "webentwicklung", "seo-aeo-geo-cro"],
  },
  {
    slug: "alpendry",
    bild: "alpendry.webp",
    name: "AlpenDry",
    url: "https://alpendry.de",
    domain: "alpendry.de",
    branche: "Wasserschadensanierung · Notdienst",
    claim:
      "Wasserschadensanierung, Leckageortung und technische Trocknung am Alpenrand — mit 24/7-Notdienst.",
    aufgabe:
      "Hier zählt Geschwindigkeit: Wer einen Wasserschaden hat, sucht auf dem Handy und ruft in derselben Minute an. Der Auftritt ist auf genau diesen Moment gebaut — regional auffindbar, mobil sofort handlungsfähig.",
    leistungen: ["webdesign", "seo-aeo-geo-cro", "funnels"],
  },
  {
    slug: "selin-weikard",
    bild: "selin-weikard.webp",
    name: "Selin Weikard",
    url: "https://selin-weikard.de",
    domain: "selin-weikard.de",
    branche: "Ganzheitliche Hundegesundheit · Online-Coaching",
    claim:
      "Ganzheitliche Hundegesundheit nach dem Grundsatz „Ursache statt Symptom“ — Beratung, Ernährung und Akademie.",
    aufgabe:
      "Ein Angebot, das über Vertrauen verkauft wird, nicht über Argumente. Die Seite trägt die persönliche Geschichte nach vorn und führt von dort ruhig zum Erstgespräch, ohne Druck aufzubauen.",
    leistungen: ["webdesign", "funnels", "seo-aeo-geo-cro"],
  },
  {
    slug: "sibylle-bergold",
    bild: "sibylle-bergold.webp",
    name: "Sibylle Bergold",
    url: "https://sibylle-bergold.com",
    domain: "sibylle-bergold.com",
    branche: "Systemische Aufstellung · Coaching",
    claim:
      "Systemische Aufstellung in Aschaffenburg und online — für Menschen, deren Leben Muster wiederholt.",
    aufgabe:
      "Ein sensibles Thema braucht eine Oberfläche, die nichts überverkauft. Zurückgenommen, ruhig, mit viel Raum — die Gestaltung tritt bewusst hinter das Anliegen zurück und macht den ersten Schritt trotzdem leicht.",
    leistungen: ["webdesign", "webentwicklung"],
  },
];

export function getReferenz(slug: string): Referenz | undefined {
  return referenzen.find((r) => r.slug === slug);
}

/**
 * Alle Referenzen, in denen eine bestimmte Leistung steckt.
 *
 * Damit steht auf jeder Leistungsseite echter Beleg direkt neben dem CTA.
 * Gibt bewusst auch ein leeres Array zurück — für Automationen, individuelle
 * und Baukasten-Lösungen gibt es (noch) keine verlinkbare Referenz. Dann
 * rendert der Beleg gar nicht, statt eine leere Behauptung aufzustellen.
 */
export function referenzenFuerLeistung(slug: string): Referenz[] {
  return referenzen.filter((r) => r.leistungen.includes(slug));
}
