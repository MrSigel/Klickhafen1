import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { RechnungEditor, type RechnungStandard } from "@/components/admin/RechnungEditor";
import { rechnungAnlegen } from "@/lib/admin/aktionen";
import {
  kundenLaden,
  naechsteRechnungsnummer,
  projektLaden,
} from "@/lib/admin/daten";
import { aktuellerNutzer } from "@/lib/admin/supabase";

export const dynamic = "force-dynamic";

const heute = () => new Date().toISOString().slice(0, 10);
const inZweiWochen = () => {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().slice(0, 10);
};

export default async function RechnungNeu({
  searchParams,
}: {
  searchParams: Promise<{ projekt?: string; kunde?: string }>;
}) {
  if (!(await aktuellerNutzer())) redirect("/admin/login");
  const { projekt: projektId, kunde: kundeParam } = await searchParams;

  const [kunden, nummer] = await Promise.all([
    kundenLaden(),
    naechsteRechnungsnummer(new Date().getFullYear()),
  ]);

  // Optionale Vorbefüllung aus einem Projekt (Link von der Projektseite).
  let kundeId: string | null = kundeParam ?? null;
  let zeilen: RechnungStandard["zeilen"] = [];
  if (projektId) {
    const detail = await projektLaden(projektId);
    if (detail) {
      kundeId = detail.projekt.kunde_id;
      zeilen = detail.posten.map((p) => ({
        bezeichnung: p.bezeichnung,
        menge: 1,
        einzelpreis: Number(p.betrag),
      }));
    }
  }

  const standard: RechnungStandard = {
    kundeId,
    nummer,
    datum: heute(),
    faellig: inZweiWochen(),
    notiz: "",
    zeilen,
  };

  return (
    <AdminShell titel="Neue Rechnung" aktiv="/admin/rechnungen">
      <p className="-mt-4 mb-8 max-w-[60ch] text-small text-ink-soft">
        Kunde wählen, Positionen eintragen — fertig. Die Anschrift zieht das PDF
        automatisch aus dem Kunden.
      </p>
      <RechnungEditor
        kunden={kunden.map((k) => ({
          id: k.id,
          name: k.name,
          firma: k.firma,
          adresse: k.adresse,
        }))}
        standard={standard}
        submitLabel="Rechnung anlegen"
        action={rechnungAnlegen}
      />
    </AdminShell>
  );
}
