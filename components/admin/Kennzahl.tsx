import type { ReactNode } from "react";
import { cx } from "@/components/ui";

/** Eine Kennzahl-Kachel im CRM-Dashboard. */
export function Kennzahl({
  label,
  wert,
  hinweis,
  ton = "normal",
}: {
  label: string;
  wert: string;
  hinweis?: ReactNode;
  /** 'gewinn' hebt hervor, 'gedaempft' für durchlaufende (nicht eigene) Posten. */
  ton?: "normal" | "gewinn" | "gedaempft";
}) {
  return (
    <div
      className={cx(
        "rounded-lg border p-6",
        ton === "gewinn"
          ? "border-accent/40 bg-accent/8"
          : "border-line bg-paper-sunk",
      )}
    >
      <p className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
        {label}
      </p>
      <p
        className={cx(
          "mt-3 font-display",
          ton === "gewinn" ? "text-h1 text-accent" : "text-h2 text-ink",
          ton === "gedaempft" && "text-ink-soft",
        )}
      >
        {wert}
      </p>
      {hinweis && <p className="mt-2 text-small text-ink-soft">{hinweis}</p>}
    </div>
  );
}
