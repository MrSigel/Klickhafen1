import { OG_GROESSE, OG_TYP, ogBild } from "@/lib/og";
import { site } from "@/lib/site";

/**
 * Das Standard-Vorschaubild. Gilt für jede Seite, die kein eigenes
 * opengraph-image mitbringt — laut Next-Doku gewinnt immer das
 * spezifischere, weiter unten im Baum liegende.
 *
 * Dateibasierte Metadaten schlagen das metadata-Objekt: og:image,
 * og:image:width/height/type und og:image:alt entstehen automatisch,
 * openGraph.images in app/layout.tsx wäre wirkungslos.
 */
export const alt = `${site.name} — ${site.slogan}`;
export const size = OG_GROESSE;
export const contentType = OG_TYP;

export default async function Image() {
  return ogBild({
    eyebrow: "Castrop-Rauxel · Ruhrgebiet",
    // Muss zur H1 der Startseite passen: Wer den Link geteilt bekommt, soll
    // dasselbe Versprechen lesen wie nach dem Klick.
    titel: "Websites, die gefunden werden — bei Google und in KI-Antworten.",
  });
}
