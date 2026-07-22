import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { RechnungEditor, type RechnungStandard } from "@/components/admin/RechnungEditor";
import { rechnungAktualisieren } from "@/lib/admin/aktionen";
import { kundenLaden, rechnungLaden } from "@/lib/admin/daten";
import { aktuellerNutzer } from "@/lib/admin/supabase";

export const dynamic = "force-dynamic";

export default async function RechnungBearbeiten({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await aktuellerNutzer())) redirect("/admin/login");
  const { id } = await params;

  const [geladen, kunden] = await Promise.all([rechnungLaden(id), kundenLaden()]);
  if (!geladen) notFound();
  const { rechnung, posten } = geladen;

  const standard: RechnungStandard = {
    id: rechnung.id,
    kundeId: rechnung.kunde_id,
    nummer: rechnung.nummer,
    datum: rechnung.datum?.slice(0, 10) ?? "",
    faellig: rechnung.faellig?.slice(0, 10) ?? "",
    notiz: rechnung.notiz ?? "",
    zeilen: posten.map((p) => ({
      bezeichnung: p.bezeichnung,
      menge: Number(p.menge),
      einzelpreis: Number(p.einzelpreis),
    })),
  };

  return (
    <AdminShell titel={`Rechnung ${rechnung.nummer} bearbeiten`} aktiv="/admin/rechnungen">
      <p className="-mt-4 mb-8 text-small text-ink-soft">
        <Link href={`/admin/rechnungen/${id}`} className="text-accent hover:underline">
          zurück zur Rechnung
        </Link>
      </p>
      <RechnungEditor
        kunden={kunden.map((k) => ({
          id: k.id,
          name: k.name,
          firma: k.firma,
          adresse: k.adresse,
        }))}
        standard={standard}
        submitLabel="Änderungen speichern"
        action={rechnungAktualisieren}
      />
    </AdminShell>
  );
}
