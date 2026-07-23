/**
 * Die eine Quelle für alle Leistungen von Klickhafen.
 * Navigation, Footer, Übersicht, Einzelseiten, Sitemap und Service-Schema
 * lesen ausschließlich hier. Neue Leistung = neuer Eintrag, sonst nichts.
 */

export type Ablaufschritt = {
  titel: string;
  body: string;
};

export type Faq = {
  frage: string;
  antwort: string;
};

export type Service = {
  /** URL-Segment unter /leistungen/ und Schlüssel für lib/whatsapp.ts */
  slug: string;
  /** Kurzform für Navigation, Footer, Breadcrumb */
  name: string;
  /** Eigene H1 der Detailseite — bewusst nicht identisch mit `name` */
  h1: string;
  eyebrow: string;
  /** <title> der Detailseite */
  title: string;
  /** Meta-Description, eigenständig pro Seite */
  description: string;
  /** Ein Satz für Karten in der Übersicht */
  claim: string;
  /** Lead-Absatz oben auf der Detailseite */
  intro: string;
  problem: { heading: string; body: string; punkte: string[] };
  loesung: { heading: string; body: string; punkte: string[] };
  ablauf: Ablaufschritt[];
  ergebnis: { heading: string; body: string; punkte: string[] };
  faq: Faq[];
  /** Slugs verwandter Leistungen für die interne Verlinkung */
  related: string[];
  /**
   * Optional: Pfad oder URL einer Präsentations-PDF. Ist es gesetzt, zeigt die
   * Leistungsseite im Kopf den Button „Detailansicht", der die PDF in einem
   * neuen Tab öffnet. Leer = kein Button. Ablage später z. B. unter
   * `/public/praesentationen/<slug>.pdf` (dann Wert `/praesentationen/<slug>.pdf`)
   * oder eine externe URL.
   */
  praesentation?: string;
};

export const services: Service[] = [
  {
    slug: "webdesign",
    name: "Webdesign",
    h1: "Webdesign, das nach Ihnen aussieht — nicht nach Vorlage",
    eyebrow: "Leistung",
    title: "Webdesign aus Castrop-Rauxel",
    description:
      "Individuelles Webdesign statt Template: klare Hierarchie, eigene Handschrift, messbar bessere Conversion. Klickhafen aus Castrop-Rauxel, für Kunden im Ruhrgebiet und bundesweit.",
    claim:
      "Ein Auftritt mit eigener Handschrift — gebaut auf Hierarchie, nicht auf Dekoration.",
    intro:
      "Design ist kein Anstrich, den man am Ende aufträgt. Es entscheidet, ob ein Besucher in den ersten Sekunden versteht, was Sie tun, und ob er Ihnen zutraut, es gut zu tun. Genau daran arbeite ich.",
    problem: {
      heading: "Warum die meisten Websites austauschbar wirken",
      body: "Der Markt ist voll von Seiten, die aus derselben Handvoll Vorlagen stammen. Sie sind nicht kaputt — sie sind nur unsichtbar. Wer aussieht wie alle, wird verglichen wie alle: über den Preis.",
      punkte: [
        "Dieselben Templates, dieselben Stockfotos, dieselbe Ansprache wie beim Wettbewerb.",
        "Alles wirkt gleich wichtig, also führt nichts den Blick — und niemand klickt.",
        "Design und Inhalt entstehen getrennt, danach passt der Text nicht in die Fläche.",
        "Auf dem Handy bricht die Ordnung zusammen, obwohl dort die Mehrheit ankommt.",
      ],
    },
    loesung: {
      heading: "Wie ich stattdessen vorgehe",
      body: "Ich entwerfe von Ihrem konkretesten Element aus — Ihrer echten Aussage, Ihrer echten Zahl, Ihrem echten Projekt. Erst danach kommt die Form dazu. Jede Seite bekommt eine sichtbare Rangfolge: eine Hauptaussage, ein primärer Weg nach vorn.",
      punkte: [
        "Ein eigenes Farb- und Typosystem statt Standardpalette von der Stange.",
        "Klare visuelle Hierarchie: Ihr Besucher weiß immer, wohin er als Nächstes schaut.",
        "Mobile-first entworfen, nicht nachträglich zusammengeschoben.",
        "Barrierefrei bis zur Tastaturbedienung und zum AA-Kontrast — ohne Aufpreis.",
      ],
    },
    ablauf: [
      {
        titel: "Peilung",
        body: "Wir klären in einem Gespräch, wen Sie erreichen wollen, was Ihr Angebot einzigartig macht und woran Sie den Erfolg messen. Ohne diese Klarheit ist jedes Design geraten.",
      },
      {
        titel: "Kurs setzen",
        body: "Ich lege Struktur, Hierarchie und Ansprache fest — als Entwurf der wichtigsten Seiten, an echten Inhalten statt an Blindtext.",
      },
      {
        titel: "Ausrüsten",
        body: "Das visuelle System entsteht: Typografie, Farbe, Raster, Komponenten. Sie sehen das Ergebnis im Browser, nicht als Bild.",
      },
      {
        titel: "Auslaufen",
        body: "Umsetzung, Feinschliff auf allen Geräten, Übergabe. Sie können danach selbst pflegen — oder ich bleibe an Bord.",
      },
    ],
    ergebnis: {
      heading: "Was danach anders ist",
      body: "Ein Auftritt, den man Ihnen zuordnet — und der die Arbeit macht, für die er gebaut wurde.",
      punkte: [
        "Besucher verstehen Ihr Angebot ohne Erklärung.",
        "Anfragen kommen qualifizierter herein, weil die Seite vorsortiert.",
        "Sie werden über Ihre Arbeit verglichen, nicht über Ihren Preis.",
      ],
    },
    faq: [
      {
        frage: "Was kostet eine Website bei Klickhafen?",
        antwort:
          "Der Preis richtet sich nach Umfang und Tiefe: Eine fokussierte Website mit wenigen Seiten liegt deutlich unter einem mehrsprachigen Auftritt mit Buchungsstrecke. Ich nenne den Preis erst, wenn ich den Umfang kenne — pauschale Listenpreise sind entweder zu hoch oder decken Ihr Projekt nicht ab. Nach einem kurzen Gespräch per WhatsApp bekommen Sie ein konkretes Festpreisangebot.",
      },
      {
        frage: "Wie lange dauert ein Webdesign-Projekt?",
        antwort:
          "Ein klar umrissener Auftritt braucht in der Regel drei bis sechs Wochen von der Peilung bis zum Livegang. Der größte Zeitfaktor sind erfahrungsgemäß nicht Design oder Technik, sondern Inhalte: Texte, Bilder und Freigaben auf Ihrer Seite. Wer die früh bereitstellt, geht früher live.",
      },
      {
        frage: "Bekomme ich einen Entwurf, bevor ich mich entscheide?",
        antwort:
          "Sie bekommen kein Design auf Verdacht, aber auch keine Katze im Sack. Im Angebot beschreibe ich Struktur und Richtung konkret; der erste echte Entwurf entsteht als bezahlter erster Projektschritt. So arbeite ich an Ihrem Projekt statt an einem Wettbewerbsbeitrag.",
      },
      {
        frage: "Kann ich die Inhalte später selbst ändern?",
        antwort:
          "Ja. Auf Wunsch binde ich ein Redaktionssystem an, mit dem Sie Texte und Bilder ohne technisches Wissen pflegen. Wenn Sie das nicht möchten, übernehme ich Änderungen weiterhin — beides ist möglich, wir entscheiden es vor dem Bau.",
      },
      {
        frage: "Arbeitet Klickhafen nur im Ruhrgebiet?",
        antwort:
          "Der Sitz ist Castrop-Rauxel, und Kunden aus dem Ruhrgebiet und NRW treffe ich gern persönlich. Die Arbeit selbst läuft ortsunabhängig — ein Großteil der Projekte entsteht vollständig aus der Ferne, mit Abstimmung per Call und WhatsApp.",
      },
    ],
    related: ["webentwicklung", "seo-aeo-geo-cro", "baukasten-loesungen"],
  },
  {
    slug: "webentwicklung",
    name: "Webentwicklung",
    h1: "Webentwicklung — von der Landingpage bis zum Browsergame",
    eyebrow: "Leistung",
    title: "Webentwicklung & individuelle Anwendungen",
    description:
      "Saubere Webentwicklung mit Next.js und TypeScript: von der schnellen Landingpage bis zur komplexen Anwendung. Wartbarer Code, echte Performance. Klickhafen aus Castrop-Rauxel.",
    claim:
      "Von der schnellen Landingpage bis zur Anwendung, die andere für unmöglich halten.",
    intro:
      "Meine Projekte reichten von einer einfachen Landingpage bis zu einem vollständigen Browsergame. Die Spannweite ist Absicht: Wer beide Enden kennt, baut das Kleine nicht überkompliziert und das Große nicht auf Sand.",
    problem: {
      heading: "Wo Webprojekte technisch scheitern",
      body: "Die meisten Websites gehen nicht am Design zugrunde, sondern an dem, was darunter liegt. Man sieht es erst, wenn es zu spät ist: beim ersten Umbau, beim ersten Lastspitzen-Tag, beim ersten Entwicklerwechsel.",
      punkte: [
        "Ein Berg an Plugins, von denen jedes ein Sicherheitsrisiko und ein Bremsklotz ist.",
        "Die Seite lädt langsam — und verliert Besucher, bevor sie überhaupt etwas gesehen haben.",
        "Niemand außer dem ursprünglichen Entwickler versteht den Code noch.",
        "Jede kleine Änderung bricht an anderer Stelle etwas.",
      ],
    },
    loesung: {
      heading: "Wie ich baue",
      body: "Ich arbeite mit Next.js und TypeScript auf einem statisch ausgelieferten Fundament: schnell, sicher, überschaubar. Typisiert von der Datenquelle bis zur Komponente — die meisten Fehler entstehen so gar nicht erst.",
      punkte: [
        "Statisch ausgeliefert, wo es geht — dynamisch nur da, wo es einen Grund gibt.",
        "Komponenten aus einer gemeinsamen Quelle statt kopierter Duplikate.",
        "Wartbarer, dokumentierter Code — auch für den Fall, dass Sie später jemand anderen dransetzen.",
        "Komplexe Anwendungen: Spiellogik, Echtzeit, Datenhaltung, Nutzerkonten.",
      ],
    },
    ablauf: [
      {
        titel: "Peilung",
        body: "Wir schneiden den Umfang zu: Was muss die Anwendung wirklich können, was ist Wunschdenken für später? Ehrlichkeit hier spart Ihnen fünfstellige Beträge.",
      },
      {
        titel: "Kurs setzen",
        body: "Architektur, Datenmodell und Technikwahl stehen fest, bevor die erste Zeile Code entsteht. Sie bekommen das als verständliches Dokument, nicht als Fachjargon.",
      },
      {
        titel: "Ausrüsten",
        body: "Umsetzung in sichtbaren Etappen. Sie sehen früh eine laufende Version statt monatelang nichts.",
      },
      {
        titel: "Auslaufen",
        body: "Tests, Performance-Messung, Deployment, Übergabe mit Dokumentation. Auf Wunsch bleibe ich für Wartung an Bord.",
      },
    ],
    ergebnis: {
      heading: "Was danach anders ist",
      body: "Eine Anwendung, die trägt — heute und in zwei Jahren.",
      punkte: [
        "Ladezeiten, die Besucher nicht abspringen lassen.",
        "Neue Funktionen kosten Tage, nicht Wochen.",
        "Kein Plugin-Wildwuchs, keine Sicherheitslücken aus fremdem Code.",
      ],
    },
    faq: [
      {
        frage: "Mit welcher Technik arbeitet Klickhafen?",
        antwort:
          "Standard ist Next.js mit TypeScript, ausgeliefert über eine moderne Hosting-Plattform. Für komplexe Anwendungen kommen je nach Bedarf Datenbank, Authentifizierung und Echtzeit-Verbindungen dazu. Die Technik richtet sich nach dem Projekt — nicht umgekehrt.",
      },
      {
        frage: "Können Sie auch ein komplexes Projekt wie ein Browsergame umsetzen?",
        antwort:
          "Ja, ein Browsergame gehört bereits zu den umgesetzten Projekten. Solche Anwendungen unterscheiden sich von einer Website vor allem durch Zustandsverwaltung, Spiellogik und Datenhaltung über viele gleichzeitige Nutzer. Wenn Ihr Projekt in diese Richtung geht, klären wir im Erstgespräch offen, was realistisch ist.",
      },
      {
        frage: "Nutzen Sie WordPress?",
        antwort:
          "In der Regel nicht. WordPress ist für viele Projekte ein Kompromiss aus Plugins, Sicherheitsupdates und Ladezeit. Ich baue lieber schlank und schnell. Wenn Sie ein bestehendes WordPress-Projekt haben, schauen wir uns gemeinsam an, ob eine Ablösung oder eine Optimierung sinnvoller ist.",
      },
      {
        frage: "Gehört der Code danach mir?",
        antwort:
          "Ja. Nach vollständiger Bezahlung erhalten Sie den Quellcode und alle Zugänge. Es gibt keine Abhängigkeit von mir als Person und kein proprietäres System, das Sie an mich bindet.",
      },
      {
        frage: "Übernehmen Sie auch bestehende Projekte?",
        antwort:
          "Wenn der Code eine tragfähige Basis hat, ja. Manchmal ist ein Neubau allerdings günstiger als die Reparatur — das sage ich Ihnen offen, auch wenn der kleinere Auftrag für mich der bequemere wäre. Schicken Sie mir den Link per WhatsApp, dann schaue ich es mir an.",
      },
    ],
    related: ["individuelle-loesungen", "webdesign", "automationen"],
  },
  {
    slug: "automationen",
    name: "Automationen",
    h1: "Automationen, die Ihnen die Woche zurückgeben",
    eyebrow: "Leistung",
    title: "Automationen & Prozessautomatisierung",
    description:
      "Wiederkehrende Aufgaben automatisieren: Anfragen, Angebote, Termine, Datenübergaben. Weniger Handarbeit, weniger Fehler. Klickhafen aus Castrop-Rauxel.",
    claim: "Wiederkehrende Handarbeit läuft ab jetzt von selbst — fehlerfrei.",
    intro:
      "Jeder Betrieb hat sie: Aufgaben, die jede Woche gleich ablaufen und trotzdem jedes Mal jemanden binden. Das sind keine Aufgaben, das sind Kosten mit Gewohnheitsrecht.",
    problem: {
      heading: "Woran Sie Handarbeit erkennen, die weg kann",
      body: "Die teuersten Prozesse sind selten die großen. Es sind die kleinen, die sich täglich wiederholen und deshalb nie hinterfragt werden.",
      punkte: [
        "Daten werden von einem System ins nächste abgetippt.",
        "Anfragen bleiben liegen, weil niemand feste Zuständigkeit hat.",
        "Angebote und Rechnungen entstehen jedes Mal von Hand aus derselben Vorlage.",
        "Nachfassen passiert dann, wenn jemand zufällig daran denkt.",
      ],
    },
    loesung: {
      heading: "Was ich automatisiere",
      body: "Ich schaue mir Ihre Abläufe an und trenne, was Urteilsvermögen braucht, von dem, was nur Regeln folgt. Der zweite Teil kann laufen, ohne dass jemand hinschaut.",
      punkte: [
        "Anfragen landen automatisch am richtigen Ort, mit Kontext und Zuständigkeit.",
        "Systeme reden miteinander: Website, Kalender, Buchhaltung, Tabellen.",
        "Automatisches, freundliches Nachfassen — kein Lead verfällt aus Vergesslichkeit.",
        "Dokumente entstehen aus Daten statt aus Copy-Paste.",
      ],
    },
    ablauf: [
      {
        titel: "Peilung",
        body: "Wir gehen Ihre Woche durch und suchen die Wiederholungen. Meist reicht ein Gespräch, um zwei bis drei lohnende Kandidaten zu finden.",
      },
      {
        titel: "Kurs setzen",
        body: "Ich rechne vor, was ein Prozess Sie heute an Zeit kostet und was die Automation kostet. Rechnet es sich nicht, sage ich das.",
      },
      {
        titel: "Ausrüsten",
        body: "Aufbau der Automation, zuerst parallel zum bestehenden Ablauf. So sehen Sie, dass sie funktioniert, bevor Sie sich darauf verlassen.",
      },
      {
        titel: "Auslaufen",
        body: "Scharfschaltung, Überwachung, Übergabe. Sie wissen, was passiert, wenn etwas hakt — und werden benachrichtigt statt überrascht.",
      },
    ],
    ergebnis: {
      heading: "Was danach anders ist",
      body: "Ihre Leute machen die Arbeit, für die Sie sie eingestellt haben.",
      punkte: [
        "Wiederkehrende Aufgaben kosten Minuten statt Stunden pro Woche.",
        "Übertragungsfehler zwischen Systemen fallen praktisch weg.",
        "Keine Anfrage bleibt mehr unbeantwortet liegen.",
      ],
    },
    faq: [
      {
        frage: "Was lässt sich in einem kleinen Betrieb überhaupt automatisieren?",
        antwort:
          "Fast alles, was Regeln folgt und sich wiederholt: eingehende Anfragen sortieren und zuweisen, Terminbestätigungen und Erinnerungen verschicken, Angebote aus Vorlagen erzeugen, Daten zwischen Website, Kalender und Buchhaltung übertragen, Bewertungen anfragen, Leads nachfassen. Nicht automatisierbar ist alles, was echtes Urteilsvermögen verlangt — genau das soll ja bei Ihnen bleiben.",
      },
      {
        frage: "Ab wann lohnt sich eine Automation finanziell?",
        antwort:
          "Als Faustregel: Wenn eine Aufgabe wöchentlich wiederkehrt und mehr als eine halbe Stunde kostet, ist sie ein Kandidat. Vor dem Bau rechne ich die eingesparte Zeit gegen die einmaligen Kosten — meist amortisiert sich eine sinnvolle Automation innerhalb weniger Monate. Wenn die Rechnung nicht aufgeht, rate ich ab.",
      },
      {
        frage: "Muss ich meine bestehende Software wechseln?",
        antwort:
          "In der Regel nicht. Automationen setzen auf dem auf, was Sie bereits nutzen, und verbinden es. Ein Systemwechsel ist die Ausnahme und nur dann ein Thema, wenn Ihr aktuelles Werkzeug schlicht keine Schnittstelle hat.",
      },
      {
        frage: "Was passiert, wenn eine Automation ausfällt?",
        antwort:
          "Jede Automation bekommt eine Fehlerbehandlung und eine Benachrichtigung. Fällt ein Schritt aus, erfahren Sie es aktiv — statt es Wochen später am fehlenden Ergebnis zu merken. Kritische Abläufe bekommen zusätzlich einen manuellen Notweg.",
      },
      {
        frage: "Werden dadurch Mitarbeiter überflüssig?",
        antwort:
          "Meine Erfahrung ist das Gegenteil: Automation entfernt die stumpfe Arbeit, nicht die Menschen. In den meisten Betrieben ist nicht zu wenig zu tun, sondern zu wenig Zeit für das, was wirklich zählt — Kundenkontakt, Qualität, Angebote. Genau dorthin fließt die gewonnene Zeit.",
      },
    ],
    related: ["individuelle-loesungen", "webentwicklung", "funnels"],
  },
  {
    slug: "seo-aeo-geo-cro",
    name: "SEO & Conversion",
    h1: "Gefunden werden — bei Google und in KI-Antworten",
    eyebrow: "Leistung",
    title: "SEO, AEO, GEO & CRO — Sichtbarkeit und Conversion",
    description:
      "Sichtbar in Suchmaschinen und in KI-Antworten (SEO, AEO, GEO) — und aus Besuchern werden Anfragen (CRO). Messbar statt Bauchgefühl. Klickhafen aus Castrop-Rauxel.",
    claim:
      "Sichtbar in Google und in KI-Antworten — und aus Besuchern werden Anfragen.",
    intro:
      "Sichtbarkeit ohne Conversion ist teure Statistik. Conversion ohne Sichtbarkeit ist ein gutes Schaufenster in einer leeren Straße. Beides gehört zusammen, deshalb behandle ich es als eine Aufgabe.",
    problem: {
      heading: "Warum klassisches SEO allein nicht mehr reicht",
      body: "Die Suche hat sich verschoben. Ein wachsender Teil Ihrer Kunden fragt nicht mehr Google, sondern ein KI-System — und bekommt eine fertige Antwort statt zehn blauer Links. Wer in dieser Antwort nicht vorkommt, existiert für diesen Kunden nicht.",
      punkte: [
        "Rankings ohne Anfragen: Traffic steigt, der Umsatz nicht.",
        "KI-Systeme beantworten die Frage — und nennen jemand anderen als Quelle.",
        "Die Seite ist zu langsam, und Ladezeit ist längst ein Rankingfaktor.",
        "Inhalte beantworten keine echten Fragen, sondern umkreisen Keywords.",
      ],
    },
    loesung: {
      heading: "Die vier Hebel, an denen ich arbeite",
      body: "SEO bringt Sie in die Suchergebnisse. AEO und GEO bringen Sie in die Antwort, die eine KI Ihrem Kunden vorliest. CRO sorgt dafür, dass aus dem Besuch eine Anfrage wird. Nur zusammen ergeben sie eine Rechnung, die aufgeht.",
      punkte: [
        "SEO: technisches Fundament, saubere Struktur, sprechende URLs, Ladezeit.",
        "AEO: Inhalte, die eine konkrete Frage präzise und zitierfähig beantworten.",
        "GEO: strukturierte Daten und klare Aussagen, die generative Systeme sicher übernehmen.",
        "CRO: eine Hauptaussage pro Sektion, Beweis neben dem CTA, kurzer Weg zur Anfrage.",
      ],
    },
    ablauf: [
      {
        titel: "Peilung",
        body: "Bestandsaufnahme: Wonach suchen Ihre Kunden wirklich, wo stehen Sie heute, was sagen KI-Systeme über Ihre Branche — und über Sie?",
      },
      {
        titel: "Kurs setzen",
        body: "Priorisierte Maßnahmenliste, sortiert nach Wirkung geteilt durch Aufwand. Sie sehen, was zuerst passiert und warum.",
      },
      {
        titel: "Ausrüsten",
        body: "Umsetzung: Technik, Struktur, Inhalte, strukturierte Daten, Conversion-Elemente.",
      },
      {
        titel: "Auslaufen",
        body: "Messung gegen den Ausgangswert. Nicht Rankings allein — Anfragen. Danach nachschärfen.",
      },
    ],
    ergebnis: {
      heading: "Was danach anders ist",
      body: "Sichtbarkeit, die sich in Anfragen übersetzt — und nachweisbar ist.",
      punkte: [
        "Sie erscheinen für Suchanfragen mit echter Kaufabsicht.",
        "KI-Systeme nennen Sie als Quelle, statt Sie zu übergehen.",
        "Aus demselben Traffic entstehen mehr Anfragen.",
      ],
    },
    faq: [
      {
        frage: "Was ist der Unterschied zwischen SEO, AEO und GEO?",
        antwort:
          "SEO (Search Engine Optimization) zielt auf Platzierungen in klassischen Suchergebnissen. AEO (Answer Engine Optimization) zielt darauf, dass Ihre Inhalte als direkte Antwort ausgespielt werden — etwa in Featured Snippets oder Sprachassistenten. GEO (Generative Engine Optimization) zielt darauf, dass generative KI-Systeme Ihre Inhalte in ihre Antworten übernehmen und Sie als Quelle nennen. Die technische Basis überschneidet sich stark; der Unterschied liegt darin, wie Inhalte strukturiert und formuliert werden.",
      },
      {
        frage: "Wie lange dauert es, bis SEO wirkt?",
        antwort:
          "Technische Korrekturen und Ladezeit wirken innerhalb von Tagen bis wenigen Wochen. Inhaltliche und strukturelle Arbeit braucht typischerweise drei bis sechs Monate, bis sie sich stabil in Platzierungen zeigt. Wer Ihnen Top-Platzierungen in vier Wochen verspricht, verkauft Ihnen entweder Zufall oder Risiko.",
      },
      {
        frage: "Kann man Rankings garantieren?",
        antwort:
          "Nein, und niemand kann das seriös. Weder Google noch ein KI-Anbieter verkauft Platzierungen an Dienstleister. Was sich zusagen lässt, ist die saubere Umsetzung der Faktoren, die nachweislich wirken — und eine ehrliche Messung des Ergebnisses.",
      },
      {
        frage: "Was bringt CRO, wenn ich kaum Besucher habe?",
        antwort:
          "Bei sehr wenig Traffic sind belastbare Tests schwierig — aber die handwerklichen Grundlagen wirken trotzdem sofort: klare Hierarchie, ein eindeutiger nächster Schritt, Beweis in der Nähe des CTAs, kurze Ladezeit. Diese Basis lohnt sich ab dem ersten Besucher. Systematisches Testen macht erst später Sinn.",
      },
      {
        frage: "Hilft SEO auch lokal in Castrop-Rauxel und im Ruhrgebiet?",
        antwort:
          "Ja, und lokal ist der Hebel oft am größten, weil der Wettbewerb dort überschaubarer ist als bundesweit. Dazu gehören ein sauberer Google-Unternehmensprofil-Eintrag, einheitliche Angaben zu Name, Adresse und Telefonnummer, lokale Bezüge in den Inhalten und passende strukturierte Daten.",
      },
    ],
    related: ["funnels", "webdesign", "webentwicklung"],
  },
  {
    slug: "funnels",
    name: "Funnels",
    h1: "Funnels, die aus Aufmerksamkeit Aufträge machen",
    eyebrow: "Leistung",
    title: "Funnel-Bau & Conversion-Strecken",
    description:
      "Funnels, die führen statt zu überreden: ein Versprechen, ein Weg, ein nächster Schritt. Mehr qualifizierte Anfragen aus dem Traffic, den Sie schon haben. Klickhafen aus Castrop-Rauxel.",
    claim: "Ein Weg, ein Versprechen, ein nächster Schritt — vom Klick zur Anfrage.",
    intro:
      "Ein Funnel ist kein Trick. Er ist die Entscheidung, Ihrem Interessenten genau einen klaren Weg anzubieten statt zwölf Möglichkeiten, sich zu verlaufen.",
    problem: {
      heading: "Warum Kampagnen Geld verbrennen",
      body: "Die meisten Werbebudgets scheitern nicht an der Anzeige, sondern an dem, was nach dem Klick passiert. Der Besucher kommt mit einer konkreten Erwartung an — und landet auf einer Startseite, die alles anbietet und nichts verspricht.",
      punkte: [
        "Die Anzeige verspricht A, die Seite spricht über B.",
        "Zu viele Wege: Menü, Blog, Newsletter, Kontakt — und keine Entscheidung.",
        "Das Formular fragt zehn Dinge, bevor es irgendetwas gegeben hat.",
        "Nach dem Absenden passiert tagelang nichts.",
      ],
    },
    loesung: {
      heading: "Wie ein Funnel bei mir aussieht",
      body: "Jede Stufe hat genau eine Aufgabe: das Versprechen der Anzeige einlösen, den Zweifel ausräumen, den nächsten Schritt leicht machen. Bei Klickhafen endet dieser Schritt immer in einem echten Gespräch per WhatsApp — nicht in einem Formular, das im Nichts verschwindet.",
      punkte: [
        "Botschaftsgleichheit: Was die Anzeige verspricht, steht oben auf der Seite.",
        "Ein primärer CTA pro Sektion. Alle Ablenkung fliegt raus.",
        "Beweis genau dort, wo der Zweifel entsteht — nicht drei Bildschirme später.",
        "Direkter Einstieg ins Gespräch statt Formular-Warteschleife.",
      ],
    },
    ablauf: [
      {
        titel: "Peilung",
        body: "Wir klären Angebot, Zielgruppe und den einen Schritt, den der Besucher am Ende gehen soll.",
      },
      {
        titel: "Kurs setzen",
        body: "Aufbau der Strecke: Einstieg, Argumentation, Einwände, Abschluss. Als Text, bevor irgendetwas gestaltet wird.",
      },
      {
        titel: "Ausrüsten",
        body: "Bau der Seiten, Anbindung an WhatsApp mit kontextabhängiger Erstnachricht, Messpunkte einrichten.",
      },
      {
        titel: "Auslaufen",
        body: "Live, messen, nachschärfen. Der erste Entwurf ist nie der beste — aber der Startpunkt, ab dem man weiß, woran man dreht.",
      },
    ],
    ergebnis: {
      heading: "Was danach anders ist",
      body: "Derselbe Traffic, deutlich mehr daraus.",
      punkte: [
        "Mehr qualifizierte Anfragen bei gleichem Werbebudget.",
        "Sie wissen vor dem Gespräch, worum es geht.",
        "Sie sehen, an welcher Stufe Interessenten aussteigen — und können es ändern.",
      ],
    },
    faq: [
      {
        frage: "Was ist ein Funnel überhaupt?",
        antwort:
          "Ein Funnel ist der geführte Weg vom ersten Kontakt bis zur Anfrage. Statt einen Besucher auf einer Website mit allen Informationen allein zu lassen, führt ihn ein Funnel Schritt für Schritt: Versprechen einlösen, Zweifel ausräumen, nächsten Schritt anbieten. Jede Stufe hat genau eine Aufgabe.",
      },
      {
        frage: "Brauche ich einen Funnel, wenn ich schon eine Website habe?",
        antwort:
          "Eine Website und ein Funnel lösen unterschiedliche Aufgaben. Die Website ist Ihr Auftritt für alle — Interessenten, Bewerber, Partner. Ein Funnel ist auf eine einzige Zielgruppe und ein einziges Angebot zugeschnitten. Sobald Sie bezahlten Traffic auf eine allgemeine Startseite schicken, verlieren Sie Geld: Ein eigener Funnel lohnt sich dann fast immer.",
      },
      {
        frage: "Warum endet der Funnel in WhatsApp und nicht in einem Formular?",
        antwort:
          "Weil ein Formular eine Einbahnstraße mit Wartezeit ist und WhatsApp ein Gespräch. Die Hemmschwelle für eine Nachricht ist deutlich niedriger als für ein Formular mit zehn Feldern, die Antwort kommt sofort, und beide Seiten haben den Verlauf. Deshalb gibt es auf dieser Website bewusst kein einziges Kontaktformular.",
      },
      {
        frage: "Schalten Sie auch die Werbeanzeigen?",
        antwort:
          "Mein Schwerpunkt ist alles ab dem Klick: Strecke, Seiten, Technik, Messung. Wenn Sie bereits jemanden für die Anzeigen haben, arbeite ich zu. Wenn nicht, besprechen wir im Erstgespräch, was Sie für Ihren Fall tatsächlich brauchen.",
      },
      {
        frage: "Wie messe ich, ob der Funnel funktioniert?",
        antwort:
          "Vor dem Start halten wir den Ausgangswert fest — Besucher, Anfragen, Kosten pro Anfrage. Danach zählt nur die Veränderung dieser Zahlen, nicht das Bauchgefühl. Die Messpunkte richte ich datensparsam ein, ohne Ihre Besucher quer durchs Netz zu verfolgen.",
      },
    ],
    related: ["seo-aeo-geo-cro", "webdesign", "automationen"],
  },
  {
    slug: "individuelle-loesungen",
    name: "Individuelle Lösungen",
    h1: "Individuelle Lösungen für alles, wofür es kein Produkt gibt",
    eyebrow: "Leistung",
    title: "Individuelle Softwarelösungen & Custom Development",
    description:
      "Wenn Standardsoftware nicht passt: maßgeschneiderte Werkzeuge, Portale und Schnittstellen — gebaut auf Ihren Prozess. Klickhafen aus Castrop-Rauxel.",
    claim: "Wenn Standardsoftware nicht passt, wird eben etwas gebaut, das passt.",
    intro:
      "Irgendwann stößt jeder Betrieb an den Punkt, an dem die Software den Prozess bestimmt statt umgekehrt. Dann wird die Tabelle zum Provisorium, das seit drei Jahren läuft.",
    problem: {
      heading: "Woran Sie merken, dass Standard nicht mehr trägt",
      body: "Es fängt harmlos an: eine Tabelle daneben, ein zweites Werkzeug, ein Workaround. Irgendwann ist der Workaround der Prozess — und niemand weiß mehr, wo die Wahrheit steht.",
      punkte: [
        "Sie bezahlen fünf Werkzeuge und nutzen von jedem zehn Prozent.",
        "Eine Tabelle hält den Betrieb zusammen, und nur eine Person versteht sie.",
        "Ihr Ablauf ist Ihr Wettbewerbsvorteil — aber keine Standardsoftware bildet ihn ab.",
        "Die Lizenzkosten wachsen mit dem Team, der Nutzen nicht.",
      ],
    },
    loesung: {
      heading: "Was ich baue",
      body: "Ein Werkzeug, das genau Ihren Ablauf abbildet — nicht mehr. Kein Funktionsberg, den niemand anfasst, sondern die zehn Prozent, die Sie täglich brauchen, richtig gut gemacht.",
      punkte: [
        "Interne Werkzeuge: Verwaltung, Planung, Auswertung — auf Ihren Prozess zugeschnitten.",
        "Kundenportale mit Login, Daten und Selbstbedienung.",
        "Schnittstellen zwischen Systemen, die sonst nicht miteinander reden.",
        "Rechner, Konfiguratoren und Werkzeuge, die Ihre Beratung vorbereiten.",
      ],
    },
    ablauf: [
      {
        titel: "Peilung",
        body: "Ich schaue mir Ihren echten Ablauf an — nicht den, der im Handbuch steht. Meist liegt das Problem woanders als vermutet.",
      },
      {
        titel: "Kurs setzen",
        body: "Wir schneiden auf das Kleinste zu, das echten Nutzen bringt. Alles andere kann später kommen, wenn es sich als nötig erweist.",
      },
      {
        titel: "Ausrüsten",
        body: "Bau in sichtbaren Etappen. Sie arbeiten früh mit einer laufenden Version und korrigieren, solange es günstig ist.",
      },
      {
        titel: "Auslaufen",
        body: "Einführung, Schulung, Dokumentation. Danach gehört es Ihnen — samt Code.",
      },
    ],
    ergebnis: {
      heading: "Was danach anders ist",
      body: "Die Software folgt Ihrem Prozess, nicht andersherum.",
      punkte: [
        "Ein Werkzeug statt fünf Abos und drei Tabellen.",
        "Ihr Vorgehen ist im System abgebildet — auch für neue Mitarbeiter nachvollziehbar.",
        "Keine Lizenzkosten, die mit jedem neuen Kopf steigen.",
      ],
    },
    faq: [
      {
        frage: "Wann lohnt sich Individualsoftware gegenüber einer Standardlösung?",
        antwort:
          "Wenn Ihr Ablauf ein Wettbewerbsvorteil ist und Standardsoftware Sie zwingt, ihn aufzugeben. Oder wenn die Summe aus Lizenzkosten, Workarounds und verlorener Zeit die einmaligen Baukosten übersteigt. Ist Ihr Prozess dagegen branchenüblich, ist ein fertiges Produkt fast immer die klügere Wahl — das sage ich Ihnen dann auch.",
      },
      {
        frage: "Was kostet eine individuelle Lösung?",
        antwort:
          "Das hängt vollständig vom Umfang ab, und seriös lässt sich das erst nach der Peilung sagen. Um das Risiko klein zu halten, schneide ich Projekte bewusst auf einen ersten nutzbaren Stand zu: Sie investieren in einen überschaubaren ersten Schritt und entscheiden danach mit echten Erfahrungswerten, ob und wie es weitergeht.",
      },
      {
        frage: "Was passiert, wenn Sie später nicht mehr verfügbar sind?",
        antwort:
          "Deshalb bekommen Sie Quellcode, Zugänge und Dokumentation. Ich baue mit verbreiteten, gut dokumentierten Technologien — bewusst nichts Exotisches. Jeder kompetente Entwickler kann übernehmen. Eine Abhängigkeit von meiner Person ist kein Geschäftsmodell, sondern ein Risiko für Sie.",
      },
      {
        frage: "Können Sie an bestehende Systeme anbinden?",
        antwort:
          "In der Regel ja, sofern das System eine Schnittstelle anbietet. Falls nicht, gibt es meist andere Wege — vom regelmäßigen Datenexport bis zur direkten Datenbankanbindung. Was in Ihrem Fall geht, klären wir in der Peilung, bevor irgendetwas zugesagt wird.",
      },
    ],
    related: ["webentwicklung", "automationen", "baukasten-loesungen"],
  },
  {
    slug: "baukasten-loesungen",
    name: "Baukasten-Lösungen",
    h1: "Baukasten-Lösungen: schnell an Bord, ohne Ballast",
    eyebrow: "Leistung",
    title: "Baukasten-Websites — schneller, günstiger Einstieg",
    description:
      "Der schnelle, günstige Einstieg ins Web: eine professionelle Website in Tagen statt Wochen, auf Basis bewährter Bausteine. Klickhafen aus Castrop-Rauxel.",
    claim: "Der schnelle, günstige Einstieg — professionell, nur eben nicht maßgeschneidert.",
    intro:
      "Nicht jedes Projekt braucht einen Maßanzug. Manchmal muss es einfach schnell, gut und bezahlbar sein — und genau dafür gibt es diesen Weg.",
    problem: {
      heading: "Wenn ein großes Projekt gerade nicht passt",
      body: "Es gibt Situationen, in denen ein individueller Auftritt die falsche Antwort ist: Sie starten gerade, testen ein Angebot oder brauchen schlicht kurzfristig etwas Vorzeigbares.",
      punkte: [
        "Sie gründen und brauchen jetzt eine seriöse Adresse, nicht in zwei Monaten.",
        "Das Budget ist real begrenzt — und das ist kein Makel, sondern eine Rahmenbedingung.",
        "Sie testen ein Angebot und wollen vor dem Investieren wissen, ob es zieht.",
        "Ihr aktueller Auftritt schadet mehr, als er nützt, und jede Woche zählt.",
      ],
    },
    loesung: {
      heading: "Was Sie hier bekommen — und was nicht",
      body: "Ich arbeite mit einem erprobten Baukasten aus fertigen Bausteinen und passe ihn an Ihre Inhalte, Ihre Farben und Ihr Angebot an. Ehrlich gesagt: Das Ergebnis ist nicht so eigenständig wie ein individueller Auftritt. Es ist schnell, solide, professionell — und deutlich besser als nichts oder als der Auftritt von vor acht Jahren.",
      punkte: [
        "Livegang in Tagen statt Wochen.",
        "Klar kalkulierbarer Festpreis ohne Überraschungen.",
        "Dieselben Grundlagen wie bei jedem Projekt: mobil, schnell, sauber, mit WhatsApp-CTA.",
        "Später jederzeit auf eine individuelle Lösung erweiterbar — ohne bei null anzufangen.",
      ],
    },
    ablauf: [
      {
        titel: "Peilung",
        body: "Ein kurzes Gespräch: Was bieten Sie an, wen wollen Sie erreichen, was muss die Seite leisten?",
      },
      {
        titel: "Kurs setzen",
        body: "Auswahl der passenden Bausteine und Festpreis. Sie wissen vorher, was Sie bekommen und was es kostet.",
      },
      {
        titel: "Ausrüsten",
        body: "Aufbau mit Ihren Inhalten, Ihren Farben, Ihrem Angebot. Eine Feedbackrunde ist eingeplant.",
      },
      {
        titel: "Auslaufen",
        body: "Livegang inklusive Domain, Technik und WhatsApp-Anbindung.",
      },
    ],
    ergebnis: {
      heading: "Was danach anders ist",
      body: "Sie sind online, auffindbar und anfragbar — schnell und ohne großes Risiko.",
      punkte: [
        "Ein Auftritt, den Sie ohne Zögern weitergeben können.",
        "Ein klarer Weg zur Anfrage statt einer digitalen Visitenkarte.",
        "Ein Fundament, auf dem später aufgebaut werden kann.",
      ],
    },
    faq: [
      {
        frage: "Was ist der Unterschied zwischen Baukasten und individuellem Webdesign?",
        antwort:
          "Beim Baukasten setze ich bewährte, fertige Bausteine zusammen und passe sie an Ihre Inhalte und Farben an — schnell und günstig, aber in der Gestaltung begrenzt. Beim individuellen Webdesign entsteht ein eigenes visuelles System, das nur zu Ihnen passt. Der Baukasten ist der pragmatische Einstieg, das individuelle Design der eigenständige Auftritt.",
      },
      {
        frage: "Wie schnell kann eine Baukasten-Website online sein?",
        antwort:
          "Wenn Ihre Inhalte bereitstehen, sind wenige Werktage realistisch. Der Engpass liegt fast immer bei Texten und Bildern, nicht beim Bau. Wer beim Erstgespräch schon weiß, was auf der Seite stehen soll, ist entsprechend schnell live.",
      },
      {
        frage: "Kann ich später auf eine individuelle Lösung umsteigen?",
        antwort:
          "Ja, und das ist ausdrücklich vorgesehen. Domain, Inhalte und Struktur bleiben erhalten, der Auftritt wird darauf aufbauend eigenständig ausgebaut. Sie fangen nicht bei null an und werfen nichts weg.",
      },
      {
        frage: "Ist eine Baukasten-Website schlecht für SEO?",
        antwort:
          "Nicht bei mir. Die technischen Grundlagen sind dieselben wie bei jedem Projekt: saubere Struktur, kurze Ladezeit, sprechende URLs, strukturierte Daten, eigene Meta-Angaben. Was im Baukasten begrenzt ist, ist die gestalterische Eigenständigkeit — nicht die technische Qualität.",
      },
    ],
    related: ["webdesign", "webentwicklung", "individuelle-loesungen"],
  },
];

/** Nachschlagen per Slug — gibt undefined zurück, wenn es die Leistung nicht gibt. */
export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Die verwandten Leistungen eines Service, aufgelöst und ohne Lücken. */
export function getRelated(service: Service): Service[] {
  return service.related
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s));
}

export const serviceSlugs = services.map((s) => s.slug);
