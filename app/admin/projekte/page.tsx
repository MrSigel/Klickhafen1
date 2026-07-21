import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { SetupHinweis } from "@/components/admin/SetupHinweis";
import { Absenden, Auswahl, Feld, Karte } from "@/components/admin/formular";
import { projektAnlegen } from "@/lib/admin/aktionen";
import { kundenLaden, projekteLaden } from "@/lib/admin/daten";
import { datum } from "@/lib/admin/format";
import { aktuellerNutzer, supabaseKonfiguriert } from "@/lib/admin/supabase";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  angebot: "Angebot",
  aktiv: "Aktiv",
  abgeschlossen: "Abgeschlossen",
};

export default async function ProjekteSeite() {
  if (!supabaseKonfiguriert()) {
    return (
      <AdminShell titel="Projekte" aktiv="/admin/projekte">
        <SetupHinweis />
      </AdminShell>
    );
  }
  if (!(await aktuellerNutzer())) redirect("/admin/login");

  const [projekte, kunden] = await Promise.all([projekteLaden(), kundenLaden()]);

  return (
    <AdminShell titel="Projekte" aktiv="/admin/projekte">
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <Karte titel={`Projekte (${projekte.length})`}>
          {projekte.length === 0 ? (
            <p className="text-small text-ink-soft">Noch keine Projekte.</p>
          ) : (
            <ul className="flex flex-col">
              {projekte.map((p) => (
                <li key={p.id} className="border-b border-line first:border-t">
                  <Link
                    href={`/admin/projekte/${p.id}`}
                    className="group flex items-center justify-between gap-4 py-3.5"
                  >
                    <div>
                      <p className="text-ink transition-colors group-hover:text-accent">
                        {p.name}
                      </p>
                      <p className="mt-0.5 text-small text-ink-faint">
                        {p.kunde?.name ?? "ohne Kunde"} · {datum(p.erstellt)}
                      </p>
                    </div>
                    <span className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
                      {STATUS_LABEL[p.status]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Karte>

        <Karte titel="Neues Projekt">
          <form action={projektAnlegen} className="flex flex-col gap-4">
            <Feld label="Name" name="name" pflicht platzhalter="Website xyz.com" />
            <Auswahl
              label="Kunde"
              name="kunde_id"
              optionen={[
                { wert: "", text: "— kein Kunde —" },
                ...kunden.map((k) => ({
                  wert: k.id,
                  text: k.firma ? `${k.name} · ${k.firma}` : k.name,
                })),
              ]}
            />
            <Auswahl
              label="Status"
              name="status"
              wert="aktiv"
              optionen={[
                { wert: "angebot", text: "Angebot" },
                { wert: "aktiv", text: "Aktiv" },
                { wert: "abgeschlossen", text: "Abgeschlossen" },
              ]}
            />
            <Feld label="Notiz" name="notiz" />
            <Absenden>Projekt anlegen</Absenden>
          </form>
          {kunden.length === 0 && (
            <p className="mt-3 text-small text-ink-faint">
              Tipp: Lege zuerst einen{" "}
              <Link href="/admin/kunden" className="text-accent underline">
                Kunden
              </Link>{" "}
              an.
            </p>
          )}
        </Karte>
      </div>
    </AdminShell>
  );
}
