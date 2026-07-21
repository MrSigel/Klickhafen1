/**
 * Die Klickhafen-Marke.
 *
 * Bewusst als GEFÜLLTE Geometrie statt als Strich-Ikone: eine 1,6px-Kontur
 * verschwindet neben der kräftigen Fraunces-Wortmarke und bricht bei 20px
 * weg. Masse trägt auf jeder Größe — und macht aus einem Icon ein Logo.
 *
 * Aufbau: Öse (Ring), Schaft, Stock (Querbalken), Flunke als gefüllte Sichel
 * mit zwei Widerhaken. Alles auf einem 24er-Raster konstruiert, keine
 * gezeichneten Kurven — die Kanten bleiben dadurch auch bei 16px sauber.
 */
export function Anker({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      {/* Öse — Ring mit echtem Loch (evenodd), nicht als Strich. */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0.9a3.1 3.1 0 100 6.2 3.1 3.1 0 000-6.2zm0 1.85a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"
      />

      {/* Schaft — endet bei 21.2 INNERHALB der Flunke (deren Unterkante bei
          21.6 liegt). Reichte er tiefer, lugte unten ein Nippel heraus. */}
      <rect x="10.85" y="5.0" width="2.3" height="16.2" rx="1.15" />

      {/* Stock — der Querbalken */}
      <rect x="5.7" y="8.3" width="12.6" height="2.2" rx="1.1" />

      {/* Flunke — gefüllte Sichel entlang des Bodens. Sie gibt dem Zeichen
          sein Gewicht; der Rest allein läse sich als Kreuz.
          Mittelpunkt (12, 12.8), außen r=8.8, innen r=6.5, von 158° bis 22°. */}
      <path d="M3.84 16.1A8.8 8.8 0 0020.16 16.1L18.03 15.24A6.5 6.5 0 015.97 15.24Z" />

      {/* Widerhaken — ohne sie liest die Sichel als Schale, nicht als Anker.
          Die Spitze läuft nach AUSSEN-oben (Radial- plus Gegentangenten-
          richtung am Bogenende). Zeigte sie senkrecht nach oben, entstünde
          am Übergang zum Bogen eine sichtbare Kerbe. */}
      <path d="M18.03 15.24L20.16 16.1L21.84 13.54Z" />
      <path d="M5.97 15.24L3.84 16.1L2.16 13.54Z" />
    </svg>
  );
}
