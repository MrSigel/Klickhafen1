import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { FaqSektion } from "@/components/Faq";
import { HeroBeleg } from "@/components/HeroBeleg";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SeitenHero } from "@/components/SeitenHero";
import { ServiceCard } from "@/components/ServiceCard";
import { Container, CtaWhatsApp, Eyebrow } from "@/components/ui";
import { postsFuerLeistung } from "@/lib/blog";
import { referenzenFuerLeistung } from "@/lib/referenzen";
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  keywordsFuer,
  serviceSchema,
} from "@/lib/seo";
import { getRelated, getService, services } from "@/lib/services";

/** Alle sieben Leistungsseiten werden zur Buildzeit statisch erzeugt. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

/** Ein Slug außerhalb der Datenquelle ist eine 404 — keine leere Seite. */
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/leistungen/${service.slug}`,
    keywords: keywordsFuer(service.name, service.slug.replace(/-/g, " ")),
    // Eigenes opengraph-image.tsx pro Leistung — nicht überschreiben.
    hatEigenesOgBild: true,
  });
}

export default async function Leistungsseite({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const verwandte = getRelated(service);
  const belege = referenzenFuerLeistung(service.slug);
  const beitraege = postsFuerLeistung(service.slug);
  const pfad = `/leistungen/${service.slug}`;

  return (
    <>
      <JsonLd
        schema={[
          serviceSchema(service),
          faqSchema(service.faq),
          breadcrumbSchema([
            { name: "Leistungen", path: "/leistungen" },
            { name: service.name, path: pfad },
          ]),
        ]}
      />

      {/* Kopf — eigene H1 pro Seite, keine Wiederholung des Navigationslabels. */}
      <SeitenHero
        breadcrumb={[
          { name: "Leistungen", path: "/leistungen" },
          { name: service.name, path: pfad },
        ]}
        eyebrow={service.eyebrow}
        titel={service.h1}
        intro={service.intro}
        aktion={
          <CtaWhatsApp service={service.slug} serviceName={service.name}>
            {service.name} besprechen
          </CtaWhatsApp>
        }
        beleg={<HeroBeleg referenzen={belege} />}
      />

      {/* Regionaler Querverweis nur auf der Webdesign-Seite — kontextuelle
          interne Verlinkung zur lokalen Landingpage, kein Doorway. */}
      {service.slug === "webdesign" && (
        <div className="border-b border-line bg-paper-sunk">
          <Container className="py-4">
            <p className="text-small text-ink-soft">
              Sie suchen gezielt einen{" "}
              <Link
                href="/webdesign-castrop-rauxel"
                className="text-accent underline underline-offset-4 hover:text-accent-hover"
              >
                Webdesigner in Castrop-Rauxel und dem Ruhrgebiet
              </Link>
              ? Hier entlang.
            </p>
          </Container>
        </div>
      )}

      {/* Problem → Lösung, als echte Gegenüberstellung. */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-14 md:grid-cols-2 md:gap-12">
            <Reveal>
              <article>
                <Eyebrow>Ausgangslage</Eyebrow>
                <h2 className="mt-5 text-h2 text-balance">{service.problem.heading}</h2>
                <p className="mt-5 max-w-[54ch] text-ink-soft">{service.problem.body}</p>
                <ul className="mt-7 flex flex-col gap-3.5">
                  {service.problem.punkte.map((punkt) => (
                    <li key={punkt} className="flex gap-3.5 text-small text-ink-soft">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-4 flex-none bg-line"
                      />
                      {punkt}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="rounded-lg border border-line bg-paper-sunk p-8 md:p-10">
                <Eyebrow>Vorgehen</Eyebrow>
                <h2 className="mt-5 text-h2 text-balance">{service.loesung.heading}</h2>
                <p className="mt-5 max-w-[54ch] text-ink-soft">{service.loesung.body}</p>
                <ul className="mt-7 flex flex-col gap-3.5">
                  {service.loesung.punkte.map((punkt) => (
                    <li key={punkt} className="flex gap-3.5 text-small text-ink">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-4 flex-none bg-accent"
                      />
                      {punkt}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Ablauf — hier ist die Nummerierung keine Deko, sondern eine echte Reihenfolge. */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>Der Kurs</Eyebrow>
              <h2 className="mt-5 max-w-[16ch] text-h1 text-balance">
                So läuft es ab.
              </h2>
            </div>

            <ol className="flex flex-col md:col-span-8">
              {service.ablauf.map((schritt, i) => (
                <li key={schritt.titel}>
                  <Reveal delay={i * 0.05}>
                    <div className="grid gap-3 border-b border-line py-7 first:border-t sm:grid-cols-12 sm:gap-6">
                      <p className="font-mono text-eyebrow tracking-[0.12em] text-accent uppercase sm:col-span-3">
                        {String(i + 1).padStart(2, "0")} — {schritt.titel}
                      </p>
                      <p className="max-w-[54ch] text-small text-ink-soft sm:col-span-9">
                        {schritt.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Ergebnis */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <Eyebrow>Nach dem Auslaufen</Eyebrow>
                <h2 className="mt-5 text-h1 text-balance">
                  {service.ergebnis.heading}
                </h2>
                <p className="mt-5 max-w-[42ch] text-ink-soft">
                  {service.ergebnis.body}
                </p>
              </div>

              <ul className="grid gap-5 md:col-span-7 sm:grid-cols-3">
                {service.ergebnis.punkte.map((punkt) => (
                  <li
                    key={punkt}
                    className="rounded-lg border border-line p-6 text-small text-ink"
                  >
                    {punkt}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <FaqSektion
        faq={service.faq}
        ueberschrift={`${service.name} — häufige Fragen`}
      />

      {/* Beiträge zu dieser Leistung — interne Verlinkung in beide Richtungen
          und ein Weg für Besucher, die noch nicht anfragen wollen. */}
      {beitraege.length > 0 && (
        <section className="border-t border-line py-20 md:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow>Klartext</Eyebrow>
                <h2 className="mt-5 max-w-[18ch] text-h1 text-balance">
                  Noch nicht so weit?
                </h2>
                <p className="mt-6 max-w-[40ch] text-small text-ink-soft">
                  Dann lesen Sie erst. Diese Beiträge beantworten die Fragen, die
                  vor einer Entscheidung stehen — ausführlich und ohne Verkaufe.
                </p>
              </div>

              <ul className="flex flex-col lg:col-span-8">
                {beitraege.map((post, i) => (
                  <li key={post.slug}>
                    <Reveal delay={i * 0.05}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group grid gap-3 border-b border-line py-7 transition-colors first:border-t hover:border-accent md:grid-cols-12 md:items-baseline md:gap-6"
                      >
                        <p className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase transition-colors group-hover:text-accent md:col-span-3">
                          {post.lesezeit} Min
                        </p>
                        <h3 className="font-display text-h3 text-ink transition-colors group-hover:text-accent md:col-span-9">
                          {post.titel}
                        </h3>
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {/* Interne Verlinkung zu verwandten Leistungen. */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Passt dazu</Eyebrow>
              <h2 className="mt-5 text-h1 text-balance">Diese Kurse verlaufen parallel.</h2>
            </div>
            <Link
              href="/leistungen"
              className="text-small text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
            >
              Alle Leistungen ansehen
            </Link>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {verwandte.map((s, i) => (
              <li key={s.slug} className="h-full">
                <Reveal delay={i * 0.05} className="h-full">
                  <ServiceCard service={s} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        service={service.slug}
        serviceName={service.name}
        ueberschrift={`${service.name} für Ihr Projekt?`}
        text="Schreiben Sie mir kurz, worum es geht. Sie bekommen eine ehrliche Einschätzung — auch dann, wenn die Antwort lautet, dass Sie das nicht brauchen."
        label={`${service.name} anfragen`}
      />
    </>
  );
}
