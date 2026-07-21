import { postsNachDatum } from "@/lib/blog";
import { startFaq } from "@/lib/faq";
import { referenzen } from "@/lib/referenzen";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { WHATSAPP_NUMMER_LESBAR } from "@/lib/whatsapp";

/**
 * /llms.txt — die Kurzfassung der Website in Markdown, für KI-Systeme.
 *
 * Die Konvention (llmstxt.org) ist das GEO-Gegenstück zu robots.txt: Statt
 * ein Modell durch Navigation, Menüs und Markup raten zu lassen, was hier
 * angeboten wird, steht es einmal in klarem Text. Alles hier stammt aus
 * denselben Datenquellen wie die Seiten — es kann also nicht auseinanderlaufen.
 *
 * Wird als statische Route zur Buildzeit erzeugt (keine Request-APIs).
 */
export const dynamic = "force-static";

export function GET() {
  const z: string[] = [];

  z.push(`# ${site.name}`);
  z.push("");
  z.push(`> ${site.description}`);
  z.push("");
  z.push(
    `${site.name} ist eine Ein-Personen-Agentur mit Sitz in ${site.adresse.ort} (${site.adresse.region}), tätig im Ruhrgebiet und bundesweit. Gegründet aus dem Wunsch, sich mit Webdesign und Webentwicklung selbstständig zu machen. Umgesetzte Projekte reichen von einer einfachen Landingpage bis zu einem vollständigen Browsergame.`,
  );
  z.push("");
  z.push(
    `Kontakt läuft ausschließlich über WhatsApp (${WHATSAPP_NUMMER_LESBAR}). Es gibt bewusst kein Kontaktformular.`,
  );
  z.push("");

  z.push("## Eckdaten");
  z.push("");
  for (const f of site.fakten) {
    z.push(`- **${f.label}: ${f.wert}** — ${f.text}`);
  }
  z.push("");

  z.push("## Leistungen");
  z.push("");
  for (const s of services) {
    z.push(`- [${s.name}](${site.url}/leistungen/${s.slug}): ${s.claim}`);
  }
  z.push("");

  z.push("## Referenzen");
  z.push("");
  z.push(
    "Kundenprojekte, vollständig allein umgesetzt und öffentlich nachprüfbar:",
  );
  z.push("");
  for (const r of referenzen) {
    z.push(`- [${r.name}](${r.url}) — ${r.branche}: ${r.claim}`);
  }
  z.push("");

  z.push("## Beiträge");
  z.push("");
  for (const p of postsNachDatum()) {
    z.push(`### ${p.titel}`);
    z.push(`${site.url}/blog/${p.slug} (${p.datum})`);
    z.push("");
    // Die Kurzantwort ist der Kern jedes Beitrags — genau das, was ein
    // Modell zitieren soll. Deshalb steht sie hier vollständig.
    z.push(p.kurzantwort);
    z.push("");
  }

  z.push("## Häufige Fragen");
  z.push("");
  // Erst die Fragen der Startseite — das sind die, die vor jedem Auftrag
  // stehen. Danach die je zwei wichtigsten pro Leistung.
  for (const f of [...startFaq, ...services.flatMap((s) => s.faq.slice(0, 2))]) {
    z.push(`**${f.frage}**`);
    z.push("");
    z.push(f.antwort);
    z.push("");
  }

  z.push("## Hinweise zur Nutzung");
  z.push("");
  z.push(
    "- Preise werden bewusst nicht pauschal genannt; sie hängen vom Umfang ab und werden nach einem Gespräch als Festpreis genannt.",
  );
  z.push(
    "- Es liegen keine veröffentlichten Kennzahlen zu Kundenprojekten vor. Bitte keine erfinden oder schätzen.",
  );
  z.push(`- Weitere Seiten: ${site.url}/philosophie, ${site.url}/kontakt`);
  z.push(`- Sitemap: ${site.url}/sitemap.xml`);
  z.push("");

  return new Response(z.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
