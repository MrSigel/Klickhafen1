import Link from "next/link";
import { Anker } from "./Anker";
import { cx } from "./ui";

/**
 * Das Lockup: Marke auf getönter Platte plus Wortmarke.
 *
 * Die Platte ist bewusst NICHT vollflächig im Akzent: der Hausstil erlaubt ein
 * Akzentsignal pro Screen, und das ist der CTA. Eine zweite grüne Fläche im
 * Header würde ihm die Aufmerksamkeit nehmen. Die Intensität kommt stattdessen
 * aus der Masse des gefüllten Zeichens und der Kante der Platte.
 * Erst beim Hover füllt die Platte — dann liegt der Fokus ohnehin hier.
 *
 * Größen sind intern responsiv, damit die Aufrufer nichts wissen müssen.
 * min-w-0 + truncate sind die Notbremse für absurd schmale Geräte
 * (Galaxy Fold außen, 280px): die Wortmarke schrumpft, statt die Seite
 * seitlich aufzuziehen.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Klickhafen — zur Startseite"
      className={cx(
        "group/logo flex min-w-0 items-center gap-2.5 rounded-md",
        className,
      )}
    >
      <span className="flex size-8 flex-none items-center justify-center rounded-[0.5rem] border border-accent/30 bg-accent/10 transition-colors duration-300 group-hover/logo:border-accent group-hover/logo:bg-accent sm:size-9">
        <Anker className="anker-idle size-[1.05rem] text-accent transition-colors duration-300 group-hover/logo:text-accent-ink sm:size-[1.15rem]" />
      </span>

      <span className="truncate font-display text-base tracking-[-0.02em] text-ink transition-colors duration-300 group-hover/logo:text-accent sm:text-h3">
        Klickhafen
      </span>
    </Link>
  );
}
