import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogBody } from "@/components/BlogBody";
import { CtaBand } from "@/components/CtaBand";
import { FaqSektion } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SeitenHero } from "@/components/SeitenHero";
import { ServiceCard } from "@/components/ServiceCard";
import { Container, Eyebrow } from "@/components/ui";
import { getPost, posts, verwandtePosts } from "@/lib/blog";
import {
  blogPostingSchema,
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  keywordsFuer,
} from "@/lib/seo";
import { getService } from "@/lib/services";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

/** Ein Slug außerhalb der Datenquelle ist eine 404, keine leere Seite. */
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const meta = buildMetadata({
    title: post.title,
    description: post.beschreibung,
    path: `/blog/${post.slug}`,
    keywords: keywordsFuer(post.kategorie, ...post.leistungen),
    rss: true,
    // Eigenes opengraph-image.tsx pro Beitrag — nicht überschreiben.
    hatEigenesOgBild: true,
  });

  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: post.datum,
      modifiedTime: post.aktualisiert ?? post.datum,
      authors: ["Klickhafen"],
      section: post.kategorie,
    },
  };
}

/** Deutsches Datum, deterministisch — kein toLocaleDateString auf dem Server. */
const MONATE = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];
function datumLang(iso: string) {
  const [j, m, t] = iso.split("-");
  return `${Number(t)}. ${MONATE[Number(m) - 1]} ${j}`;
}

export default async function BlogBeitrag({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const pfad = `/blog/${post.slug}`;
  const verwandt = verwandtePosts(post);
  const leistungen = post.leistungen
    .map((s) => getService(s))
    .filter((s) => s !== undefined);
  const hauptLeistung = leistungen[0];

  return (
    <>
      <JsonLd
        schema={[
          blogPostingSchema(post),
          faqSchema(post.faq),
          breadcrumbSchema([
            { name: "Blog", path: "/blog" },
            { name: post.titel, path: pfad },
          ]),
        ]}
      />

      <SeitenHero
        breadcrumb={[
          { name: "Blog", path: "/blog" },
          { name: post.titel, path: pfad },
        ]}
        eyebrow={post.kategorie}
        titel={post.titel}
      >
        {/* Die Kurzantwort steht bewusst GANZ OBEN und optisch abgesetzt.
            Das ist der AEO/GEO-Kern: Antwortmaschinen ziehen den Absatz, der
            die Frage direkt beantwortet. Wer die Antwort in Absatz sieben
            versteckt, wird nicht zitiert. */}
        <div className="w-full rounded-lg border border-accent/40 bg-paper-sunk/80 p-6 backdrop-blur-sm md:p-7">
          <p className="eyebrow">Kurz beantwortet</p>
          {/* class="kurzantwort" ist der Anker für Speakable im BlogPosting-
              Schema — der Absatz, den ein Sprachassistent vorlesen soll. */}
          <p className="kurzantwort mt-4 text-ink">{post.kurzantwort}</p>
        </div>

        <dl className="flex flex-wrap gap-x-8 gap-y-2">
          <div className="flex items-baseline gap-2">
            <dt className="eyebrow">Stand</dt>
            <dd className="text-small text-ink-soft">
              <time dateTime={post.aktualisiert ?? post.datum}>
                {datumLang(post.aktualisiert ?? post.datum)}
              </time>
            </dd>
          </div>
          <div className="flex items-baseline gap-2">
            <dt className="eyebrow">Lesezeit</dt>
            <dd className="text-small text-ink-soft">{post.lesezeit} Minuten</dd>
          </div>
        </dl>
      </SeitenHero>

      <article className="border-b border-line py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Linke Spalte: der Bezug zu den Leistungen. Interne Verlinkung
                gehört neben den Text, nicht nur ans Ende. */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow">Passende Leistung</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {leistungen.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/leistungen/${s.slug}`}
                        className="text-small text-ink-soft transition-colors hover:text-accent"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <BlogBody blocks={post.blocks} />
            </div>
          </div>
        </Container>
      </article>

      <FaqSektion faq={post.faq} ueberschrift="Noch offene Fragen" />

      {verwandt.length > 0 && (
        <section className="border-t border-line py-20 md:py-28">
          <Container>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>Weiterlesen</Eyebrow>
                <h2 className="mt-5 text-h1 text-balance">Passt zum Thema.</h2>
              </div>
              <Link
                href="/blog"
                className="text-small text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
              >
                Alle Beiträge ansehen
              </Link>
            </div>

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {verwandt.map((p, i) => (
                <li key={p.slug} className="h-full">
                  <Reveal delay={i * 0.05} className="h-full">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex h-full flex-col justify-between gap-8 rounded-lg border border-line bg-paper-sunk p-7 transition-colors duration-300 hover:border-accent hover:bg-paper-lift"
                    >
                      <div>
                        <p className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
                          {p.kategorie}
                        </p>
                        <h3 className="mt-3 font-display text-h3 text-ink transition-colors group-hover:text-accent">
                          {p.titel}
                        </h3>
                      </div>
                      <p className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
                        {p.lesezeit} Min
                      </p>
                    </Link>
                  </Reveal>
                </li>
              ))}
              {hauptLeistung && (
                <li className="h-full">
                  <Reveal delay={0.1} className="h-full">
                    <ServiceCard service={hauptLeistung} />
                  </Reveal>
                </li>
              )}
            </ul>
          </Container>
        </section>
      )}

      <CtaBand
        service={hauptLeistung?.slug}
        serviceName={hauptLeistung?.name}
        ueberschrift="Gilt das auch für Ihren Fall?"
        text="Der Beitrag ist allgemein — Ihr Projekt ist es nicht. Schreiben Sie mir kurz, worum es geht, und Sie bekommen eine Einschätzung, die zu Ihrer Lage passt."
        label="Kurz einschätzen lassen"
      />
    </>
  );
}
