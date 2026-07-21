import type { Faq } from "./services";

/**
 * Die eine Quelle für den Blog. Übersicht, Einzelseiten, Sitemap, Zähler in
 * der Navigation und die Schemas lesen ausschließlich hier.
 *
 * Bewusst als typisierte Daten statt MDX: dieselbe Architektur wie
 * lib/services.ts, keine zusätzliche Abhängigkeit, und die Struktur ist
 * erzwungen — jeder Beitrag MUSS eine Kurzantwort und eine FAQ haben.
 *
 * ACHTUNG (Enrico): Die Texte sind fachlich, aber sie erscheinen unter deinem
 * Namen. Lies sie vor dem Livegang. Es stehen bewusst KEINE Kennzahlen zu
 * deinen Projekten darin — nur allgemeine Fachaussagen, die belegbar sind.
 */

export type BlogBlock =
  | { typ: "absatz"; text: string }
  | { typ: "h2"; text: string }
  | { typ: "liste"; punkte: string[] }
  | { typ: "hinweis"; text: string };

export type BlogPost = {
  slug: string;
  /** H1 der Seite — bewusst als Frage, wenn die Suchanfrage eine Frage ist */
  titel: string;
  /** <title> — darf kürzer sein als die H1 */
  title: string;
  beschreibung: string;
  eyebrow: string;
  kategorie: string;
  /** ISO-Datum. TODO(Enrico): auf das echte Veröffentlichungsdatum setzen. */
  datum: string;
  aktualisiert?: string;
  lesezeit: number;
  /**
   * AEO/GEO: die direkte Antwort auf die Titelfrage in zwei bis vier Sätzen,
   * ganz oben, ohne Anlauf. Genau diesen Absatz zitieren Antwortmaschinen —
   * wer die Antwort erst in Absatz sieben gibt, wird nicht genannt.
   */
  kurzantwort: string;
  blocks: BlogBlock[];
  faq: Faq[];
  /** Service-Slugs: interne Verlinkung und Kontext für den WhatsApp-CTA */
  leistungen: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "was-kostet-eine-website",
    titel: "Was kostet eine Website 2026 wirklich?",
    title: "Was kostet eine Website? Preise ehrlich erklärt",
    beschreibung:
      "Was eine professionelle Website kostet, wovon der Preis abhängt und warum Pauschalpreise fast immer daneben liegen. Ehrliche Einordnung von Klickhafen aus Castrop-Rauxel.",
    eyebrow: "Grundlagen",
    kategorie: "Grundlagen",
    datum: "2026-07-17",
    lesezeit: 6,
    kurzantwort:
      "Eine professionelle Website kostet in Deutschland je nach Umfang typischerweise zwischen einem niedrigen vierstelligen Betrag für einen fokussierten Auftritt mit wenigen Seiten und einem fünfstelligen Betrag für individuelle Anwendungen mit Anbindungen. Den Preis bestimmen vor allem drei Dinge: die Anzahl eigenständiger Seitentypen, ob Inhalte vorhanden sind oder erst entstehen müssen, und ob Fremdsysteme angebunden werden. Wer einen Festpreis ohne Gespräch nennt, kalkuliert entweder einen Puffer ein oder liefert eine Vorlage.",
    blocks: [
      {
        typ: "absatz",
        text: "„Was kostet eine Website?“ ist die häufigste Frage, die mich erreicht — und die ehrlichste Antwort lautet zunächst: Das kann Ihnen niemand seriös sagen, ohne zu wissen, was die Seite leisten soll. Das ist keine Ausrede. Es ist derselbe Grund, aus dem ein Handwerker keinen Preis für „ein Haus“ nennt.",
      },
      { typ: "h2", text: "Die drei Faktoren, die den Preis wirklich treiben" },
      {
        typ: "absatz",
        text: "In der Praxis entscheiden nicht Design-Geschmack oder Farbwünsche über den Aufwand, sondern drei nüchterne Dinge:",
      },
      {
        typ: "liste",
        punkte: [
          "Anzahl eigenständiger Seitentypen. Zwanzig Unterseiten nach demselben Muster kosten kaum mehr als fünf. Fünf Seiten, die alle anders funktionieren, kosten deutlich mehr.",
          "Herkunft der Inhalte. Liegen Texte und Bilder vor, wird gebaut. Müssen sie erst entstehen, ist das ein eigenes Projekt — und in aller Regel der größte Zeitfaktor.",
          "Anbindungen. Eine Seite, die für sich steht, ist überschaubar. Sobald Kalender, Warenwirtschaft, Zahlungsanbieter oder ein CRM mitspielen sollen, wächst der Aufwand sprunghaft.",
        ],
      },
      { typ: "h2", text: "Warum Pauschalpreise fast immer daneben liegen" },
      {
        typ: "absatz",
        text: "Ein Listenpreis muss den schlimmsten Fall abdecken, sonst rechnet er sich für den Anbieter nicht. Für Sie heißt das: Entweder Sie bezahlen einen Puffer für Aufwand, den Ihr Projekt nie verursacht — oder der Preis ist so knapp kalkuliert, dass er nur mit einer Vorlage und minimaler Anpassung zu halten ist. Beides ist ein schlechtes Geschäft. Deshalb nenne ich einen Preis erst, wenn ich den Umfang kenne, und dann als Festpreis.",
      },
      { typ: "h2", text: "Was in einem seriösen Angebot stehen sollte" },
      {
        typ: "liste",
        punkte: [
          "Konkreter Leistungsumfang: welche Seiten, welche Funktionen, wie viele Korrekturrunden.",
          "Wer die Inhalte liefert — und bis wann.",
          "Was nach dem Livegang passiert: Wartung, Updates, Ansprechpartner.",
          "Wem der Quellcode gehört und ob Sie die Zugänge bekommen.",
          "Laufende Kosten getrennt vom einmaligen Preis: Domain, Hosting, eventuelle Lizenzen.",
        ],
      },
      {
        typ: "hinweis",
        text: "Achten Sie besonders auf den letzten Punkt. Ein niedriger Einstiegspreis mit hoher monatlicher Bindung ist oft teurer als ein höherer Festpreis — nur fällt es erst im dritten Jahr auf.",
      },
      { typ: "h2", text: "Die günstigste Website ist selten die billigste" },
      {
        typ: "absatz",
        text: "Eine Seite, die niemand findet und die keine Anfragen erzeugt, kostet Sie nicht ihren Preis — sie kostet Sie die Aufträge, die nie kamen. Umgekehrt ist ein aufwendiger Auftritt für ein Angebot, das sich noch nicht bewährt hat, verbranntes Geld. Deshalb gibt es bei Klickhafen bewusst beide Wege: eine Baukasten-Lösung für den schnellen, günstigen Einstieg und individuelles Webdesign, wenn Eigenständigkeit den Unterschied macht.",
      },
      {
        typ: "absatz",
        text: "Welcher Weg für Sie richtig ist, lässt sich in einem kurzen Gespräch klären. Meist reichen zwei Sätze zu Ihrem Vorhaben, damit ich Ihnen sagen kann, in welcher Größenordnung wir uns bewegen — und ob sich das für Sie überhaupt rechnet.",
      },
    ],
    faq: [
      {
        frage: "Was kostet eine einfache Website mit fünf Seiten?",
        antwort:
          "Ein fokussierter Auftritt mit wenigen Seiten liegt in Deutschland typischerweise im niedrigen bis mittleren vierstelligen Bereich, wenn er individuell gestaltet und technisch sauber gebaut wird. Auf Basis eines Baukastens ist der Einstieg deutlich günstiger. Den konkreten Betrag nenne ich erst, wenn ich weiß, ob Inhalte vorliegen und ob etwas angebunden werden muss.",
      },
      {
        frage: "Sind monatliche Website-Abos günstiger?",
        antwort:
          "Auf den ersten Blick ja, über die Laufzeit meist nicht. Rechnen Sie die monatliche Gebühr auf drei bis fünf Jahre hoch und vergleichen Sie das mit einem Festpreis. Prüfen Sie außerdem, ob Sie bei Kündigung Ihre Website behalten. Wenn nicht, mieten Sie Ihren eigenen Auftritt.",
      },
      {
        frage: "Was kostet eine Website laufend?",
        antwort:
          "Die Grundkosten sind überschaubar: Domain und Hosting bewegen sich für einen normalen Firmenauftritt im niedrigen zweistelligen Bereich pro Monat. Dazu kommen optional Wartung und inhaltliche Betreuung. Wichtig ist, dass diese Posten im Angebot getrennt ausgewiesen sind.",
      },
      {
        frage: "Warum nennen Sie keinen Preis auf der Website?",
        antwort:
          "Weil jeder genannte Preis für einen Teil der Interessenten zu hoch und für den anderen zu niedrig wäre. Ich müsste einen Puffer einrechnen, den die meisten Projekte nicht brauchen. Nach einem kurzen Gespräch bekommen Sie stattdessen einen Festpreis, der zu Ihrem Umfang passt.",
      },
    ],
    leistungen: ["webdesign", "baukasten-loesungen", "webentwicklung"],
  },
  {
    slug: "seo-aeo-geo-unterschied",
    titel: "SEO, AEO und GEO — was ist der Unterschied?",
    title: "SEO, AEO und GEO: der Unterschied einfach erklärt",
    beschreibung:
      "SEO bringt Sie in die Suchergebnisse, AEO in die direkte Antwort, GEO in die Antwort einer KI. Was die Begriffe bedeuten und was Sie konkret tun müssen.",
    eyebrow: "Sichtbarkeit",
    kategorie: "Sichtbarkeit",
    datum: "2026-07-17",
    lesezeit: 7,
    kurzantwort:
      "SEO (Search Engine Optimization) zielt auf Platzierungen in klassischen Suchergebnislisten. AEO (Answer Engine Optimization) zielt darauf, dass Ihr Inhalt als direkte Antwort ausgespielt wird — etwa in einem Featured Snippet oder von einem Sprachassistenten. GEO (Generative Engine Optimization) zielt darauf, dass generative KI-Systeme Ihre Inhalte in ihre Antwort übernehmen und Sie als Quelle nennen. Das technische Fundament ist bei allen dreien fast identisch; der Unterschied liegt darin, wie Inhalte strukturiert und formuliert sind.",
    blocks: [
      {
        typ: "absatz",
        text: "Die Suche hat sich verschoben. Ein wachsender Teil der Nutzer stellt seine Frage nicht mehr einer Liste blauer Links, sondern einem System, das eine fertige Antwort formuliert. Wer in dieser Antwort nicht vorkommt, existiert für diesen Nutzer nicht — unabhängig davon, auf welchem Platz er in der klassischen Ergebnisliste steht.",
      },
      { typ: "h2", text: "SEO: gefunden werden" },
      {
        typ: "absatz",
        text: "Klassisches SEO sorgt dafür, dass Ihre Seite überhaupt in den Ergebnissen auftaucht und dort möglichst weit oben steht. Das Handwerk dahinter ist unverändert wichtig und die Grundlage für alles Weitere:",
      },
      {
        typ: "liste",
        punkte: [
          "Technisches Fundament: kurze Ladezeit, saubere Struktur, sprechende URLs, mobile Nutzbarkeit.",
          "Inhalte, die eine echte Suchabsicht bedienen statt Keywords zu umkreisen.",
          "Eine klare Überschriftenhierarchie und semantisches HTML.",
          "Interne Verlinkung, die zusammengehörige Themen verbindet.",
        ],
      },
      { typ: "h2", text: "AEO: die Antwort sein" },
      {
        typ: "absatz",
        text: "Antwortmaschinen ziehen sich einen Absatz aus einer Seite und spielen ihn als Antwort aus. Damit das Ihr Absatz ist, muss er drei Bedingungen erfüllen: Er beantwortet genau eine Frage, er tut es sofort ohne Anlauf, und er ist ohne Umgebung verständlich. Ein Text, der die Antwort erst nach fünf Absätzen Kontext liefert, wird nicht ausgespielt.",
      },
      {
        typ: "hinweis",
        text: "Der wirksamste einzelne Handgriff: Stellen Sie die Frage als Überschrift und beantworten Sie sie direkt darunter in zwei bis vier Sätzen. Alles Weitere kommt danach.",
      },
      { typ: "h2", text: "GEO: zitiert werden" },
      {
        typ: "absatz",
        text: "Generative Systeme formulieren eine eigene Antwort aus mehreren Quellen und nennen diese Quellen. Damit Sie darunter sind, brauchen sie Aussagen, die sich gefahrlos übernehmen lassen: konkret, überprüfbar, klar zugeordnet. Vage Werbesprache ist für ein generatives System wertlos — sie enthält nichts, was sich zitieren ließe.",
      },
      {
        typ: "liste",
        punkte: [
          "Strukturierte Daten (JSON-LD) sagen der Maschine, was ein Text ist: eine FAQ, eine Leistung, ein Unternehmen, ein Artikel.",
          "Eindeutige, belegbare Aussagen statt Superlative. „Antwort in der Regel am selben Werktag“ ist zitierfähig, „blitzschneller Service“ nicht.",
          "Konsistenz über die ganze Seite: dieselben Angaben zu Name, Ort und Leistung überall.",
          "Erreichbarkeit für KI-Crawler — wer sie per robots.txt aussperrt, kommt in keiner Antwort vor.",
        ],
      },
      { typ: "h2", text: "Und CRO?" },
      {
        typ: "absatz",
        text: "Sichtbarkeit ohne Conversion ist teure Statistik. CRO (Conversion Rate Optimization) sorgt dafür, dass aus dem Besuch eine Anfrage wird: eine klare Hauptaussage pro Abschnitt, ein eindeutiger nächster Schritt, Beweis in der Nähe des Handlungsaufrufs. Erst SEO, AEO, GEO und CRO zusammen ergeben eine Rechnung, die aufgeht.",
      },
      {
        typ: "absatz",
        text: "Die gute Nachricht: Die Grundlagen überschneiden sich stark. Wer sauber strukturiert, präzise formuliert und schnell ausliefert, arbeitet auf alle vier gleichzeitig ein. Die schlechte: Abkürzungen gibt es keine.",
      },
    ],
    faq: [
      {
        frage: "Ersetzt GEO das klassische SEO?",
        antwort:
          "Nein. Generative Systeme greifen überwiegend auf Inhalte zurück, die auch klassisch auffindbar sind. Wer technisch schlecht aufgestellt ist, kommt weder in die Ergebnisliste noch in die KI-Antwort. GEO kommt zu SEO dazu, es löst es nicht ab.",
      },
      {
        frage: "Wie lange dauert es, bis Optimierungen wirken?",
        antwort:
          "Technische Korrekturen und Ladezeitverbesserungen wirken innerhalb von Tagen bis wenigen Wochen. Inhaltliche und strukturelle Arbeit braucht typischerweise drei bis sechs Monate, bis sie sich stabil zeigt. Wer Ihnen Top-Platzierungen in vier Wochen verspricht, verkauft Zufall oder Risiko.",
      },
      {
        frage: "Sollte ich KI-Crawler aussperren?",
        antwort:
          "Wenn Sie über KI-Antworten gefunden werden wollen, nein — dann sperren Sie sich selbst aus. Anders liegt der Fall bei Inhalten, die Sie ausdrücklich nicht in Trainingsdaten sehen möchten. Das ist eine geschäftliche Abwägung, keine technische.",
      },
      {
        frage: "Brauche ich strukturierte Daten wirklich?",
        antwort:
          "Für AEO und GEO sind sie der günstigste Hebel überhaupt: Sie sind einmalig eingerichtet, kosten keine Ladezeit und sagen Maschinen eindeutig, was Ihre Inhalte bedeuten. Ohne sie muss ein System raten — und rät im Zweifel zugunsten eines Wettbewerbers, der es ihm leichter macht.",
      },
    ],
    leistungen: ["seo-aeo-geo-cro", "webdesign", "webentwicklung"],
  },
  {
    slug: "warum-kein-kontaktformular",
    titel: "Warum es hier kein Kontaktformular gibt",
    title: "Kontaktformular oder WhatsApp? Eine Entscheidung",
    beschreibung:
      "Ein Formular ist eine Einbahnstraße mit Wartezeit, ein Chat ein Gespräch. Warum auf dieser Website kein einziges Kontaktformular steht — und wann ein Formular trotzdem richtig ist.",
    eyebrow: "Conversion",
    kategorie: "Conversion",
    datum: "2026-07-17",
    lesezeit: 5,
    kurzantwort:
      "Ein Kontaktformular verlangt Vorleistung, bevor es etwas gibt: Der Interessent füllt Felder aus, drückt Absenden und weiß danach nicht, ob die Nachricht angekommen ist oder wann jemand antwortet. Ein Chat über WhatsApp kehrt das um — die Hemmschwelle für eine Nachricht ist niedriger, die Antwort kommt sofort, und beide Seiten haben den Verlauf. Für Anfragen mit Beratungsbedarf ist das in aller Regel der kürzere Weg zum Auftrag.",
    blocks: [
      {
        typ: "absatz",
        text: "Auf dieser Website steht kein einziges Kontaktformular. Das ist kein Versäumnis, sondern eine Entscheidung — und sie geht auf eine simple Beobachtung zurück.",
      },
      { typ: "h2", text: "Was ein Formular dem Interessenten abverlangt" },
      {
        typ: "absatz",
        text: "Sehen Sie sich ein durchschnittliches Kontaktformular aus Sicht des Besuchers an. Er soll Name, E-Mail, Telefon, Betreff und ein Anliegen eintragen. Dafür bekommt er: einen grünen Hinweis, dass die Nachricht versendet wurde. Danach passiert für ihn sichtbar nichts. Er weiß nicht, ob jemand liest, ob die Mail im Spam liegt, ob heute noch eine Antwort kommt.",
      },
      {
        typ: "liste",
        punkte: [
          "Jedes zusätzliche Pflichtfeld kostet Abschlüsse — besonders die Telefonnummer.",
          "Die Rückfrage dauert Stunden bis Tage, in denen der Wettbewerb längst geantwortet hat.",
          "Der Interessent hat keinen Nachweis über das, was er geschrieben hat.",
          "Zustellprobleme fallen erst auf, wenn jemand nachfragt — also fast nie.",
        ],
      },
      { typ: "h2", text: "Was ein Chat anders macht" },
      {
        typ: "absatz",
        text: "Eine Nachricht zu tippen fühlt sich nicht an wie ein Antrag, sondern wie eine Frage. Genau das ist der Punkt: Der erste Kontakt darf keine Hürde sein. Bei Klickhafen ist die Erstnachricht zusätzlich passend vorformuliert — wer die Automationen-Seite liest und den Knopf drückt, hat bereits „Ich interessiere mich für Automationen“ im Feld stehen. Das kostet den Interessenten null Aufwand und mir sagt es sofort, worum es geht.",
      },
      {
        typ: "hinweis",
        text: "Der Effekt ist nicht der Kanal an sich, sondern die Umkehr der Vorleistung. Der Anbieter geht in Vorleistung, nicht der Interessent.",
      },
      { typ: "h2", text: "Wann ein Formular trotzdem richtig ist" },
      {
        typ: "absatz",
        text: "Ich würde nicht behaupten, dass Formulare grundsätzlich falsch sind. Es gibt klare Fälle, in denen sie die bessere Wahl sind:",
      },
      {
        typ: "liste",
        punkte: [
          "Wenn strukturierte Daten zwingend nötig sind, etwa bei einer Bewerbung mit Anlagen.",
          "Wenn die Anfragemenge so hoch ist, dass sie ohne Vorsortierung nicht zu bewältigen ist.",
          "Wenn die Zielgruppe Messenger geschäftlich nicht nutzt oder nicht nutzen darf.",
          "Wenn ein Prozess einen dokumentierten Eingang braucht.",
        ],
      },
      {
        typ: "absatz",
        text: "Für eine Agentur mit beratungsintensiven Anfragen trifft nichts davon zu. Deshalb die Entscheidung: ein Weg, kein Formular. Wenn Sie für Ihr Geschäft unsicher sind, welcher Weg passt — genau das ist eine der Fragen, die sich in fünf Minuten klären lässt.",
      },
      {
        typ: "absatz",
        text: "Ein Hinweis in eigener Sache: Wer auf WhatsApp setzt, muss das datenschutzrechtlich sauber abbilden. Beim Klick auf den Link werden Daten an den Messenger-Anbieter übermittelt, und das gehört in die Datenschutzerklärung. Wer das überspringt, tauscht ein Conversion-Problem gegen ein Rechtsproblem.",
      },
    ],
    faq: [
      {
        frage: "Ist ein WhatsApp-Button datenschutzkonform?",
        antwort:
          "Der Button selbst ist ein gewöhnlicher Link und lädt nichts nach. Entscheidend ist die Aufklärung: In der Datenschutzerklärung muss stehen, welche Daten beim Klick an den Anbieter übermittelt werden, auf welcher Rechtsgrundlage das geschieht und wie lange die Konversation gespeichert wird. Lassen Sie das im Zweifel rechtlich prüfen.",
      },
      {
        frage: "Verliere ich Anfragen, wenn ich kein Formular anbiete?",
        antwort:
          "Möglich ist das bei Zielgruppen, die Messenger geschäftlich nicht nutzen. Deshalb sollte der Weg zum Kontakt nie ausschließlich über einen einzigen Kanal laufen: Eine sichtbare E-Mail-Adresse und eine Telefonnummer kosten nichts und fangen genau diese Fälle auf.",
      },
      {
        frage: "Wie schnell muss ich auf eine Nachricht antworten?",
        antwort:
          "Der Vorteil des Kanals ist die Erwartung von Schnelligkeit — und genau darin liegt die Verpflichtung. Wer erst nach drei Tagen antwortet, hat den Vorteil verspielt und wirkt zusätzlich unzuverlässig. Wenn Sie das nicht leisten können, ist ein Formular mit klarer Antwortzusage ehrlicher.",
      },
    ],
    leistungen: ["funnels", "seo-aeo-geo-cro", "webdesign"],
  },
  {
    slug: "baukasten-oder-individuell",
    titel: "Website-Baukasten oder individuell bauen lassen?",
    title: "Baukasten oder individuelle Website? Entscheidungshilfe",
    beschreibung:
      "Wann ein Website-Baukasten die richtige Wahl ist und wann er Sie ausbremst. Eine ehrliche Entscheidungshilfe ohne Verkaufsinteresse.",
    eyebrow: "Entscheidung",
    kategorie: "Entscheidung",
    datum: "2026-07-17",
    lesezeit: 6,
    kurzantwort:
      "Ein Baukasten ist die richtige Wahl, wenn Sie schnell und günstig online sein müssen, Ihr Angebot branchenüblich ist und der Auftritt vor allem als seriöse Visitenkarte dient. Individuell bauen lohnt sich, sobald Eigenständigkeit ein Wettbewerbsvorteil ist, Sie bezahlten Traffic auf die Seite schicken oder Funktionen brauchen, die kein Baukasten abbildet. Die Faustregel: Solange die Website vor allem informiert, reicht ein Baukasten. Sobald sie verkaufen soll, wird der Unterschied messbar.",
    blocks: [
      {
        typ: "absatz",
        text: "Die Frage wird meist als Glaubensfrage geführt, ist aber eine Rechenaufgabe. Beide Wege haben eine klare Berechtigung — und ich biete bewusst beide an, weil die falsche Wahl in beide Richtungen teuer ist.",
      },
      { typ: "h2", text: "Wofür ein Baukasten gut genug ist" },
      {
        typ: "liste",
        punkte: [
          "Sie gründen gerade und brauchen jetzt eine seriöse Adresse, nicht in zwei Monaten.",
          "Ihr Budget ist real begrenzt — das ist kein Makel, sondern eine Rahmenbedingung.",
          "Sie testen ein Angebot und wollen vor dem Investieren wissen, ob es zieht.",
          "Die Seite informiert vor allem: Wer Sie sind, was Sie tun, wie man Sie erreicht.",
        ],
      },
      {
        typ: "absatz",
        text: "In diesen Fällen ist ein aufwendiger Auftritt schlicht die falsche Antwort. Eine solide Baukasten-Seite, die in wenigen Tagen steht, schlägt eine perfekte Seite, die nie fertig wird.",
      },
      { typ: "h2", text: "Wo ein Baukasten anfängt zu bremsen" },
      {
        typ: "absatz",
        text: "Die Grenze verläuft nicht beim Design, sondern bei drei praktischen Punkten:",
      },
      {
        typ: "liste",
        punkte: [
          "Eigenständigkeit. Wer aussieht wie alle, wird verglichen wie alle: über den Preis. Sobald Sie sich gegen ähnliche Anbieter behaupten müssen, arbeitet die Vorlage gegen Sie.",
          "Geschwindigkeit. Baukästen laden fremden Code mit, den Sie nicht brauchen. Bei bezahltem Traffic bezahlen Sie jede zusätzliche Sekunde doppelt — einmal in Klickkosten, einmal in Absprüngen.",
          "Grenzen der Funktion. Individuelle Abläufe, Anbindungen an Fremdsysteme oder eigene Anwendungen enden im Baukasten in Workarounds. Der erste Workaround ist selten der letzte.",
        ],
      },
      {
        typ: "hinweis",
        text: "Rechnen Sie vor der Entscheidung eine Zahl aus: Was ist Ihnen eine zusätzliche Anfrage pro Woche wert? Liegt der Wert über den Mehrkosten eines individuellen Auftritts, ist die Rechnung meist schnell klar.",
      },
      { typ: "h2", text: "Der Mittelweg, den kaum jemand nennt" },
      {
        typ: "absatz",
        text: "Sie müssen sich nicht einmalig und endgültig entscheiden. Ein sinnvoller Weg ist, mit einem Baukasten schnell online zu gehen, Anfragen und Verhalten zu messen — und erst dann individuell auszubauen, wenn die Zahlen zeigen, wo sich der Aufwand lohnt. Wichtig ist nur, dass Domain, Inhalte und Struktur von Anfang an so angelegt sind, dass ein späterer Umbau kein Neustart wird.",
      },
      {
        typ: "absatz",
        text: "Genau daran scheitern viele Wechsel: Nicht am Design, sondern daran, dass Inhalte im Baukasten gefangen sind und die URL-Struktur beim Umzug bricht. Wer das früh bedenkt, behält beide Optionen.",
      },
    ],
    faq: [
      {
        frage: "Ist eine Baukasten-Website schlecht für SEO?",
        antwort:
          "Nicht grundsätzlich. Die technischen Grundlagen lassen sich auch dort sauber umsetzen: Struktur, Meta-Angaben, sprechende URLs, strukturierte Daten. Der reale Nachteil ist meist die Ladezeit durch mitgeliefertes Fremdgewicht — und die gestalterische Austauschbarkeit, die auf die Conversion drückt, nicht auf das Ranking.",
      },
      {
        frage: "Kann ich später von einem Baukasten auf eine eigene Website wechseln?",
        antwort:
          "Ja, wenn es vorbereitet ist. Behalten Sie die Domain, halten Sie Ihre Texte und Bilder auch außerhalb des Systems vor und achten Sie auf eine saubere URL-Struktur. Dann ist der Wechsel ein Umbau statt eines Neustarts, und Sie verlieren keine Sichtbarkeit.",
      },
      {
        frage: "Was ist der wichtigste Unterschied in einem Satz?",
        antwort:
          "Ein Baukasten setzt bewährte Bausteine zusammen und passt sie an Ihre Inhalte an — schnell und günstig, aber in der Gestaltung begrenzt. Individuell entsteht ein eigenes System, das nur zu Ihnen passt. Der Baukasten ist der pragmatische Einstieg, das individuelle Design der eigenständige Auftritt.",
      },
    ],
    leistungen: ["baukasten-loesungen", "webdesign", "individuelle-loesungen"],
  },
  {
    slug: "wann-lohnt-sich-eine-automation",
    titel: "Wann lohnt sich eine Automation im kleinen Betrieb?",
    title: "Wann lohnt sich eine Automation? Die Rechnung",
    beschreibung:
      "Welche Aufgaben sich automatisieren lassen, ab wann es sich rechnet und woran Automationen in der Praxis scheitern. Konkret gerechnet statt versprochen.",
    eyebrow: "Prozesse",
    kategorie: "Prozesse",
    datum: "2026-07-17",
    lesezeit: 6,
    kurzantwort:
      "Eine Automation lohnt sich als Faustregel dann, wenn eine Aufgabe wöchentlich wiederkehrt, festen Regeln folgt und mehr als etwa eine halbe Stunde kostet. Die Rechnung ist einfach: eingesparte Stunden pro Jahr multipliziert mit Ihrem internen Stundensatz, gegengerechnet gegen die einmaligen Einrichtungskosten plus laufende Gebühren. Geht die Rechnung nicht innerhalb von rund zwölf Monaten auf, ist die Aufgabe der falsche Kandidat — dann lohnt sich eher die nächste.",
    blocks: [
      {
        typ: "absatz",
        text: "Automation wird meist als Technikthema verkauft. Sie ist aber vor allem eine Rechenaufgabe, und die kann man vorher machen. Genau das sollten Sie verlangen, bevor jemand etwas baut.",
      },
      { typ: "h2", text: "Die Rechnung, die vorher stehen muss" },
      {
        typ: "absatz",
        text: "Nehmen Sie eine konkrete Aufgabe und beantworten Sie vier Fragen: Wie oft kommt sie vor? Wie lange dauert sie? Wer macht sie? Was kostet diese Person pro Stunde? Daraus ergibt sich der Jahreswert. Diesem Wert stellen Sie die einmaligen Baukosten und die laufenden Gebühren gegenüber. Wenn sich das nicht binnen rund zwölf Monaten trägt, lassen Sie es — es gibt fast immer einen besseren Kandidaten.",
      },
      {
        typ: "hinweis",
        text: "Rechnen Sie mit Ihrem internen Stundensatz, nicht mit dem Mindestlohn. Wenn eine Fachkraft Daten abtippt, ist der Verlust nicht ihr Gehalt — es ist die Arbeit, die sie in dieser Zeit nicht macht.",
      },
      { typ: "h2", text: "Woran Sie gute Kandidaten erkennen" },
      {
        typ: "liste",
        punkte: [
          "Daten werden von einem System ins nächste abgetippt.",
          "Anfragen bleiben liegen, weil niemand feste Zuständigkeit hat.",
          "Angebote und Rechnungen entstehen jedes Mal von Hand aus derselben Vorlage.",
          "Nachgefasst wird dann, wenn jemand zufällig daran denkt.",
          "Termine werden manuell bestätigt und manuell erinnert.",
        ],
      },
      {
        typ: "absatz",
        text: "Allen gemeinsam: Sie folgen Regeln. Genau das ist die Trennlinie. Was Urteilsvermögen braucht — ein schwieriges Kundengespräch, eine Preisentscheidung, eine Einschätzung — bleibt beim Menschen und soll dort bleiben.",
      },
      { typ: "h2", text: "Woran Automationen in der Praxis scheitern" },
      {
        typ: "liste",
        punkte: [
          "Sie automatisieren einen kaputten Prozess. Dann läuft der Unsinn nur schneller. Erst aufräumen, dann automatisieren.",
          "Niemand merkt, wenn sie ausfällt. Ohne Fehlerbehandlung und aktive Benachrichtigung fällt der Ausfall erst Wochen später am fehlenden Ergebnis auf.",
          "Sie hängt an einer Person. Wenn nur einer weiß, wie sie funktioniert, haben Sie ein Risiko gebaut, keine Entlastung.",
          "Sie wird scharf geschaltet, bevor sie sich bewährt hat. Erst parallel zum bestehenden Ablauf laufen lassen, dann umstellen.",
        ],
      },
      { typ: "h2", text: "Was Sie dabei nicht vergessen dürfen" },
      {
        typ: "absatz",
        text: "Sobald personenbezogene Daten automatisiert zwischen Systemen fließen, ist das ein Datenschutzthema — Verarbeitungsverzeichnis, Auftragsverarbeitung, Speicherfristen. Das ist kein Grund, es zu lassen, aber ein Grund, es sauber zu machen. Und noch etwas: Automation entfernt in aller Regel die stumpfe Arbeit, nicht die Menschen. In den meisten Betrieben ist nicht zu wenig zu tun, sondern zu wenig Zeit für das, was zählt.",
      },
    ],
    faq: [
      {
        frage: "Was lässt sich in einem kleinen Betrieb überhaupt automatisieren?",
        antwort:
          "Fast alles, was Regeln folgt und sich wiederholt: eingehende Anfragen sortieren und zuweisen, Terminbestätigungen und Erinnerungen verschicken, Angebote aus Vorlagen erzeugen, Daten zwischen Website, Kalender und Buchhaltung übertragen, Bewertungen anfragen, Leads nachfassen. Nicht automatisierbar ist alles, was echtes Urteilsvermögen verlangt.",
      },
      {
        frage: "Muss ich meine bestehende Software wechseln?",
        antwort:
          "In der Regel nicht. Automationen setzen auf dem auf, was Sie bereits nutzen, und verbinden es. Ein Systemwechsel ist die Ausnahme und nur dann ein Thema, wenn Ihr aktuelles Werkzeug schlicht keine Schnittstelle anbietet.",
      },
      {
        frage: "Was passiert, wenn eine Automation ausfällt?",
        antwort:
          "Jede Automation braucht eine Fehlerbehandlung und eine aktive Benachrichtigung. Fällt ein Schritt aus, müssen Sie es erfahren — nicht Wochen später am fehlenden Ergebnis. Kritische Abläufe bekommen zusätzlich einen manuellen Notweg.",
      },
      {
        frage: "Rechnet sich das bei nur fünf Mitarbeitern?",
        antwort:
          "Oft gerade dort, weil jede gebundene Stunde stärker ins Gewicht fällt. Die Betriebsgröße ist nicht der entscheidende Faktor — die Wiederholungsfrequenz ist es. Eine Aufgabe, die täglich zwanzig Minuten kostet, ergibt über ein Jahr mehr als hundert Stunden.",
      },
    ],
    leistungen: ["automationen", "individuelle-loesungen", "webentwicklung"],
  },
  {
    slug: "webdesigner-castrop-rauxel-finden",
    titel: "Webdesigner in Castrop-Rauxel finden: Worauf achten?",
    title: "Webdesigner Castrop-Rauxel finden — die Checkliste",
    beschreibung:
      "Sechs Fragen, die Sie einem Webdesigner in Castrop-Rauxel oder im Ruhrgebiet vor der Beauftragung stellen sollten — damit die Website Anfragen bringt, nicht nur online ist.",
    eyebrow: "Regional",
    kategorie: "Regional",
    datum: "2026-07-18",
    lesezeit: 6,
    kurzantwort:
      "Achten Sie bei einem Webdesigner in Castrop-Rauxel weniger auf den Ort und mehr auf sechs Dinge: Bekommen Sie einen Festpreis oder eine offene Rechnung? Zeigt er echte, live erreichbare Projekte? Wird die Seite auf Ladezeit und Auffindbarkeit gebaut oder nur schön? Gehören Ihnen am Ende Domain, Code und Zugänge? Wie schnell antwortet er? Und sagt er auch ehrlich Nein, wenn ein günstigerer Weg für Sie besser ist? Nähe ist ein Vorteil — aber nur zusammen mit diesen Antworten.",
    blocks: [
      {
        typ: "absatz",
        text: "„Webdesigner Castrop-Rauxel“ tippen viele in die Suche — und stehen dann vor einer Liste, die alle gleich klingt. Der Ort allein sagt nichts über die Qualität. Diese sechs Fragen trennen den Auftritt, der Anfragen bringt, von dem, der nur online ist.",
      },
      { typ: "h2", text: "1. Festpreis oder offene Rechnung?" },
      {
        typ: "absatz",
        text: "Ein seriöser Anbieter nennt nach einem kurzen Gespräch einen Festpreis. Wer nur Stundensätze nennt, verlagert das Risiko auf Sie. Fragen Sie außerdem nach den laufenden Kosten — Domain, Hosting, Wartung — getrennt vom einmaligen Preis.",
      },
      { typ: "h2", text: "2. Gibt es echte, erreichbare Referenzen?" },
      {
        typ: "absatz",
        text: "Screenshots kann man montieren. Bitten Sie um Links zu Projekten, die live sind, und rufen Sie sie auf dem Handy auf. Lädt die Seite schnell? Wirkt sie eigenständig? Ein Anbieter, der auf seine Arbeit verweisen kann, tut das gern.",
      },
      { typ: "h2", text: "3. Wird auf Auffindbarkeit gebaut, nicht nur auf Optik?" },
      {
        typ: "absatz",
        text: "Eine schöne Seite, die niemand findet, ist eine teure Visitenkarte. Fragen Sie, ob die Seite technisch für Suchmaschinen und für Ladezeit gebaut wird — und gerade lokal: ob ein Google-Unternehmensprofil und lokale Signale mitgedacht werden. Für einen Betrieb in Castrop-Rauxel oder dem Ruhrgebiet entscheidet die lokale Sichtbarkeit oft über die Anfragen.",
      },
      { typ: "h2", text: "4. Gehört Ihnen am Ende alles?" },
      {
        typ: "absatz",
        text: "Nach Bezahlung sollten Ihnen Domain, Quellcode und alle Zugänge gehören. Prüfen Sie das vorher. Wer Kunden über Abhängigkeit hält — proprietäre Systeme, gemietete Websites — bindet Sie, statt Sie zu überzeugen.",
      },
      { typ: "h2", text: "5. Wie schnell bekommen Sie Antwort?" },
      {
        typ: "absatz",
        text: "Die Antwortgeschwindigkeit vor dem Auftrag ist ein guter Vorgeschmack auf die Zusammenarbeit danach. Ein Vorteil eines Anbieters aus der Region: kurze Wege, oft eine Antwort noch am selben Werktag, und im Zweifel ein Treffen vor Ort.",
      },
      { typ: "h2", text: "6. Sagt er auch ehrlich Nein?" },
      {
        typ: "absatz",
        text: "Der wichtigste Punkt. Wenn eine günstige Baukasten-Lösung für Ihren Fall reicht, sollte ein guter Webdesigner das sagen — auch wenn der größere Auftrag für ihn lukrativer wäre. Wer Ihnen immer das Teuerste verkauft, verkauft nicht Ihre Interessen.",
      },
      {
        typ: "hinweis",
        text: "Nähe ist ein echter Vorteil — persönliche Treffen, Kenntnis des lokalen Marktes, schnelle Wege. Aber sie ersetzt keine der sechs Antworten. Ein guter Anbieter aus der Ferne schlägt einen schwachen um die Ecke.",
      },
      {
        typ: "absatz",
        text: "Wenn Sie einen Webdesigner in Castrop-Rauxel oder dem Ruhrgebiet suchen, der auf diese sechs Fragen klare Antworten gibt: Schreiben Sie mir zwei Sätze zu Ihrem Vorhaben, und Sie bekommen eine ehrliche Einschätzung — ohne Verkaufsdruck.",
      },
    ],
    faq: [
      {
        frage: "Ist ein Webdesigner aus Castrop-Rauxel teurer als online buchbare Anbieter?",
        antwort:
          "Nicht grundsätzlich. Der Preis hängt vom Umfang ab, nicht vom Standort. Der Unterschied liegt in der Erreichbarkeit: kurze Wege, persönliche Treffen und ein fester Ansprechpartner statt eines Ticketsystems. Ich nenne den Festpreis nach einem kurzen Gespräch, unabhängig davon, ob Sie aus Castrop-Rauxel oder von weiter her kommen.",
      },
      {
        frage: "Muss ich für ein Website-Projekt persönlich vorbeikommen?",
        antwort:
          "Nein. Kunden aus Castrop-Rauxel und Umgebung treffe ich gern persönlich, notwendig ist es aber nicht. Der Großteil der Projekte läuft ortsunabhängig mit Abstimmung per Call und WhatsApp. Sie entscheiden, was Ihnen lieber ist.",
      },
      {
        frage: "Hilft eine Website überhaupt bei lokaler Kundschaft?",
        antwort:
          "Ja, wenn sie richtig aufgesetzt ist. Gerade lokal entscheidet die Kombination aus Google-Unternehmensprofil, Bewertungen und einer schnellen, auffindbaren Website darüber, ob Sie in der Umgebung gefunden werden. Die Website ist dabei das Fundament, auf das die lokalen Signale einzahlen.",
      },
    ],
    leistungen: ["webdesign", "seo-aeo-geo-cro", "baukasten-loesungen"],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Neueste zuerst. Nicht mutierend — sort() würde sonst `posts` umsortieren. */
export function postsNachDatum(): BlogPost[] {
  return [...posts].sort((a, b) => b.datum.localeCompare(a.datum));
}

/** Beiträge, die eine bestimmte Leistung behandeln — für die Leistungsseiten. */
export function postsFuerLeistung(slug: string): BlogPost[] {
  return postsNachDatum().filter((p) => p.leistungen.includes(slug));
}

/** Verwandte Beiträge: gleiche Leistung, ohne den Beitrag selbst. */
export function verwandtePosts(post: BlogPost, anzahl = 2): BlogPost[] {
  return postsNachDatum()
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.leistungen.some((l) => post.leistungen.includes(l)),
    )
    .slice(0, anzahl);
}

export const postSlugs = posts.map((p) => p.slug);
