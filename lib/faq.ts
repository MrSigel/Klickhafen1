import type { Faq } from "./services";

/**
 * Die FAQ der Startseite.
 *
 * Warum eine eigene: Die Startseite ist die meistverlinkte Seite und hatte
 * bisher KEIN FAQPage-Schema — die größte AEO-Lücke der Website. Antwort-
 * maschinen bekommen hier die vier Fragen, die vor jedem Auftrag stehen,
 * jede direkt beantwortet und ohne Anlauf.
 *
 * Die Antworten müssen zu lib/site.ts (fakten) und lib/blog.ts passen.
 * Widersprüche zwischen Seiten sind für generative Systeme ein Grund,
 * eine andere Quelle zu zitieren.
 */
export const startFaq: Faq[] = [
  {
    frage: "Was macht Klickhafen genau?",
    antwort:
      "Klickhafen baut Websites, Funnels, Automationen und individuelle Webanwendungen — von der einfachen Landingpage bis zum komplexen Browsergame. Alles wird von einer Person umgesetzt: Design, Entwicklung, Suchmaschinen- und KI-Optimierung. Sitz ist Castrop-Rauxel im Ruhrgebiet, gearbeitet wird bundesweit.",
  },
  {
    frage: "Was kostet eine Website bei Klickhafen?",
    antwort:
      "Der Preis richtet sich nach dem Umfang: Eine fokussierte Website mit wenigen Seiten liegt deutlich unter einem Auftritt mit Buchungsstrecke oder eigener Anwendung. Ich nenne den Preis erst, wenn ich den Umfang kenne, und dann als Festpreis — pauschale Listenpreise sind entweder zu hoch oder decken Ihr Projekt nicht ab. Nach einem kurzen Gespräch per WhatsApp bekommen Sie ein konkretes Angebot.",
  },
  {
    frage: "Wie lange dauert es, bis meine Website online ist?",
    antwort:
      "Eine Baukasten-Lösung kann in wenigen Werktagen live sein. Ein individueller Auftritt braucht in der Regel drei bis sechs Wochen. Der größte Zeitfaktor sind fast nie Design oder Technik, sondern Inhalte: Texte, Bilder und Freigaben auf Ihrer Seite. Wer die früh bereitstellt, geht früher live.",
  },
  {
    frage: "Wie läuft der Erstkontakt ab?",
    antwort:
      "Über WhatsApp, nicht über ein Formular — auf dieser Website gibt es bewusst keines. Sie schreiben in zwei Sätzen, worum es geht, und bekommen in der Regel am selben Werktag eine Antwort. Danach klären wir in einem kurzen Gespräch, ob und wie ich helfen kann. Passt es nicht, sage ich das.",
  },
  {
    frage: "Arbeitet Klickhafen nur im Ruhrgebiet?",
    antwort:
      "Der Sitz ist Castrop-Rauxel, und Kunden aus dem Ruhrgebiet und NRW treffe ich gern persönlich. Die Arbeit selbst läuft ortsunabhängig — ein Großteil der Projekte entsteht vollständig aus der Ferne, mit Abstimmung per Call und WhatsApp. Die bisherigen Kundenprojekte reichen von Nordrhein-Westfalen bis ans Alpenland.",
  },
  {
    frage: "Bekomme ich meine Website und den Code danach wirklich?",
    antwort:
      "Ja. Nach vollständiger Bezahlung erhalten Sie Quellcode, alle Zugänge und die Dokumentation. Es gibt kein proprietäres System, das Sie an mich bindet, und keine Abhängigkeit von mir als Person. Wer Kunden nur über Abhängigkeit hält, war ohnehin nie überzeugend.",
  },
];
