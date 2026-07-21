/**
 * twitter-image ist laut Next-Doku eine EIGENE Konvention: opengraph-image
 * erzeugt kein twitter:image. Ohne diese Datei bliebe die Twitter/X-Karte
 * ohne Bild. Deshalb dasselbe Bild noch einmal re-exportiert.
 */
export { alt, size, contentType, default } from "./opengraph-image";
