import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SeitenHero } from "@/components/SeitenHero";
import { ServiceCard } from "@/components/ServiceCard";
import { Container, Eyebrow } from "@/components/ui";
import {
  breadcrumbSchema,
  buildMetadata,
  keywordsFuer,
  leistungenListeSchema,
} from "@/lib/seo";
import { adsServices, kernServices, services } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: "Leistungen — Webdesign, Entwicklung, SEO & Werbeanzeigen",
  description:
    "Alle Leistungen von Klickhafen: Webdesign, Webentwicklung, Automationen, SEO/AEO/GEO/CRO, Funnels, individuelle und Baukasten-Lösungen — plus Werbeanzeigen auf Google, YouTube, Facebook, Instagram, TikTok und LinkedIn.",
  path: "/leistungen",
  keywords: keywordsFuer("Leistungen", "Google Ads", "Social Media Werbung"),
});

export default function LeistungenUebersicht() {
  return (
    <>
      <JsonLd
        schema={[
          // ItemList sagt Crawlern, dass dies die vollständige Übersicht aller
          // Leistungen ist — sonst müssen sie es aus dem Markup raten.
          leistungenListeSchema(services),
          breadcrumbSchema([{ name: "Leistungen", path: "/leistungen" }]),
        ]}
      />

      <SeitenHero
        breadcrumb={[{ name: "Leistungen", path: "/leistungen" }]}
        eyebrow="Ausrüstung"
        titel={
          <>
            Die volle Ausrüstung.
            <br />
            Ein Hafen.
          </>
        }
        gross
        intro="Von der Website bis zur Werbeanzeige: Jede Leistung funktioniert für sich, zusammen ergeben sie einen Auftritt, der gefunden wird, überzeugt und Anfragen bringt. Wählen Sie den Bereich, der Sie gerade beschäftigt."
      />

      <section className="bg-paper-sunk py-16 md:py-24">
        <Container>
          <div>
            <Eyebrow>Kernleistungen</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] text-h2 text-balance">
              Alles, was Ihr Auftritt braucht.
            </h2>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {kernServices.map((service, i) => (
              <li key={service.slug} className="h-full">
                <Reveal delay={i * 0.04} className="h-full">
                  <ServiceCard service={service} />
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-20 border-t border-line pt-16">
            <Eyebrow>Werbeanzeigen</Eyebrow>
            <h2 className="mt-4 max-w-[30ch] text-h2 text-balance">
              Bezahlte Reichweite, die auf Anfragen zielt.
            </h2>
            <p className="mt-5 max-w-[64ch] text-ink-soft">
              Kampagnen auf der Plattform, auf der Ihre Kunden sind — gemessen
              bis zur Anfrage. Ihr Werbebudget bleibt Ihr Geld, getrennt vom
              Honorar, und das Werbekonto gehört Ihnen.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {adsServices.map((service, i) => (
              <li key={service.slug} className="h-full">
                <Reveal delay={i * 0.04} className="h-full">
                  <ServiceCard service={service} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        ueberschrift="Unsicher, was Sie brauchen?"
        text="Beschreiben Sie kurz Ihre Situation. Ich sage Ihnen, welche Leistung passt — und welche Sie sich sparen können."
        label="Kurz beschreiben lassen"
      />
    </>
  );
}
