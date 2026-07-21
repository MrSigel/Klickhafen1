import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Web-App-Manifest. Macht die Seite auf dem Homescreen installierbar und gibt
 * Suchmaschinen wie Nutzern konsistente Marken-Metadaten (Name, Farben, Icon).
 * `dir`/`lang` sind gesetzt, weil die Copy durchgängig deutsch ist.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    lang: "de",
    dir: "ltr",
    start_url: "/",
    id: "/",
    display: "standalone",
    background_color: "#0b0f0e",
    theme_color: "#0b0f0e",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
