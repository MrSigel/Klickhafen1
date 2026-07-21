/**
 * Das statische Gegenstück zur 3D-Szene: identische Bildidee (Anker vor
 * Kompassrose), nur ohne WebGL und ohne Bewegung. Kommt zum Einsatz bei
 * prefers-reduced-motion, als Ladezustand und wenn WebGL nicht verfügbar ist.
 *
 * Bewusst kein "Platzhalter": wer die Animation nicht sieht oder nicht sehen
 * will, bekommt trotzdem ein fertiges Bild.
 */
/**
 * Auf 2 Nachkommastellen festnageln. Ohne das liefern Node und Browser für
 * dieselbe Sinus-Rechnung minimal verschiedene Fließkommawerte, und React
 * meldet beim Hydrieren einen Attribut-Mismatch.
 */
const p = (n: number) => Number(n.toFixed(2));

export function AnkerFallback() {
  const striche = Array.from({ length: 48 }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Ein Anker vor einer Kompassrose — das Zeichen von Klickhafen."
      className="size-full"
    >
      <g transform="translate(200 200)">
        {/* Kompassrose */}
        <g opacity="0.5">
          {striche.map((i) => {
            const winkel = (i / striche.length) * Math.PI * 2;
            const lang = i % 4 === 0;
            const r1 = 168;
            const r2 = r1 + (lang ? 19 : 9);
            return (
              <line
                key={i}
                x1={p(Math.cos(winkel) * r1)}
                y1={p(Math.sin(winkel) * r1)}
                x2={p(Math.cos(winkel) * r2)}
                y2={p(Math.sin(winkel) * r2)}
                stroke="var(--ink)"
                strokeWidth={lang ? 1.6 : 1}
                opacity={lang ? 0.55 : 0.28}
              />
            );
          })}
        </g>

        {/* Peilkreuz */}
        <g stroke="var(--line)" strokeWidth="1">
          <line x1="-150" y1="0" x2="150" y2="0" />
          <line x1="0" y1="-150" x2="0" y2="150" />
        </g>
        <circle r="120" fill="none" stroke="var(--line)" strokeWidth="1" />

        {/* Anker */}
        <g
          fill="none"
          stroke="var(--accent)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="scale(1.05)"
        >
          <circle cx="0" cy="-104" r="21" />
          <path d="M0 -83V112" />
          <path d="M-46 -46H46" />
          <path d="M-96 22c0 47 43 78 96 78s96-31 96-78" />
          <path d="M-96 22h30M96 22H66" />
        </g>
      </g>
    </svg>
  );
}
