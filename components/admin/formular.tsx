import type { ReactNode } from "react";
import { cx } from "@/components/ui";

const feldBasis =
  "w-full rounded-md border border-line-strong bg-paper px-3 py-2 text-small text-ink outline-none placeholder:text-ink-faint focus-visible:border-accent";

export function Feld({
  label,
  name,
  type = "text",
  pflicht = false,
  platzhalter,
  wert,
  schritt,
}: {
  label: string;
  name: string;
  type?: string;
  pflicht?: boolean;
  platzhalter?: string;
  wert?: string | number;
  schritt?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
        {label}
        {pflicht && <span className="text-accent"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={pflicht}
        placeholder={platzhalter}
        defaultValue={wert}
        step={schritt}
        className={feldBasis}
      />
    </label>
  );
}

export function Feldgross({
  label,
  name,
  pflicht = false,
  platzhalter,
  wert,
  zeilen = 3,
}: {
  label: string;
  name: string;
  pflicht?: boolean;
  platzhalter?: string;
  wert?: string;
  zeilen?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
        {label}
        {pflicht && <span className="text-accent"> *</span>}
      </span>
      <textarea
        name={name}
        required={pflicht}
        placeholder={platzhalter}
        defaultValue={wert}
        rows={zeilen}
        className={cx(feldBasis, "resize-y leading-relaxed")}
      />
    </label>
  );
}

export function Auswahl({
  label,
  name,
  optionen,
  wert,
  pflicht = false,
}: {
  label: string;
  name: string;
  optionen: { wert: string; text: string }[];
  wert?: string;
  pflicht?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
        {label}
      </span>
      <select
        name={name}
        required={pflicht}
        defaultValue={wert}
        className={cx(feldBasis, "appearance-none")}
      >
        {optionen.map((o) => (
          <option key={o.wert} value={o.wert}>
            {o.text}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Absenden({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-md border border-accent bg-accent px-5 py-2 text-small font-medium text-accent-ink transition-colors hover:bg-accent-hover"
    >
      {children}
    </button>
  );
}

/** Kleiner, unauffälliger Sekundär-Button (Löschen, Umschalten) in einem Form. */
export function MiniAktion({
  children,
  gefahr = false,
}: {
  children: ReactNode;
  gefahr?: boolean;
}) {
  return (
    <button
      type="submit"
      className={cx(
        "text-eyebrow font-mono tracking-[0.1em] uppercase transition-colors",
        gefahr
          ? "text-ink-faint hover:text-red-400"
          : "text-ink-faint hover:text-accent",
      )}
    >
      {children}
    </button>
  );
}

/** Karte, die Formulare und Listen im CRM umschließt. */
export function Karte({
  titel,
  children,
  aktion,
}: {
  titel?: string;
  children: ReactNode;
  aktion?: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-line bg-paper-sunk p-6">
      {(titel || aktion) && (
        <div className="mb-5 flex items-center justify-between gap-4">
          {titel && <h2 className="font-display text-h3">{titel}</h2>}
          {aktion}
        </div>
      )}
      {children}
    </section>
  );
}
