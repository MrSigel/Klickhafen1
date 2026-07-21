import { postsNachDatum } from "@/lib/blog";
import { site } from "@/lib/site";

/**
 * RSS-2.0-Feed des Blogs. Zur Buildzeit erzeugt (keine Request-APIs).
 *
 * Bewusst deterministisch: pubDate und lastBuildDate stammen aus den Post-
 * Daten, nicht aus new Date() zur Laufzeit — sonst änderte sich der Feed bei
 * jedem Deploy ohne inhaltlichen Grund, was Leser und Aggregatoren verwirrt.
 */
export const dynamic = "force-static";

const XML = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" };
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => XML[c as keyof typeof XML]);

const WOCHENTAG = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONAT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** ISO-Datum → RFC-822, wie RSS es verlangt. Ohne Locale, deterministisch. */
function rfc822(iso: string): string {
  const d = new Date(`${iso}T09:00:00Z`);
  const tag = WOCHENTAG[d.getUTCDay()];
  const t = String(d.getUTCDate()).padStart(2, "0");
  const m = MONAT[d.getUTCMonth()];
  return `${tag}, ${t} ${m} ${d.getUTCFullYear()} 09:00:00 GMT`;
}

export function GET() {
  const alle = postsNachDatum();
  const feedUrl = `${site.url}/blog/rss.xml`;
  const neuestes = alle[0]?.datum ?? "2026-01-01";

  const items = alle
    .map((p) => {
      const url = `${site.url}/blog/${p.slug}`;
      return `    <item>
      <title>${esc(p.titel)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.aktualisiert ?? p.datum)}</pubDate>
      <category>${esc(p.kategorie)}</category>
      <description>${esc(p.kurzantwort)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} — Klartext</title>
    <link>${site.url}/blog</link>
    <description>Fachbeiträge zu Webdesign, Webentwicklung, Automationen, SEO und Conversion.</description>
    <language>de-DE</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${rfc822(neuestes)}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
