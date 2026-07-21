import { rechnungPdf } from "@/lib/admin/rechnung-pdf";

/**
 * Muster-Rechnung als PDF — zum Prüfen des Layouts. Liegt unter /admin, ist
 * also im Live-Betrieb durch die Zugangssperre geschützt. Spiegelt Enricos
 * Beispiel (Website 2000 €, SEO 500 €, Ads-Budget 400 € als Weiterleitung).
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const pdf = await rechnungPdf({
    nummer: "2026-001",
    datum: "2026-07-18",
    faellig: "2026-08-01",
    empfaenger: {
      firma: "Muster GmbH",
      name: "Max Mustermann",
      adresse: "Musterstraße 1\n44575 Castrop-Rauxel",
    },
    posten: [
      { bezeichnung: "Website xyz.com — Design & Entwicklung", menge: 1, einzelpreis: 2000 },
      { bezeichnung: "SEO-Grundeinrichtung", menge: 1, einzelpreis: 500 },
      { bezeichnung: "Google-Ads-Budget (Weiterleitung an Google)", menge: 1, einzelpreis: 400 },
    ],
    notiz: "Vielen Dank für die Zusammenarbeit.",
  });

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=rechnung-vorschau.pdf",
    },
  });
}
