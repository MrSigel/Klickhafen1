/** Globale Stammdaten. Einmal hier, nirgends sonst hartkodiert. */

export const site = {
  name: "Klickhafen",
  domain: "klickhafen.com",
  url: "https://klickhafen.com",
  /** Standard-Title der Startseite */
  title: "Klickhafen — Webdesign, Webentwicklung & Automationen",
  slogan: "Der Hafen für alles, was mit Web zu tun hat.",
  description:
    "Klickhafen aus Castrop-Rauxel: Webdesign, Webentwicklung, Automationen, SEO und Funnels. Von der Landingpage bis zur komplexen Anwendung — gebaut, um zu tragen.",
  locale: "de_DE",
  adresse: {
    ort: "Castrop-Rauxel",
    region: "Nordrhein-Westfalen",
    regionKurz: "NRW",
    land: "DE",
    strasse: "Gerther Straße 76",
    plz: "44577",
    /**
     * Exakte Koordinaten für das LocalBusiness-Schema (geo). Ein starkes
     * lokales Signal. Wird NUR ausgegeben, wenn gesetzt — falsche Koordinaten
     * schaden mehr als keine.
     * TODO(Enrico): aus deinem Google-Unternehmensprofil die genauen Werte
     * kopieren (Maps → Rechtsklick auf den Pin → die zwei Zahlen) und hier
     * eintragen, z. B. { lat: 51.5xxx, lng: 7.3xxx }.
     */
    geo: null as { lat: number; lng: number } | null,
  },
  /** Kleinunternehmer nach § 19 UStG — keine USt-IdNr., kein USt-Ausweis. */
  kleinunternehmer: true,

  /**
   * Bankverbindung für die Rechnungen. Solange null, druckt die Rechnung eine
   * neutrale Zahlungszeile statt falscher Kontodaten.
   * TODO(Enrico): { inhaber: "Enrico Gross", iban: "DE..", bic: ".." } eintragen.
   */
  bank: null as { inhaber: string; iban: string; bic: string } | null,

  /**
   * Hosting-Anbieter — MUSS in der Datenschutzerklärung genannt werden.
   * Vercel: Node-fähige Plattform, die die dynamischen Teile (OG-Bilder,
   * Routen) ausliefert. Datenverarbeitung in den USA → Standardvertrags-
   * klauseln; ein Auftragsverarbeitungsvertrag (DPA) ist Voraussetzung.
   * TODO(Enrico): Vercel-DPA im Dashboard bestätigen (Settings → Legal).
   */
  hosting: {
    name: "Vercel Inc.",
    anschrift: "340 S Lemon Ave #4133, Walnut, CA 91789, USA",
    datenschutz: "https://vercel.com/legal/privacy-policy",
  },
  /** Einzugsgebiet für das LocalBusiness-Schema */
  einzugsgebiet: ["Castrop-Rauxel", "Ruhrgebiet", "Nordrhein-Westfalen", "Deutschland"],
  email: "glowreel.enrico@gmail.com",
  /** Telefon im E.164-Format — dieselbe Nummer wie WhatsApp, für Schema/tel:. */
  telefon: "+4915563535989",

  /**
   * Verifizierte Profile für das sameAs-Feld (Organization/Person). Sie sind
   * das stärkste Signal, dass hinter der Marke echte, auffindbare Identitäten
   * stehen (E-E-A-T). Solange leer, wird sameAs bewusst NICHT ausgegeben —
   * ein leeres Array wäre für den Crawler wertlos.
   * TODO(Enrico): echte Profile eintragen, z. B.
   *   "https://www.linkedin.com/in/…", "https://www.instagram.com/…",
   *   "https://www.google.com/maps/place/…" (Google-Unternehmensprofil).
   */
  sozialprofile: [] as string[],

  /**
   * Keyword-Basis für die Meta-Angaben. Google wertet das keywords-Meta zwar
   * nicht mehr, andere Systeme lesen es aber, und es kostet nichts. Bewusst
   * knapp gehalten — Keyword-Stuffing ist ein negatives Signal, kein positives.
   */
  keywords: [
    "Webdesign",
    "Webentwicklung",
    "Webagentur",
    "SEO",
    "Automatisierung",
    "Funnel",
    "Castrop-Rauxel",
    "Ruhrgebiet",
    "NRW",
  ],

  /** Gepflegt → das Person-Schema (E-E-A-T) wird automatisch ausgegeben. */
  person: {
    vorname: "Enrico",
    nachname: "Gross",
    rolle: "Inhaber und Entwickler",
  },

  /**
   * Die drei Einwände, die vor jedem Auftrag stehen — im Hero direkt
   * beantwortet. Liegen hier und nicht in der Seite, weil llms.txt und die
   * Start-FAQ dieselben Aussagen brauchen: eine Quelle, keine Widersprüche.
   *
   * ACHTUNG: Das sind Zusagen. Wer sie ändert, ändert ein Versprechen.
   */
  fakten: [
    {
      label: "Preis",
      wert: "Festpreis",
      text: "Kein Stundenzettel. Nach einem kurzen Gespräch steht der Preis — und er hält.",
    },
    {
      label: "Antwort",
      wert: "Am selben Werktag",
      text: "Sie schreiben per WhatsApp, nicht in ein Formular. Meist antworte ich binnen Stunden.",
    },
    {
      label: "Eigentum",
      wert: "Code gehört Ihnen",
      text: "Quellcode, Zugänge, Dokumentation. Keine Abhängigkeit von mir als Person.",
    },
  ],
} as const;
