import Link from "next/link";
import type { Referenz } from "@/lib/referenzen";

/**
 * Beweis direkt neben dem CTA — die CRO-Regel „Trust dorthin, wo der Zweifel
 * entsteht" auf die Leistungsseite angewendet.
 *
 * Zeigt die echten Projekte, in denen genau diese Leistung steckt. Führt nach
 * /referenzen statt direkt zur Kundenseite: im Hero soll der Besucher nicht
 * aus dem Funnel fallen.
 *
 * Rendert nichts, wenn es keine Referenz gibt — eine Beleg-Zeile ohne Beleg
 * wäre schlimmer als keine.
 */
export function HeroBeleg({ referenzen }: { referenzen: Referenz[] }) {
  if (referenzen.length === 0) return null;

  return (
    <Link
      href="/referenzen"
      className="group/beleg block border-t border-line pt-5 transition-colors hover:border-accent"
    >
      <p className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
        Damit gebaut
      </p>
      {/* Keine Trennpunkte zwischen den Domains: beim Umbruch rutscht der
          Punkt sonst an den Zeilenanfang ("· sibylle-bergold.com"). Der
          Abstand und die Mono-Schrift trennen ausreichend. */}
      <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 transition-colors group-hover/beleg:text-ink">
        {referenzen.map((r) => (
          <li
            key={r.slug}
            className="font-mono text-[0.8125rem] text-ink-soft transition-colors group-hover/beleg:text-ink"
          >
            {r.domain}
          </li>
        ))}
      </ul>
    </Link>
  );
}
