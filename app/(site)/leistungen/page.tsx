import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SeitenHero } from "@/components/SeitenHero";
import { ServiceCard } from "@/components/ServiceCard";
import { Container } from "@/components/ui";
import {
  breadcrumbSchema,
  buildMetadata,
  keywordsFuer,
  leistungenListeSchema,
} from "@/lib/seo";
import { services } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: "Leistungen — Webdesign, Entwicklung, Automationen & SEO",
  description:
    "Alle Leistungen von Klickhafen im Überblick: Webdesign, Webentwicklung, Automationen, SEO/AEO/GEO/CRO, Funnels, individuelle und Baukasten-Lösungen.",
  path: "/leistungen",
  keywords: keywordsFuer("Leistungen", "individuelle Lösungen", "Baukasten"),
});

export default function LeistungenUebersicht() {
  return (
    <>
      <JsonLd
        schema={[
          // ItemList sagt Crawlern, dass dies eine vollständige Übersicht der
          // sieben Leistungen ist — sonst müssen sie es aus dem Markup raten.
          leistungenListeSchema(services),
          breadcrumbSchema([{ name: "Leistungen", path: "/leistungen" }]),
        ]}
      />

      <SeitenHero
        breadcrumb={[{ name: "Leistungen", path: "/leistungen" }]}
        eyebrow="Ausrüstung"
        titel={
          <>
            Sieben Leistungen.
            <br />
            Ein Hafen.
          </>
        }
        gross
        intro="Jede Leistung funktioniert für sich. Zusammen ergeben sie einen Auftritt, der gefunden wird, überzeugt und Arbeit abnimmt. Wählen Sie den Bereich, der Sie gerade beschäftigt."
      />

      <section className="bg-paper-sunk py-16 md:py-24">
        <Container>
          {/* Versteckte H2: hält die Überschriften-Ordnung (H1→H2→H3 der Karten)
              intakt, ohne die Optik zu ändern. */}
          <h2 className="sr-only">Alle Leistungen im Überblick</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, i) => (
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
