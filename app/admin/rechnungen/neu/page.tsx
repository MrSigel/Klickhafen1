import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { Absenden, Feld, Karte } from "@/components/admin/formular";
import { rechnungAnlegen } from "@/lib/admin/aktionen";
import {
  naechsteRechnungsnummer,
  projekteLaden,
  projektLaden,
} from "@/lib/admin/daten";
import { euro } from "@/lib/admin/format";
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
  searchParams: Promise<{ projekt?: string }>;
}) {
  if (!(await aktuellerNutzer())) redirect("/admin/login");
  const { projekt: projektId } = await searchParams;

  // Ohne Projekt: erst eines auswählen.
  if (!projektId) {
    const projekte = await projekteLaden();
    return (
      <AdminShell titel="Neue Rechnung" aktiv="/admin/rechnungen">
        <Karte titel="Projekt wählen">
          {projekte.length === 0 ? (
            <p className="text-small text-ink-soft">
              Erst ein Projekt mit Einnahmen anlegen.
            </p>
          ) : (
            <ul className="flex flex-col">
              {projekte.map((p) => (
                <li key={p.id} className="border-b border-line first:border-t">
                  <Link
                    href={`/admin/rechnungen/neu?projekt=${p.id}`}
                    className="block py-3.5 text-ink transition-colors hover:text-accent"
                  >
                    {p.name}
                    <span className="text-ink-faint"> · {p.kunde?.name ?? "—"}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Karte>
      </AdminShell>
    );
  }

  const detail = await projektLaden(projektId);
  if (!detail) redirect("/admin/rechnungen/neu");
  const nummer = await naechsteRechnungsnummer(new Date().getFullYear());
  const berechenbar = detail.posten; // alle Posten zur Auswahl

  return (
    <AdminShell titel="Neue Rechnung" aktiv="/admin/rechnungen">
      <p className="-mt-4 mb-8 text-small text-ink-soft">
        Projekt: {detail.projekt.name} · Kunde:{" "}
        {detail.projekt.kunde?.name ?? "ohne Kunde"}
      </p>

      <form action={rechnungAnlegen} className="max-w-2xl">
        <input type="hidden" name="projekt_id" value={projektId} />

        <Karte titel="Rechnungszeilen wählen">
          {berechenbar.length === 0 ? (
            <p className="text-small text-ink-soft">
              Dieses Projekt hat noch keine Posten.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {berechenbar.map((p) => (
                <li key={p.id}>
                  <label className="flex items-center justify-between gap-3 rounded-md border border-line px-3 py-2.5">
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="posten"
                        value={p.id}
                        defaultChecked
                        className="accent-accent"
                      />
                      <span className="text-small text-ink">{p.bezeichnung}</span>
                    </span>
                    <span className="font-mono text-small text-ink">
                      {euro(Number(p.betrag))}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </Karte>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Feld label="Rechnungsnummer" name="nummer" pflicht wert={nummer} />
          <div />
          <Feld label="Datum" name="datum" type="date" wert={heute()} />
          <Feld label="Fällig bis" name="faellig" type="date" wert={inZweiWochen()} />
        </div>
        <div className="mt-4">
          <Feld label="Notiz (optional)" name="notiz" />
        </div>

        <div className="mt-6">
          <Absenden>Rechnung anlegen</Absenden>
        </div>
      </form>
    </AdminShell>
  );
}
