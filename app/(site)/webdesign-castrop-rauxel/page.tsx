import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqSektion } from "@/components/Faq";
import { HeroBeleg } from "@/components/HeroBeleg";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SeitenHero } from "@/components/SeitenHero";
import { ServiceCard } from "@/components/ServiceCard";
import { Container, CtaWhatsApp, Eyebrow } from "@/components/ui";
import { lokalFaq, nachbarorte, stadtteile } from "@/lib/lokal";
import { referenzen } from "@/lib/referenzen";
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  keywordsFuer,
  lokalServiceSchema,
} from "@/lib/seo";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";

const PFAD = "/webdesign-castrop-rauxel";
const ORT = site.adresse.ort;

export const metadata: Metadata = buildMetadata({
  title: "Webdesign Castrop-Rauxel — Webagentur vor Ort",
  description:
    "Webdesign, Webentwicklung und SEO aus Castrop-Rauxel: Klickhafen ist Ihre Webagentur vor Ort im Ruhrgebiet. Persönlich erreichbar, Festpreis, Kontakt per WhatsApp.",
  path: PFAD,
  keywords: keywordsFuer(
    "Webdesign Castrop-Rauxel",
    "Webagentur Castrop-Rauxel",
    "Webdesigner Ruhrgebiet",
    "Homepage erstellen Castrop-Rauxel",
  ),
});

/** Zwei Leistungen, die lokal am häufigsten gefragt sind — verlinkt. */
const lokalLeistungen = ["webdesign", "seo-aeo-geo-cro", "baukasten-loesungen"]
  .map((s) => getService(s))
  .filter((s) => s !== undefined);

export default function WebdesignCastropRauxel() {
  return (
    <>
      <JsonLd
        schema={[
          lokalServiceSchema({
            name: "Webdesign Castrop-Rauxel",
            description:
              "Webdesign, Webentwicklung und SEO für Betriebe in Castrop-Rauxel und im Ruhrgebiet — von Klickhafen, Webagentur mit Sitz in Castrop-Rauxel.",
            path: PFAD,
            orte: [ORT, ...nachbarorte],
          }),
          faqSchema(lokalFaq),
          breadcrumbSchema([{ name: "Webdesign Castrop-Rauxel", path: PFAD }]),
        ]}
      />

      <SeitenHero
        breadcrumb={[{ name: "Webdesign Castrop-Rauxel", path: PFAD }]}
        eyebrow={`${ORT} · Ruhrgebiet`}
        titel={
          <>
            Webdesign in Castrop-Rauxel — von jemandem, den Sie erreichen.
          </>
        }
        intro={`Klickhafen ist Ihre Webagentur mit Sitz in ${ORT}: Webdesign, Webentwicklung, SEO und Automationen für lokale Betriebe im Ruhrgebiet. Persönlich vor Ort erreichbar, Kontakt direkt per WhatsApp, Festpreis nach einem kurzen Gespräch.`}
        aktion={<CtaWhatsApp>Projekt in {ORT} besprechen</CtaWhatsApp>}
        beleg={<HeroBeleg referenzen={referenzen} />}
      />

      {/* Lokaler Kern: warum Nähe zählt. Eigenständiger Inhalt, keine Kopie
          der Webdesign-Leistungsseite. */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Warum aus der Region</Eyebrow>
              <h2 className="mt-5 max-w-[18ch] text-h1 text-balance">
                Kurze Wege schlagen große Namen.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="flex max-w-[62ch] flex-col gap-5 text-ink-soft">
                <p>
                  Wer in {ORT} oder im Ruhrgebiet einen Webdesigner sucht, sucht
                  selten den größten — sondern jemanden, der erreichbar ist,
                  schnell antwortet und die Region kennt. Genau das ist der
                  Vorteil einer Agentur vor Ort: Sie sprechen mit der Person, die
                  auch baut. Kein Ticketsystem, keine Weiterreichung durch drei
                  Abteilungen.
                </p>
                <p className="text-ink">
                  Klickhafen sitzt in {ORT}, Gerther Straße 76. Kunden aus der
                  Stadt und dem direkten Umfeld treffe ich gern persönlich —
                  notwendig ist es nicht, der Großteil der Arbeit läuft
                  ortsunabhängig. Sie entscheiden, was Ihnen lieber ist.
                </p>
                <p>
                  Von hier aus arbeite ich für Betriebe in {ORT} und den
                  Nachbarstädten — {nachbarorte.slice(0, 5).join(", ")} und dem
                  übrigen Ruhrgebiet — sowie über die Ferne bundesweit. Der Sitz
                  ist lokal, die Reichweite ist es nicht.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Leistungen lokal — verlinkt auf die vollen Leistungsseiten. */}
      <section className="border-b border-line bg-paper-sunk py-20 md:py-28">
        <Container>
          <Eyebrow>Vor Ort gefragt</Eyebrow>
          <h2 className="mt-5 max-w-[24ch] text-h1 text-balance">
            Was lokale Betriebe am häufigsten brauchen.
          </h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lokalLeistungen.map((s, i) => (
              <li key={s.slug} className="h-full">
                <Reveal delay={i * 0.05} className="h-full">
                  <ServiceCard service={s} />
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-small text-ink-soft">
            Dazu kommen{" "}
            <Link
              href="/leistungen"
              className="text-accent underline underline-offset-4 hover:text-accent-hover"
            >
              alle weiteren Leistungen
            </Link>{" "}
            — von der Webentwicklung bis zur Automatisierung.
          </p>
        </Container>
      </section>

      {/* Einzugsgebiet — echte Orte, als Text (keine Doorway-Seiten). */}
      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Einzugsgebiet</Eyebrow>
              <h2 className="mt-5 text-h2 text-balance">
                In {ORT} zu Hause, im Ruhrgebiet unterwegs.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-ink-soft">
                Vertreten in allen Stadtteilen von {ORT} —{" "}
                {stadtteile.join(", ")} — und für Kunden in den umliegenden
                Städten:
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {nachbarorte.map((ort) => (
                  <li
                    key={ort}
                    className="rounded-md border border-line px-3 py-1.5 font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase"
                  >
                    {ort}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <FaqSektion faq={lokalFaq} ueberschrift={`Webdesign in ${ORT} — häufige Fragen`} />

      <CtaBand
        ueberschrift={`Ihr Projekt in ${ORT}?`}
        text="Schreiben Sie mir kurz, worum es geht. Sie bekommen eine ehrliche Einschätzung und einen Festpreis — von jemandem aus der Region, den Sie direkt erreichen."
        label="Jetzt schreiben"
      />
    </>
  );
}
