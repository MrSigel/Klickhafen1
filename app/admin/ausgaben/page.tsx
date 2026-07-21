import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { SetupHinweis } from "@/components/admin/SetupHinweis";
import { Absenden, Auswahl, Feld, Karte, MiniAktion } from "@/components/admin/formular";
import { ausgabeAnlegen, ausgabeLoeschen } from "@/lib/admin/aktionen";
import { ausgabenLaden, projekteLaden } from "@/lib/admin/daten";
import { datum, euro } from "@/lib/admin/format";
import { aktuellerNutzer, supabaseKonfiguriert } from "@/lib/admin/supabase";

export const dynamic = "force-dynamic";

const heute = () => new Date().toISOString().slice(0, 10);

export default async function AusgabenSeite() {
  if (!supabaseKonfiguriert()) {
    return (
      <AdminShell titel="Ausgaben" aktiv="/admin/ausgaben">
        <SetupHinweis />
      </AdminShell>
    );
  }
  if (!(await aktuellerNutzer())) redirect("/admin/login");

  const [ausgaben, projekte] = await Promise.all([ausgabenLaden(), projekteLaden()]);
  const summeEigen = ausgaben
    .filter((a) => a.art === "eigen")
    .reduce((s, a) => s + Number(a.betrag), 0);

  return (
    <AdminShell titel="Ausgaben" aktiv="/admin/ausgaben">
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <Karte titel={`Ausgaben — eigen gesamt: ${euro(summeEigen)}`}>
          {ausgaben.length === 0 ? (
            <p className="text-small text-ink-soft">Noch keine Ausgaben.</p>
          ) : (
            <ul className="flex flex-col">
              {ausgaben.map((x) => (
                <li
                  key={x.id}
                  className="flex items-center justify-between gap-3 border-b border-line py-3 first:border-t"
                >
                  <div className="min-w-0">
                    <p className="truncate text-ink">{x.bezeichnung}</p>
                    <p className="mt-0.5 text-small text-ink-faint">
                      {x.art === "durchlauf" ? "Durchlauf" : "Eigen"}
                      {x.kategorie ? ` · ${x.kategorie}` : ""} · {datum(x.datum)}
                    </p>
                  </div>
                  <div className="flex flex-none items-center gap-4">
                    <span className="font-mono text-small text-ink">
                      {euro(Number(x.betrag))}
                    </span>
                    <form action={ausgabeLoeschen}>
                      <input type="hidden" name="id" value={x.id} />
                      <MiniAktion gefahr>×</MiniAktion>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Karte>

        <Karte titel="Neue Ausgabe">
          <form action={ausgabeAnlegen} className="flex flex-col gap-4">
            <Feld label="Bezeichnung" name="bezeichnung" pflicht />
            <div className="grid grid-cols-2 gap-3">
              <Feld label="Betrag (€)" name="betrag" pflicht platzhalter="49,99" />
              <Feld label="Datum" name="datum" type="date" wert={heute()} />
            </div>
            <Auswahl
              label="Art"
              name="art"
              wert="eigen"
              optionen={[
                { wert: "eigen", text: "Eigen (Betriebsausgabe)" },
                { wert: "durchlauf", text: "Durchlauf (Kundenauftrag)" },
              ]}
            />
            <Feld label="Kategorie" name="kategorie" platzhalter="Software, Hosting …" />
            <Auswahl
              label="Projekt (optional)"
              name="projekt_id"
              optionen={[
                { wert: "", text: "— kein Projekt —" },
                ...projekte.map((p) => ({ wert: p.id, text: p.name })),
              ]}
            />
            <Absenden>Ausgabe erfassen</Absenden>
          </form>
        </Karte>
      </div>
    </AdminShell>
  );
}
