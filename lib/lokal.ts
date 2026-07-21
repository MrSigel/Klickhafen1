import type { Faq } from "./services";

/**
 * Daten für die lokale Landingpage (Castrop-Rauxel).
 *
 * Bewusst EINE starke lokale Seite statt vieler dünner Stadt-Seiten
 * (Doorway-Pages schaden). Die Nachbarorte werden hier als Fließtext-Kontext
 * und im areaServed-Schema genannt — nicht als eigene Seiten.
 */

/**
 * Echte Nachbarorte, die vom Ruhrgebiets-Sitz aus im Einzugsgebiet liegen.
 * TODO(Enrico): streichen, was du NICHT bedienst — lieber ehrlich als breit.
 */
export const nachbarorte = [
  "Herne",
  "Recklinghausen",
  "Bochum",
  "Dortmund",
  "Gelsenkirchen",
  "Herten",
  "Waltrop",
  "Datteln",
];

/** Stadtteile von Castrop-Rauxel — für den lokalen Bezug im Text. */
export const stadtteile = [
  "Habinghorst",
  "Ickern",
  "Rauxel",
  "Castrop",
  "Schwerin",
  "Behringhausen",
  "Frohlinde",
  "Merklinde",
];

export const lokalFaq: Faq[] = [
  {
    frage: "Gibt es Klickhafen wirklich in Castrop-Rauxel?",
    antwort:
      "Ja. Klickhafen hat seinen Sitz in Castrop-Rauxel (Gerther Straße 76, 44577). Dahinter steht Enrico Gross — eine Person, die Sie direkt erreichen, kein anonymes Team und keine Nummer in einer Warteschleife. Die vollständigen Angaben stehen im Impressum.",
  },
  {
    frage: "Treffen wir uns für ein Projekt persönlich?",
    antwort:
      "Kunden aus Castrop-Rauxel und dem direkten Umfeld treffe ich gern persönlich — das ist einer der Vorteile eines Webdesigners aus der Region. Notwendig ist es nicht: Der Großteil der Arbeit läuft ortsunabhängig, mit Abstimmung per Call und WhatsApp. Sie entscheiden, was Ihnen lieber ist.",
  },
  {
    frage: "Bedienst du auch die Nachbarstädte im Ruhrgebiet?",
    antwort:
      "Ja. Von Castrop-Rauxel aus arbeite ich für Betriebe in Herne, Recklinghausen, Bochum, Dortmund, Gelsenkirchen und dem übrigen Ruhrgebiet — und über die Ferne bundesweit. Der Sitz ist lokal, die Reichweite ist es nicht.",
  },
  {
    frage: "Was kostet eine Website in Castrop-Rauxel?",
    antwort:
      "Der Preis hängt vom Umfang ab, nicht vom Ort. Eine fokussierte Website mit wenigen Seiten liegt im niedrigen bis mittleren vierstelligen Bereich, ein Baukasten-Einstieg deutlich darunter. Ich nenne den Festpreis nach einem kurzen Gespräch per WhatsApp — pauschale Listenpreise passen selten zum tatsächlichen Projekt.",
  },
  {
    frage: "Warum ein Webdesigner aus der Region statt einer großen Agentur?",
    antwort:
      "Weil Sie mit der Person sprechen, die auch baut — kürzere Wege, schnellere Antworten, keine Weiterreichung durch drei Abteilungen. Und weil jemand aus dem Ruhrgebiet den lokalen Markt und die Ansprache kennt. Für sehr große Projekte kann eine Agentur die richtige Wahl sein; für den Mittelstand und lokale Betriebe ist Nähe meist der bessere Hebel.",
  },
];
