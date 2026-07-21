import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { SetupHinweis } from "@/components/admin/SetupHinweis";
import { Karte } from "@/components/admin/formular";
import { rechnungenLaden } from "@/lib/admin/daten";
import { datum } from "@/lib/admin/format";
import { aktuellerNutzer, supabaseKonfiguriert } from "@/lib/admin/supabase";

export const dynamic = "force-dynamic";

const STATUS: Record<string, string> = {
  entwurf: "Entwurf",
  gesendet: "Gesendet",
  bezahlt: "Bezahlt",
};

export default async function RechnungenSeite() {
  if (!supabaseKonfiguriert()) {
    return (
      <AdminShell titel="Rechnungen" aktiv="/admin/rechnungen">
        <SetupHinweis />
      </AdminShell>
    );
  }
  if (!(await aktuellerNutzer())) redirect("/admin/login");

  const rechnungen = await rechnungenLaden();

  return (
    <AdminShell titel="Rechnungen" aktiv="/admin/rechnungen">
      <Karte
        titel={`Rechnungen (${rechnungen.length})`}
        aktion={
          <Link
            href="/admin/rechnungen/neu"
            className="rounded-md border border-accent bg-accent px-4 py-2 text-small font-medium text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Neue Rechnung
          </Link>
        }
      >
        {rechnungen.length === 0 ? (
          <p className="text-small text-ink-soft">
            Noch keine Rechnungen. Eine Rechnung entsteht aus einem Projekt.
          </p>
        ) : (
          <ul className="flex flex-col">
            {rechnungen.map((r) => (
              <li key={r.id} className="border-b border-line first:border-t">
                <Link
                  href={`/admin/rechnungen/${r.id}`}
                  className="group flex items-center justify-between gap-4 py-3.5"
                >
                  <div>
                    <p className="font-mono text-ink transition-colors group-hover:text-accent">
                      {r.nummer}
                    </p>
                    <p className="mt-0.5 text-small text-ink-faint">
                      {r.kunde?.name ?? "—"} · {datum(r.datum)}
                    </p>
                  </div>
                  <span
                    className={
                      r.status === "bezahlt"
                        ? "font-mono text-eyebrow tracking-[0.12em] text-accent uppercase"
                        : "font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase"
                    }
                  >
                    {STATUS[r.status]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Karte>
    </AdminShell>
  );
}
