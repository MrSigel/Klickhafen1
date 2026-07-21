import { cx } from "./ui";

/**
 * Die Peilrose der Unterseiten — dasselbe Bild wie hinter dem 3D-Anker auf
 * der Startseite, nur statisch und über die Ecke angeschnitten.
 *
 * Zweck: Die Startseite hat den Anker als Signature; die Unterseiten hatten
 * gar nichts und wirkten dadurch tot. Sie bekommen denselben Motivkreis,
 * ohne dafür WebGL zu laden — reines SVG, wenige hundert Byte.
 *
 * Rein dekorativ, deshalb aria-hidden und ohne Titel.
 */

/**
 * Auf 2 Nachkommastellen festnageln. Ohne das liefern Node und Browser für
 * dieselbe Sinus-Rechnung minimal verschiedene Werte und React meldet beim
 * Hydrieren einen Attribut-Mismatch (genau das ist hier schon passiert).
 */
const p = (n: number) => Number(n.toFixed(2));

const TEILUNG = 72;
const striche = Array.from({ length: TEILUNG }, (_, i) => {
  const winkel = (i / TEILUNG) * Math.PI * 2;
  const lang = i % 6 === 0;
  const r1 = 232;
  const r2 = r1 + (lang ? 26 : 12);
  return {
    i,
    lang,
    x1: p(Math.cos(winkel) * r1),
    y1: p(Math.sin(winkel) * r1),
    x2: p(Math.cos(winkel) * r2),
    y2: p(Math.sin(winkel) * r2),
  };
});

export function Peilkreis({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      aria-hidden="true"
      className={cx("pointer-events-none absolute", className)}
      fill="none"
    >
      <g transform="translate(300 300)">
        {/* Ringe — Hairlines, kein Verlauf. */}
        <circle r="232" stroke="var(--line)" strokeWidth="1" />
        <circle r="170" stroke="var(--line)" strokeWidth="1" opacity="0.6" />
        <circle r="96" stroke="var(--line)" strokeWidth="1" opacity="0.35" />

        {/* Teilung */}
        <g>
          {striche.map((s) => (
            <line
              key={s.i}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke="var(--ink)"
              strokeWidth={s.lang ? 1.5 : 1}
              opacity={s.lang ? 0.3 : 0.14}
            />
          ))}
        </g>

        {/* Die Peilung selbst: ein einzelner Akzentbogen. Der eine Punkt,
            an dem das Instrument etwas anzeigt. */}
        <path
          d="M 0 -232 A 232 232 0 0 1 164.05 -164.05"
          stroke="var(--accent)"
          strokeWidth="2"
          opacity="0.85"
        />
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="-232"
          stroke="var(--accent)"
          strokeWidth="1"
          opacity="0.3"
        />
      </g>
    </svg>
  );
}
