import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { Karte, MiniAktion } from "@/components/admin/formular";
import {
  rechnungLoeschen,
  rechnungSenden,
  rechnungStatus,
} from "@/lib/admin/aktionen";
import { rechnungLaden } from "@/lib/admin/daten";
import { einstellungenLaden } from "@/lib/admin/einstellungen";
import { rechnungBetrag } from "@/lib/admin/rechnung-betrag";
import { datum, euro } from "@/lib/admin/format";
import { aktuellerNutzer } from "@/lib/admin/supabase";

export const dynamic = "force-dynamic";

const HINWEISE: Record<string, string> = {
  gesendet: "Rechnung wurde per E-Mail versendet.",
  "kein-resend": "Kein Resend-Key gesetzt — E-Mail-Versand ist noch nicht aktiv.",
  "keine-email": "Beim Kunden ist keine E-Mail hinterlegt.",
  fehler: "Versand fehlgeschlagen. Bitte später erneut versuchen.",
  "nicht-gefunden": "Rechnung nicht gefunden.",
};

export default async function RechnungDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ hinweis?: string }>;
}) {
  if (!(await aktuellerNutzer())) redirect("/admin/login");
  const { id } = await params;
  const { hinweis } = await searchParams;
  const geladen = await rechnungLaden(id);
  if (!geladen) notFound();

  const { rechnung, posten } = geladen;
  const e = await einstellungenLaden();
  const betrag = rechnungBetrag(
    posten.map((p) => ({ menge: Number(p.menge), einzelpreis: Number(p.einzelpreis) })),
    { kleinunternehmer: e.kleinunternehmer, ustSatz: e.ustSatz },
  );
  const ustLabel = betrag.ustSatz.toString().replace(".", ",");

  return (
    <AdminShell titel={`Rechnung ${rechnung.nummer}`} aktiv="/admin/rechnungen">
      <p className="-mt-4 mb-8 text-small text-ink-soft">
        {rechnung.kunde?.name ?? "—"} · {datum(rechnung.datum, true)} ·{" "}
        <Link href="/admin/rechnungen" className="text-accent hover:underline">
          zurück
        </Link>
      </p>

      {hinweis && HINWEISE[hinweis] && (
        <p
          className={
            hinweis === "gesendet"
              ? "mb-6 rounded-md border border-accent/40 bg-accent/8 px-4 py-3 text-small text-accent"
              : "mb-6 rounded-md border border-line-strong bg-paper-sunk px-4 py-3 text-small text-ink-soft"
          }
        >
          {HINWEISE[hinweis]}
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <Karte titel="Positionen">
          <ul className="flex flex-col">
            {posten.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-4 border-b border-line py-3 first:border-t"
              >
                <span className="text-ink">{p.bezeichnung}</span>
                <span className="font-mono text-small text-ink">
                  {euro(Number(p.menge) * Number(p.einzelpreis))}
                </span>
              </li>
            ))}
          </ul>
          {!e.kleinunternehmer && (
            <div className="mt-4 flex flex-col gap-1.5 text-small text-ink-soft">
              <div className="flex items-center justify-between">
                <span>Zwischensumme (netto)</span>
                <span className="font-mono">{euro(betrag.netto)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>zzgl. {ustLabel} % USt</span>
                <span className="font-mono">{euro(betrag.ust)}</span>
              </div>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between border-t-2 border-ink pt-4">
            <span className="font-display text-h3">Gesamtbetrag</span>
            <span className="font-display text-h3">{euro(betrag.brutto)}</span>
          </div>
          <p className="mt-3 text-small text-ink-faint">
            {e.kleinunternehmer
              ? "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet."
              : `Enthält ${ustLabel} % Umsatzsteuer (${euro(betrag.ust)}).`}
          </p>
        </Karte>

        <div className="flex flex-col gap-6">
          <Karte titel="Aktionen">
            <div className="flex flex-col gap-3">
              <a
                href={`/admin/rechnungen/${id}/pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-ink-faint px-4 py-2.5 text-center text-small text-ink transition-colors hover:border-accent hover:text-accent"
              >
                PDF ansehen / herunterladen
              </a>
              <form action={rechnungSenden}>
                <input type="hidden" name="id" value={id} />
                <button
                  type="submit"
                  className="w-full rounded-md border border-accent bg-accent px-4 py-2.5 text-small font-medium text-accent-ink transition-colors hover:bg-accent-hover"
                >
                  Per E-Mail an Kunden senden
                </button>
              </form>
            </div>
          </Karte>

          <Karte titel="Status">
            <div className="flex flex-wrap gap-2">
              {(["entwurf", "gesendet", "bezahlt"] as const).map((st) => (
                <form key={st} action={rechnungStatus}>
                  <input type="hidden" name="id" value={id} />
                  <input type="hidden" name="status" value={st} />
                  <button
                    type="submit"
                    className={
                      rechnung.status === st
                        ? "rounded-md border border-accent bg-accent/12 px-3 py-1.5 text-small text-accent"
                        : "rounded-md border border-line px-3 py-1.5 text-small text-ink-soft transition-colors hover:border-accent hover:text-accent"
                    }
                  >
                    {st === "entwurf" ? "Entwurf" : st === "gesendet" ? "Gesendet" : "Bezahlt"}
                  </button>
                </form>
              ))}
            </div>
          </Karte>

          <form action={rechnungLoeschen} className="text-right">
            <input type="hidden" name="id" value={id} />
            <MiniAktion gefahr>Rechnung löschen</MiniAktion>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
