import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { ReferenzCard } from "@/components/ReferenzCard";
import { Reveal } from "@/components/Reveal";
import { SeitenHero } from "@/components/SeitenHero";
import { Container, Eyebrow } from "@/components/ui";
import { referenzen } from "@/lib/referenzen";
import { breadcrumbSchema, buildMetadata, keywordsFuer } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Referenzen — Websites, die ich gebaut habe",
  description:
    "Ausgewählte Projekte von Klickhafen: Limit Breakers, AlpenDry, Selin Weikard und Sibylle Bergold. Vier Branchen, vier Aufgaben, alle live erreichbar.",
  path: "/referenzen",
  keywords: keywordsFuer("Referenzen", "Portfolio", "Kundenprojekte"),
});

/**
 * ItemList mit den echten, live erreichbaren Projekten. Kein CreativeWork-
 * Schema mit erfundenen Kennzahlen — nur das, was nachprüfbar ist. Der
 * Screenshot kommt als absolute URL dazu, seit es echte Bilder gibt.
 */
function referenzenSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Referenzen von Klickhafen",
    itemListElement: referenzen.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.name,
      url: r.url,
      description: r.claim,
      ...(r.bild ? { image: `${site.url}/referenzen/${r.bild}` } : {}),
    })),
  };
}

export default function ReferenzenSeite() {
  return (
    <>
      <JsonLd
        schema={[
          referenzenSchema(),
          breadcrumbSchema([{ name: "Referenzen", path: "/referenzen" }]),
        ]}
      />

      <SeitenHero
        breadcrumb={[{ name: "Referenzen", path: "/referenzen" }]}
        eyebrow="Im Logbuch"
        titel={
          <>
            Angelegt. Ausgerüstet.
            <br />
            Ausgelaufen.
          </>
        }
        gross
        intro="Vier Projekte, vier völlig verschiedene Aufgaben — von der Unternehmensberatung bis zum 24/7-Notdienst. Jedes davon habe ich vollständig allein umgesetzt. Alle sind live und lassen sich nachprüfen."
      />

      <section className="py-16 md:py-24">
        <Container>
          {/* Versteckte H2: hält die Überschriften-Ordnung (H1→H2→H3) intakt. */}
          <h2 className="sr-only">Ausgewählte Projekte</h2>
          <ul className="flex flex-col gap-20 md:gap-28">
            {referenzen.map((referenz, i) => (
              <li key={referenz.slug}>
                <Reveal>
                  <ReferenzCard referenz={referenz} index={i} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Ehrliche Einordnung statt aufgeblasener Zahlenwand. */}
      <section className="border-t border-line bg-paper-sunk py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Zur Einordnung</Eyebrow>
            </div>
            <p className="max-w-[68ch] text-ink-soft lg:col-span-8">
              Diese Auswahl zeigt Kundenprojekte. Dazu kommen eigene Arbeiten,
              die nicht öffentlich verlinkbar sind — darunter ein vollständiges
              Browsergame mit Spiellogik und Datenhaltung über viele
              gleichzeitige Spieler. Wenn Sie wissen wollen, ob ich Ihr Vorhaben
              technisch stemme: fragen Sie mich danach. Ich zeige es Ihnen im
              Gespräch, statt es hier zu behaupten.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        ueberschrift="Ihr Projekt als nächster Eintrag im Logbuch?"
        text={`Schreiben Sie mir, worum es geht. Sie bekommen eine ehrliche Einschätzung — aus ${site.adresse.ort}, für Kunden im Ruhrgebiet und bundesweit.`}
        label="Projekt besprechen"
      />
    </>
  );
}
