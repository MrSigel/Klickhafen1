import { rechnungLaden } from "./daten";
import type { RechnungDaten } from "./rechnung-pdf";

/**
 * Lädt eine Rechnung aus der DB und bringt sie in die Form, die das PDF und der
 * Versand brauchen. Gemeinsame Quelle, damit PDF und E-Mail nie auseinanderlaufen.
 * Gibt zusätzlich die Empfänger-E-Mail zurück (für den Resend-Versand).
 */
export async function rechnungDatenLaden(
  id: string,
): Promise<{ daten: RechnungDaten; empfaengerEmail: string | null } | null> {
  const geladen = await rechnungLaden(id);
  if (!geladen) return null;
  const { rechnung, posten } = geladen;

  // Kundendaten für Anschrift + E-Mail.
  const { kundeLaden } = await import("./daten");
  const kunde = rechnung.kunde_id ? await kundeLaden(rechnung.kunde_id) : null;

  return {
    daten: {
      nummer: rechnung.nummer,
      datum: rechnung.datum,
      faellig: rechnung.faellig,
      empfaenger: {
        name: kunde?.name ?? rechnung.kunde?.name ?? "—",
        firma: kunde?.firma ?? null,
        adresse: kunde?.adresse ?? null,
      },
      posten: posten.map((p) => ({
        bezeichnung: p.bezeichnung,
        menge: Number(p.menge),
        einzelpreis: Number(p.einzelpreis),
      })),
      notiz: rechnung.notiz,
    },
    empfaengerEmail: kunde?.email ?? null,
  };
}
