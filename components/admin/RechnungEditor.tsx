"use client";

import { useMemo, useState } from "react";
import { euro } from "@/lib/admin/format";

type KundeKurz = {
  id: string;
  name: string;
  firma: string | null;
  adresse: string | null;
};

type Zeile = { bezeichnung: string; menge: string; einzelpreis: string };

export type RechnungStandard = {
  id?: string;
  kundeId: string | null;
  nummer: string;
  datum: string;
  faellig: string;
  notiz: string;
  zeilen: { bezeichnung: string; menge: number; einzelpreis: number }[];
};

/** Deutsche Zahl „1.234,56" → 1234.56 (tolerant). */
function zahl(s: string): number {
  const n = Number(s.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

const feld =
  "w-full rounded-md border border-line-strong bg-paper px-3 py-2 text-small text-ink outline-none placeholder:text-ink-faint focus-visible:border-accent";
const label =
  "font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase";

export function RechnungEditor({
  kunden,
  standard,
  submitLabel,
  action,
}: {
  kunden: KundeKurz[];
  standard: RechnungStandard;
  submitLabel: string;
  action: (fd: FormData) => void | Promise<void>;
}) {
  const [kundeId, setKundeId] = useState(standard.kundeId ?? "");
  const [zeilen, setZeilen] = useState<Zeile[]>(
    standard.zeilen.length
      ? standard.zeilen.map((z) => ({
          bezeichnung: z.bezeichnung,
          menge: String(z.menge),
          einzelpreis: z.einzelpreis
            ? String(z.einzelpreis).replace(".", ",")
            : "",
        }))
      : [{ bezeichnung: "", menge: "1", einzelpreis: "" }],
  );

  const kunde = kunden.find((k) => k.id === kundeId) ?? null;
  const summe = useMemo(
    () => zeilen.reduce((s, z) => s + zahl(z.menge || "1") * zahl(z.einzelpreis), 0),
    [zeilen],
  );

  const setZeile = (i: number, teil: Partial<Zeile>) =>
    setZeilen((zs) => zs.map((z, j) => (j === i ? { ...z, ...teil } : z)));
  const zeileWeg = (i: number) =>
    setZeilen((zs) => (zs.length > 1 ? zs.filter((_, j) => j !== i) : zs));
  const zeileNeu = () =>
    setZeilen((zs) => [...zs, { bezeichnung: "", menge: "1", einzelpreis: "" }]);

  return (
    <form action={action} className="flex flex-col gap-8">
      {standard.id && <input type="hidden" name="id" value={standard.id} />}

      {/* Kunde */}
      <section className="rounded-lg border border-line bg-paper-sunk p-6">
        <h2 className="mb-5 font-display text-h3">Kunde</h2>
        {kunden.length === 0 ? (
          <p className="text-small text-ink-soft">
            Noch kein Kunde angelegt. Lege zuerst unter „Kunden“ einen an.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className={label}>
                Kunde wählen<span className="text-accent"> *</span>
              </span>
              <select
                name="kunde_id"
                required
                value={kundeId}
                onChange={(e) => setKundeId(e.target.value)}
                className={feld + " appearance-none"}
              >
                <option value="" disabled>
                  Bitte wählen …
                </option>
                {kunden.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.firma ? `${k.firma} — ${k.name}` : k.name}
                  </option>
                ))}
              </select>
            </label>

            {kunde && (
              <div className="rounded-md border border-line bg-paper px-4 py-3 text-small text-ink-soft">
                {kunde.firma && <p className="text-ink">{kunde.firma}</p>}
                <p className={kunde.firma ? "" : "text-ink"}>{kunde.name}</p>
                {kunde.adresse
                  ?.split("\n")
                  .map((z, i) => <p key={i}>{z}</p>)}
                {!kunde.adresse && (
                  <p className="text-ink-faint">
                    Keine Anschrift hinterlegt — beim Kunden ergänzen.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Positionen */}
      <section className="rounded-lg border border-line bg-paper-sunk p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-display text-h3">Positionen</h2>
          <button
            type="button"
            onClick={zeileNeu}
            className="rounded-md border border-line-strong px-3 py-1.5 text-small text-ink-soft transition-colors hover:border-accent hover:text-accent"
          >
            + Position
          </button>
        </div>

        {/* Kopfzeile (nur ab sm) */}
        <div className="mb-2 hidden grid-cols-[1fr_5rem_8rem_2rem] gap-3 px-1 sm:grid">
          <span className={label}>Beschreibung</span>
          <span className={label + " text-right"}>Menge</span>
          <span className={label + " text-right"}>Einzelpreis €</span>
          <span />
        </div>

        <div className="flex flex-col gap-3">
          {zeilen.map((z, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_5rem_8rem_2rem] sm:items-center"
            >
              <input
                name="z_bezeichnung"
                value={z.bezeichnung}
                onChange={(e) => setZeile(i, { bezeichnung: e.target.value })}
                placeholder="z. B. Website — Design & Entwicklung"
                className={feld}
              />
              <input
                name="z_menge"
                value={z.menge}
                onChange={(e) => setZeile(i, { menge: e.target.value })}
                inputMode="decimal"
                placeholder="1"
                className={feld + " sm:text-right"}
              />
              <input
                name="z_preis"
                value={z.einzelpreis}
                onChange={(e) => setZeile(i, { einzelpreis: e.target.value })}
                inputMode="decimal"
                placeholder="0,00"
                className={feld + " sm:text-right"}
              />
              <button
                type="button"
                onClick={() => zeileWeg(i)}
                aria-label="Position entfernen"
                className="justify-self-end text-ink-faint transition-colors hover:text-red-400 disabled:opacity-30"
                disabled={zeilen.length <= 1}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-end gap-6 border-t border-line pt-4">
          <span className="text-small text-ink-soft">Summe</span>
          <span className="font-mono text-h3 text-ink">{euro(summe)}</span>
        </div>
      </section>

      {/* Rechnungsdaten */}
      <section className="rounded-lg border border-line bg-paper-sunk p-6">
        <h2 className="mb-5 font-display text-h3">Rechnungsdaten</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={label}>
              Rechnungsnummer<span className="text-accent"> *</span>
            </span>
            <input name="nummer" required defaultValue={standard.nummer} className={feld} />
          </label>
          <div />
          <label className="flex flex-col gap-1.5">
            <span className={label}>Datum</span>
            <input name="datum" type="date" defaultValue={standard.datum} className={feld} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={label}>Fällig bis</span>
            <input name="faellig" type="date" defaultValue={standard.faellig} className={feld} />
          </label>
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className={label}>Notiz auf der Rechnung (optional)</span>
            <input
              name="notiz"
              defaultValue={standard.notiz}
              placeholder="z. B. Vielen Dank für die Zusammenarbeit."
              className={feld}
            />
          </label>
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="rounded-md border border-accent bg-accent px-5 py-2.5 text-small font-medium text-accent-ink transition-colors hover:bg-accent-hover"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
