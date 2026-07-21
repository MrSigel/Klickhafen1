import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

/**
 * Sitemap aus derselben Quelle wie Navigation und Seiten.
 * Neue Leistung in lib/services.ts = automatisch in der Sitemap.
 * Impressum und Datenschutz fehlen bewusst: beide stehen auf noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const stand = new Date();

  const seiten: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/leistungen`, changeFrequency: "monthly", priority: 0.9 },
    // Lokale Landingpage — hohe Priorität, sie trägt das lokale Ranking.
    {
      url: `${site.url}/webdesign-castrop-rauxel`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${site.url}/referenzen`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/philosophie`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/kontakt`, changeFrequency: "yearly", priority: 0.8 },
  ];

  const leistungen: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${site.url}/leistungen/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: stand,
  }));

  // Beiträge tragen ihr ECHTES Datum, nicht den Build-Zeitpunkt. Ein
  // lastModified, das sich bei jedem Deploy ändert, ist für Crawler wertlos
  // — es behauptet Aktualität, die es nicht gibt.
  const beitraege: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    changeFrequency: "yearly",
    priority: 0.7,
    lastModified: new Date(post.aktualisiert ?? post.datum),
  }));

  return [
    ...seiten.map((e) => ({ ...e, lastModified: stand })),
    ...leistungen,
    ...beitraege,
  ];
}
