import Link from "next/link";
import type { ReactNode } from "react";
import { waLink, waZusatz } from "@/lib/whatsapp";

/** Klassen zusammenführen, ohne eine Abhängigkeit dafür zu installieren. */
export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Die Breite der Seite. Bewusst deutlich weiter als der Tailwind-Reflex
 * (max-w-6xl = 1152px), weil der sonst auf jedem Laptop breite tote Ränder
 * lässt. Der Gutter wächst mit dem Viewport mit, statt fix zu bleiben:
 * 20px am Handy, 64px am großen Monitor.
 *
 * Fließtext wird NICHT hier begrenzt, sondern lokal auf ~68ch —
 * ein breiter Container heißt nicht breite Textspalten.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "mx-auto w-full max-w-[92rem] px-5 sm:px-8 lg:px-12 2xl:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

/**
 * Der primäre CTA. Führt ausnahmslos über waLink() in WhatsApp —
 * es gibt auf dieser Website kein Kontaktformular.
 */
export function CtaWhatsApp({
  service,
  serviceName,
  children,
  variant = "primary",
  className,
  /**
   * Der Pfeil kostet rund 24px Breite. Im Header ist das auf 360px-Geräten
   * der Unterschied zwischen "passt" und "läuft über" — dort abschaltbar.
   */
  pfeil = true,
  /** Extra-Klassen für den Pfeil, z. B. `hidden sm:block` im Header. */
  pfeilClassName,
}: {
  service?: string;
  serviceName?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  pfeil?: boolean;
  pfeilClassName?: string;
}) {
  const styles = {
    // Taktiler Hover: der Knopf hebt sich leicht und bekommt einen weichen
    // Akzent-Schein — er "leuchtet auf" statt nur die Farbe zu wechseln. Das
    // nimmt das Statische, ohne ein Dauereffekt zu sein.
    primary:
      "border border-accent bg-accent text-accent-ink font-medium shadow-[0_1px_0_rgba(0,0,0,0.2)] hover:border-accent-hover hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(69,161,130,0.6)] active:translate-y-0 active:shadow-[0_1px_0_rgba(0,0,0,0.2)]",
    // border-ink-faint, nicht line-strong: bei einem transparenten Button ist
    // der Rahmen das einzige Erkennungsmerkmal und braucht 3:1 (WCAG 1.4.11).
    // line-strong läge bei 1,79:1 — unsichtbar für schwache Kontrastwahrnehmung.
    secondary:
      "border border-ink-faint text-ink hover:border-accent hover:text-accent hover:-translate-y-0.5 active:translate-y-0",
  }[variant];

  return (
    <a
      href={waLink(service)}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "group/cta inline-flex items-center gap-2.5 rounded-md px-6 py-3.5 text-small transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-out",
        styles,
        className,
      )}
    >
      {children}
      {/* Kontext für Screenreader, ANGEHÄNGT statt als aria-label — sonst
          verschwindet der sichtbare Text aus dem Namen (WCAG 2.5.3). */}
      <span className="sr-only">{waZusatz(serviceName)}</span>
      {pfeil && (
        <ArrowRight
          className={cx(
            "transition-transform duration-200 ease-out group-hover/cta:translate-x-1",
            pfeilClassName,
          )}
        />
      )}
    </a>
  );
}

/** Sekundärer Weg: interner Link, gleiche Maße wie der CTA. */
export function LinkButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx(
        // Gleicher Rahmen wie der sekundäre CTA — 3:1 nach WCAG 1.4.11.
        "group/lb inline-flex items-center gap-2.5 rounded-md border border-ink-faint px-6 py-3.5 text-small text-ink transition-colors duration-200 hover:border-accent hover:text-accent",
        className,
      )}
    >
      {children}
      <ArrowRight className="transition-transform duration-200 group-hover/lb:translate-x-0.5" />
    </Link>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cx("size-3.5 flex-none", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <path d="M1 8h13M9 3l5 5-5 5" />
    </svg>
  );
}

/** Externer Link (Referenzen) — mit Pfeil nach außen statt nach rechts. */
export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cx("size-3.5 flex-none", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <path d="M4 12L12 4M5.5 4H12v6.5" />
    </svg>
  );
}

/**
 * Sektionstrenner als echte Hairline — kein weicher Schattenverlauf.
 */
export function Rule({ className }: { className?: string }) {
  return <hr className={cx("border-0 border-t border-line", className)} />;
}
