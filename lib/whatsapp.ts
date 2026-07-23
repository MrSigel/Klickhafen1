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
  "google-ads":
    "Hallo Enrico, ich interessiere mich für Google Ads und möchte mehr Anfragen über die Suche gewinnen.",
  "youtube-ads":
    "Hallo Enrico, ich interessiere mich für YouTube Ads und möchte mit Video Reichweite aufbauen.",
  "facebook-ads":
    "Hallo Enrico, ich interessiere mich für Facebook Ads und möchte meine Zielgruppe gezielt erreichen.",
  "instagram-ads":
    "Hallo Enrico, ich interessiere mich für Instagram Ads und möchte visuell neue Kunden gewinnen.",
  "tiktok-ads":
    "Hallo Enrico, ich interessiere mich für TikTok Ads und möchte dort Reichweite aufbauen.",
  "linkedin-ads":
    "Hallo Enrico, ich interessiere mich für LinkedIn Ads und möchte gezielt B2B-Entscheider erreichen.",
  "microsoft-ads":
    "Hallo Enrico, ich interessiere mich für Microsoft Ads (Bing) und möchte einen günstigeren Suchkanal nutzen.",
  "pinterest-ads":
    "Hallo Enrico, ich interessiere mich für Pinterest Ads und möchte visuell neue Kunden gewinnen.",
  "snapchat-ads":
    "Hallo Enrico, ich interessiere mich für Snapchat Ads und möchte eine junge Zielgruppe erreichen.",
  "x-ads":
    "Hallo Enrico, ich interessiere mich für X (Twitter) Ads und möchte dort Reichweite aufbauen.",
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
