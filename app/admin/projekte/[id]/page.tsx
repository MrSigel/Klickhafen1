import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { Kennzahl } from "@/components/admin/Kennzahl";
import {
  Absenden,
  Auswahl,
  Feld,
  Karte,
  MiniAktion,
} from "@/components/admin/formular";
import {
  ausgabeAnlegen,
  ausgabeLoeschen,
  postenAnlegen,
  postenBezahlt,
  postenLoeschen,
  projektLoeschen,
} from "@/lib/admin/aktionen";
import { projektLaden } from "@/lib/admin/daten";
import { datum, euro } from "@/lib/admin/format";
import { aktuellerNutzer } from "@/lib/admin/supabase";

export const dynamic = "force-dynamic";

const heute = () => new Date().toISOString().slice(0, 10);

export default async function ProjektDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await aktuellerNutzer())) redirect("/admin/login");
  const { id } = await params;
  const detail = await projektLaden(id);
  if (!detail) notFound();

  const { projekt, posten, ausgaben, auswertung: a } = detail;

  return (
    <AdminShell titel={projekt.name} aktiv="/admin/projekte">
      <p className="-mt-4 mb-8 text-small text-ink-soft">
        {projekt.kunde?.name ?? "ohne Kunde"} ·{" "}
        <Link href="/admin/projekte" className="text-accent hover:underline">
          zurück zur Liste
        </Link>
      </p>

      {/* Auswertung dieses Projekts */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Kennzahl label="Gewinn" wert={euro(a.gewinn)} ton="gewinn" />
        <Kennzahl label="Umsatz" wert={euro(a.umsatz)} />
        <Kennzahl label="Eigene Ausgaben" wert={euro(a.ausgabenEigen)} />
        <Kennzahl
          label="Durchlauf offen"
          wert={euro(a.durchlaufOffen)}
          ton="gedaempft"
          hinweis="Kundengeld noch nicht ausgegeben"
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Einnahmen */}
        <Karte titel="Einnahmen">
          {posten.length === 0 ? (
            <p className="text-small text-ink-soft">Noch keine Posten.</p>
          ) : (
            <ul className="mb-6 flex flex-col">
              {posten.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-3 border-b border-line py-3 first:border-t"
                >
                  <div className="min-w-0">
                    <p className="truncate text-ink">{p.bezeichnung}</p>
                    <p className="mt-0.5 text-small text-ink-faint">
                      {p.art === "durchlauf" ? "Durchlauf" : "Umsatz"} ·{" "}
                      {datum(p.datum)}
                    </p>
                  </div>
                  <div className="flex flex-none items-center gap-4">
                    <span className="font-mono text-small text-ink">
                      {euro(Number(p.betrag))}
                    </span>
                    <form action={postenBezahlt}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="projekt_id" value={projekt.id} />
                      <input
                        type="hidden"
                        name="bezahlt"
                        value={p.bezahlt ? "false" : "true"}
                      />
                      <MiniAktion>{p.bezahlt ? "bezahlt ✓" : "offen"}</MiniAktion>
                    </form>
                    <form action={postenLoeschen}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="projekt_id" value={projekt.id} />
                      <MiniAktion gefahr>×</MiniAktion>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <form action={postenAnlegen} className="flex flex-col gap-3">
            <input type="hidden" name="projekt_id" value={projekt.id} />
            <Feld label="Bezeichnung" name="bezeichnung" pflicht platzhalter="Website xyz.com" />
            <div className="grid grid-cols-2 gap-3">
              <Feld label="Betrag (€)" name="betrag" type="text" pflicht platzhalter="2000" />
              <Feld label="Datum" name="datum" type="date" wert={heute()} />
            </div>
            <Auswahl
              label="Art"
              name="art"
              wert="umsatz"
              optionen={[
                { wert: "umsatz", text: "Umsatz (mein Ertrag)" },
                { wert: "durchlauf", text: "Durchlauf (Kundengeld, z. B. Ads)" },
              ]}
            />
            <label className="flex items-center gap-2 text-small text-ink-soft">
              <input type="checkbox" name="bezahlt" className="accent-accent" />
              schon bezahlt
            </label>
            <Absenden>Einnahme hinzufügen</Absenden>
          </form>
        </Karte>

        {/* Ausgaben */}
        <Karte titel="Ausgaben">
          {ausgaben.length === 0 ? (
            <p className="text-small text-ink-soft">Noch keine Ausgaben.</p>
          ) : (
            <ul className="mb-6 flex flex-col">
              {ausgaben.map((x) => (
                <li
                  key={x.id}
                  className="flex items-center justify-between gap-3 border-b border-line py-3 first:border-t"
                >
                  <div className="min-w-0">
                    <p className="truncate text-ink">{x.bezeichnung}</p>
                    <p className="mt-0.5 text-small text-ink-faint">
                      {x.art === "durchlauf" ? "Durchlauf" : "Eigen"} ·{" "}
                      {datum(x.datum)}
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

          <form action={ausgabeAnlegen} className="flex flex-col gap-3">
            <input type="hidden" name="projekt_id" value={projekt.id} />
            <Feld label="Bezeichnung" name="bezeichnung" pflicht platzhalter="Google-Ads-Spend" />
            <div className="grid grid-cols-2 gap-3">
              <Feld label="Betrag (€)" name="betrag" type="text" pflicht platzhalter="400" />
              <Feld label="Datum" name="datum" type="date" wert={heute()} />
            </div>
            <Auswahl
              label="Art"
              name="art"
              wert="eigen"
              optionen={[
                { wert: "eigen", text: "Eigen (meine Betriebsausgabe)" },
                { wert: "durchlauf", text: "Durchlauf (an Plattform gezahlt)" },
              ]}
            />
            <Absenden>Ausgabe hinzufügen</Absenden>
          </form>
        </Karte>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <Link
          href={`/admin/rechnungen/neu?projekt=${projekt.id}`}
          className="rounded-md border border-ink-faint px-5 py-2 text-small text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Rechnung aus diesem Projekt
        </Link>
        <form action={projektLoeschen}>
          <input type="hidden" name="id" value={projekt.id} />
          <MiniAktion gefahr>Projekt löschen</MiniAktion>
        </form>
      </div>
    </AdminShell>
  );
}
