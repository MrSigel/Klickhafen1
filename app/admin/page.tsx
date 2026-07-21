import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { Kennzahl } from "@/components/admin/Kennzahl";
import { SetupHinweis } from "@/components/admin/SetupHinweis";
import { auswertungLaden } from "@/lib/admin/daten";
import { euro } from "@/lib/admin/format";
import { aktuellerNutzer, supabaseKonfiguriert } from "@/lib/admin/supabase";

// Ein CRM darf nie statisch gecacht werden — immer frische Zahlen.
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  if (!supabaseKonfiguriert()) {
    return (
      <AdminShell titel="Übersicht" aktiv="/admin">
        <SetupHinweis />
      </AdminShell>
    );
  }

  // Zusätzlich zur proxy-Sperre (Doppelabsicherung, wie von der Next-Doku empfohlen).
  const nutzer = await aktuellerNutzer();
  if (!nutzer) redirect("/admin/login");

  const a = await auswertungLaden();

  return (
    <AdminShell titel="Übersicht" aktiv="/admin">
      {/* Der echte Gewinn — groß und allein, damit er nicht mit durchlaufenden
          Posten verwechselt wird. */}
      <section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Kennzahl
            label="Gewinn"
            wert={euro(a.gewinn)}
            ton="gewinn"
            hinweis="Umsatz minus eigene Ausgaben"
          />
          <Kennzahl label="Umsatz (eigen)" wert={euro(a.umsatz)} />
          <Kennzahl label="Eigene Ausgaben" wert={euro(a.ausgabenEigen)} />
          <Kennzahl
            label="Umsatz noch offen"
            wert={euro(a.umsatzOffen)}
            hinweis={`Davon bezahlt: ${euro(a.umsatzBezahlt)}`}
          />
        </div>
      </section>

      {/* Durchlaufende Posten — Kundengeld, KEIN Gewinn. Bewusst abgesetzt und
          gedämpft, damit die Trennung sofort klar ist. */}
      <section className="mt-10">
        <p className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
          Durchlaufende Posten — nicht dein Geld
        </p>
        <p className="mt-2 max-w-[62ch] text-small text-ink-soft">
          Kundengeld, das du weiterreichst (z. B. Google-Ads-Budget). Zählt
          nicht zum Gewinn — hier nur zur Kontrolle, ob Erhaltenes und
          Ausgegebenes zusammenpassen.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <Kennzahl label="Erhalten" wert={euro(a.durchlaufEin)} ton="gedaempft" />
          <Kennzahl label="Weitergereicht" wert={euro(a.durchlaufAus)} ton="gedaempft" />
          <Kennzahl
            label="Noch nicht ausgegeben"
            wert={euro(a.durchlaufOffen)}
            ton="gedaempft"
            hinweis="Offenes Budget beim Kunden-Konto"
          />
        </div>
      </section>
    </AdminShell>
  );
}
