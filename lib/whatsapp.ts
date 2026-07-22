/**
 * Der einzige Conversion-Weg von Klickhafen: WhatsApp.
 * Es gibt kein Kontaktformular. Jeder CTA der Seite läuft über waLink().
 */

/** Nummer im wa.me-Format: nur Ziffern, keine führende +, kein Leerzeichen. */
export const WHATSAPP_NUMMER = "4915563535989";

/** Für die Anzeige im Footer/Kontakt — dieselbe Nummer, menschlich lesbar. */
export const WHATSAPP_NUMMER_LESBAR = "+49 1556 3535989";

/**
 * Die vorausgefüllte Nachricht pro Kontext. Der Schlüssel ist der
 * Service-Slug aus lib/services.ts; `default` greift überall sonst.
 * So ist beim Eingang der Nachricht sofort klar, worum es geht.
 */
const NACHRICHTEN: Record<string, string> = {
  default:
    "Hallo Enrico, ich habe ein Projekt im Kopf und würde es gern mit Ihnen besprechen.",
  webdesign:
    "Hallo Enrico, ich interessiere mich für Webdesign und würde gern über mein Projekt sprechen.",
  webentwicklung:
    "Hallo Enrico, ich interessiere mich für Webentwicklung und habe eine Anwendung im Kopf.",
  automationen:
    "Hallo Enrico, ich möchte einen Prozess in meinem Betrieb automatisieren und würde das gern mit Ihnen besprechen.",
  "seo-aeo-geo-cro":
    "Hallo Enrico, ich interessiere mich für SEO und Conversion-Optimierung meiner Website.",
  funnels:
    "Hallo Enrico, ich interessiere mich für einen Funnel und möchte mehr Anfragen aus meinem Traffic holen.",
  "individuelle-loesungen":
    "Hallo Enrico, ich habe eine individuelle Anforderung, für die es keine Standardlösung gibt.",
  "baukasten-loesungen":
    "Hallo Enrico, ich interessiere mich für eine Baukasten-Lösung und möchte schnell online gehen.",
};

/**
 * Baut den WhatsApp-Link mit kontextabhängiger, korrekt URL-kodierter Nachricht.
 *
 * @param service Service-Slug (z. B. "webdesign"). Unbekannt oder leer → Standardtext.
 */
export function waLink(service?: string): string {
  const text = (service && NACHRICHTEN[service]) || NACHRICHTEN.default;
  return `https://wa.me/${WHATSAPP_NUMMER}?text=${encodeURIComponent(text)}`;
}

/**
 * Zusatz für Screenreader, der HINTER den sichtbaren Text gehängt wird
 * (als .sr-only-Span) — bewusst KEIN aria-label.
 *
 * Grund: Ein aria-label ersetzt den sichtbaren Text im Accessibility-Namen.
 * Nach WCAG 2.5.3 („Label in Name") muss der Name den sichtbaren Text aber
 * ENTHALTEN. Sonst kann jemand, der die Seite per Sprachsteuerung bedient und
 * „Projekt besprechen" sagt, den Knopf nicht auslösen. Als angehängter Zusatz
 * bleibt der sichtbare Text Teil des Namens und der Kontext kommt dazu.
 */
export function waZusatz(serviceName?: string): string {
  return serviceName
    ? ` — Anfrage zu ${serviceName} per WhatsApp, öffnet in neuem Tab`
    : " — Anfrage per WhatsApp, öffnet in neuem Tab";
}
