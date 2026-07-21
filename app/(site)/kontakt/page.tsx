import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SeitenHero } from "@/components/SeitenHero";
import { ServiceCard } from "@/components/ServiceCard";
import { Container, CtaWhatsApp, Eyebrow } from "@/components/ui";
import { breadcrumbSchema, buildMetadata, keywordsFuer } from "@/lib/seo";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { WHATSAPP_NUMMER_LESBAR } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Kontakt — direkt per WhatsApp, ohne Formular",
  description:
    "Kein Kontaktformular, keine Warteschleife: Schreiben Sie Klickhafen direkt per WhatsApp. Aus Castrop-Rauxel, für das Ruhrgebiet und bundesweit.",
  path: "/kontakt",
  keywords: keywordsFuer("Kontakt", "WhatsApp", "Anfrage"),
});

/** Was passiert, nachdem geschrieben wurde — nimmt die Hemmschwelle. */
const ablauf = [
  "Sie schreiben, worum es geht. Zwei Sätze reichen für den Anfang.",
  "Ich melde mich in der Regel noch am selben Werktag zurück.",
  "Wir klären in einem kurzen Gespräch, ob und wie ich helfen kann.",
  "Passt es, bekommen Sie ein konkretes Angebot. Passt es nicht, sage ich das.",
];

export default function KontaktSeite() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Kontakt", path: "/kontakt" }])} />

      <SeitenHero
        breadcrumb={[{ name: "Kontakt", path: "/kontakt" }]}
        eyebrow="Anlegen"
        titel={
          <>
            Schreiben Sie mir.
            <br />
            Das ist der ganze Weg.
          </>
        }
        gross
      >
        {/* Rechte Spalte: die Karte trägt hier den Ablauf statt eines Intros —
            sie nimmt die Hemmschwelle vor dem ersten Kontakt. */}
        <Reveal className="w-full">
          <div className="w-full rounded-lg border border-line bg-paper-sunk/80 p-7 backdrop-blur-sm md:p-8">
            <p className="eyebrow">Was danach passiert</p>
            <ol className="mt-6 flex flex-col gap-5">
              {ablauf.map((schritt, i) => (
                <li key={schritt} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="font-mono text-eyebrow tracking-[0.12em] text-accent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-small text-ink-soft">{schritt}</span>
                </li>
              ))}
            </ol>

            <CtaWhatsApp className="mt-8 w-full justify-center">
              WhatsApp öffnen
            </CtaWhatsApp>
          </div>
        </Reveal>
      </SeitenHero>

      {/* Stammdaten als eigener Streifen unter dem Hero — im Hero hätten sie
          den Blick vom einen nächsten Schritt weggezogen. */}
      <section className="border-b border-line py-14 md:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <p className="max-w-[54ch] text-ink-soft lg:col-span-7">
              Es gibt hier bewusst kein Kontaktformular. Ein Formular ist eine
              Einbahnstraße mit Wartezeit — WhatsApp ist ein Gespräch. Sie
              schreiben, ich antworte, beide haben den Verlauf.
            </p>

            <dl className="grid gap-8 sm:grid-cols-2 lg:col-span-5">
              <div>
                <dt className="eyebrow">WhatsApp</dt>
                <dd className="mt-3 font-display text-h3">
                  {WHATSAPP_NUMMER_LESBAR}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Sitz</dt>
                {/* Ort und Zusatz in EIN dd — in einer dl darf der Gruppen-div
                    nur dt/dd enthalten, kein zusätzliches p. */}
                <dd className="mt-3">
                  <span className="font-display text-h3">
                    {site.adresse.ort}, {site.adresse.regionKurz}
                  </span>
                  <span className="mt-2 block text-small text-ink-soft">
                    Kunden im Ruhrgebiet treffe ich gern persönlich. Gearbeitet
                    wird ortsunabhängig — bundesweit.
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      {/* Direkteinstieg pro Leistung: die Erstnachricht ist dann schon passend gefüllt. */}
      <section className="bg-paper-sunk py-16 md:py-24">
        <Container>
          <Eyebrow>Direkt zum Thema</Eyebrow>
          <h2 className="mt-5 max-w-[24ch] text-h1 text-balance">
            Sie wissen schon, worum es geht?
          </h2>
          <p className="mt-5 max-w-[52ch] text-small text-ink-soft">
            Dann wählen Sie die passende Leistung — Ihre WhatsApp-Nachricht ist
            beim Öffnen bereits vorformuliert. Sie müssen nur noch absenden.
          </p>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    </>
  );
}
