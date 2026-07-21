import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Keine Sperren für KI-Crawler: In Antwortmaschinen vorzukommen ist bei
 * Klickhafen erklärtes Ziel (AEO/GEO), nicht ein Nebeneffekt.
 * Impressum und Datenschutz regeln ihr noindex über die Metadata der Seite.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    // Der private CRM-Bereich /admin gehört in keinen Index.
    rules: [{ userAgent: "*", allow: "/", disallow: "/admin" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
