import { ImageResponse } from "next/og";

/**
 * Apple-Touch-Icon, 180×180 PNG. Apple unterstützt keine SVG-Icons, deshalb
 * hier gerastert. Dient gleichzeitig als raster-taugliches Logo für das
 * Organization-Schema (logo: /apple-icon) — Google bevorzugt dort PNG.
 *
 * Die Marke ist dieselbe wie in components/Anker.tsx, nur mit etwas mehr
 * Rand, damit iOS' eigene Ecken-Rundung nichts abschneidet.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0f0e",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 24 24" fill="#45a182">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 0.9a3.1 3.1 0 100 6.2 3.1 3.1 0 000-6.2zm0 1.85a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"
          />
          <rect x="10.85" y="5.0" width="2.3" height="16.2" rx="1.15" />
          <rect x="5.7" y="8.3" width="12.6" height="2.2" rx="1.1" />
          <path d="M3.84 16.1A8.8 8.8 0 0020.16 16.1L18.03 15.24A6.5 6.5 0 015.97 15.24Z" />
          <path d="M18.03 15.24L20.16 16.1L21.84 13.54Z" />
          <path d="M5.97 15.24L3.84 16.1L2.16 13.54Z" />
        </svg>
      </div>
    ),
    size,
  );
}
