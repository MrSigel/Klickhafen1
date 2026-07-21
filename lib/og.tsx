import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "./site";

/**
 * Das geteilte OG-Bild. Wird von app/opengraph-image.tsx und den
 * Varianten in [slug]-Routen genutzt, damit jede Seite ein eigenes,
 * markengerechtes Vorschaubild hat statt gar keines.
 *
 * Randbedingungen aus der Next-Doku, die den Aufbau hier bestimmen:
 * - ImageResponse rendert über Satori: NUR Flexbox, kein CSS Grid.
 * - Nur ttf/otf/woff — kein woff2.
 * - Maximal 500KB Bundle inkl. Fonts. Deshalb liegen in assets/ zwei
 *   subsettete, statische Schnitte (~39KB) statt der Variable Fonts,
 *   von denen Fraunces allein das Limit sprengen würde.
 */

export const OG_GROESSE = { width: 1200, height: 630 };
export const OG_TYP = "image/png";

/** Tokens aus app/globals.css — hier hartkodiert, weil Satori kein CSS kennt. */
const PAPER = "#0b0f0e";
const PAPER_DEEP = "#060908";
const INK = "#eceae3";
const INK_FAINT = "#7c8781";
const ACCENT = "#45a182";
const LINE = "#222b27";

type Font = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 600;
  style: "normal";
};

let fontCache: Font[] | null = null;

async function fonts(): Promise<Font[]> {
  if (fontCache) return fontCache;
  const [display, mono] = await Promise.all([
    readFile(join(process.cwd(), "assets/Fraunces-SemiBold.woff")),
    readFile(join(process.cwd(), "assets/GeistMono-Medium.woff")),
  ]);
  fontCache = [
    { name: "Fraunces", data: display as unknown as ArrayBuffer, weight: 600, style: "normal" },
    { name: "GeistMono", data: mono as unknown as ArrayBuffer, weight: 500, style: "normal" },
  ];
  return fontCache;
}

/** Die Marke als Pfad — identisch zu components/Anker.tsx. */
function AnkerOg({ groesse = 44 }: { groesse?: number }) {
  return (
    <svg width={groesse} height={groesse} viewBox="0 0 24 24" fill={ACCENT}>
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
  );
}

export async function ogBild({
  eyebrow,
  titel,
  fuss,
}: {
  eyebrow: string;
  titel: string;
  /** Rechts unten — z. B. die Domain einer Referenz oder das Datum */
  fuss?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Der Lichtschein — als weicher Kreis, weil Satori keine
            CSS-Filter kennt. Radialer Verlauf ist erlaubt. */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -180,
            width: 760,
            height: 760,
            borderRadius: 760,
            backgroundImage: `radial-gradient(circle, rgba(69,161,130,0.20) 0%, rgba(69,161,130,0) 68%)`,
            display: "flex",
          }}
        />

        {/* Kopf: Marke + Wortmarke */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              height: 68,
              borderRadius: 16,
              border: `1px solid rgba(69,161,130,0.3)`,
              backgroundColor: "rgba(69,161,130,0.1)",
            }}
          >
            <AnkerOg />
          </div>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 38,
              color: INK,
              letterSpacing: "-0.02em",
            }}
          >
            Klickhafen
          </div>
        </div>

        {/* Aussage */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "GeistMono",
              fontSize: 19,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: INK_FAINT,
            }}
          >
            <div style={{ width: 34, height: 1, backgroundColor: ACCENT, display: "flex" }} />
            {eyebrow}
          </div>

          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: titel.length > 68 ? 60 : 74,
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              color: INK,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {titel}
          </div>
        </div>

        {/* Fuß */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 26,
            fontFamily: "GeistMono",
            fontSize: 20,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: INK_FAINT,
          }}
        >
          <div style={{ display: "flex" }}>{site.domain}</div>
          {fuss ? (
            <div style={{ display: "flex", color: ACCENT }}>{fuss}</div>
          ) : (
            <div style={{ display: "flex" }}>Castrop-Rauxel · Ruhrgebiet</div>
          )}
        </div>

        {/* Bodenkante im Akzent — der eine Farbakzent des Bildes. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 8,
            backgroundColor: ACCENT,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 8,
            width: "100%",
            height: 1,
            backgroundColor: PAPER_DEEP,
            display: "flex",
          }}
        />
      </div>
    ),
    { ...OG_GROESSE, fonts: await fonts() },
  );
}
