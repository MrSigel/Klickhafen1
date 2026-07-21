import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SeitenHero } from "@/components/SeitenHero";
import { ArrowRight, Container } from "@/components/ui";
import { postsNachDatum } from "@/lib/blog";
import { blogSchema, breadcrumbSchema, buildMetadata, keywordsFuer } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Klartext — Beiträge zu Web, SEO und Automation",
  description:
    "Was kostet eine Website? Was unterscheidet SEO von AEO und GEO? Wann lohnt sich eine Automation? Fachbeiträge ohne Buzzword-Bingo von Klickhafen.",
  path: "/blog",
  keywords: keywordsFuer("Blog", "Ratgeber", "Website Kosten", "SEO erklärt"),
  rss: true,
});

export default function BlogUebersicht() {
  const alle = postsNachDatum();

  return (
    <>
      <JsonLd
        schema={[
          blogSchema(alle),
          breadcrumbSchema([{ name: "Blog", path: "/blog" }]),
        ]}
      />

      <SeitenHero
        breadcrumb={[{ name: "Blog", path: "/blog" }]}
        eyebrow="Klartext"
        titel={
          <>
            Antworten,
            <br />
            keine Andeutungen.
          </>
        }
        gross
        intro="Die Fragen, die mir wirklich gestellt werden — hier einmal ausführlich beantwortet. Ohne Buzzword-Bingo, ohne erfundene Zahlen, und mit der Antwort gleich im ersten Absatz statt im letzten."
      />

      <section className="py-16 md:py-24">
        <Container>
          <ul className="flex flex-col">
            {alle.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={i * 0.04}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-4 border-b border-line py-9 transition-colors first:border-t hover:border-accent lg:grid-cols-12 lg:gap-8"
                  >
                    <div className="flex items-baseline gap-4 lg:col-span-3 lg:flex-col lg:gap-2">
                      <p className="font-mono text-eyebrow tracking-[0.12em] text-accent uppercase">
                        {post.kategorie}
                      </p>
                      <p className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
                        {post.lesezeit} Min
                      </p>
                    </div>

                    <div className="lg:col-span-8">
                      <h2 className="max-w-[26ch] text-h2 text-balance text-ink transition-colors group-hover:text-accent">
                        {post.titel}
                      </h2>
                      {/* Die Kurzantwort ist auch hier der Anreißer — sie sagt
                          mehr als jede Marketing-Zeile und ist bereits die
                          halbe Antwort. */}
                      <p className="mt-4 max-w-[62ch] text-ink-soft">
                        {post.kurzantwort}
                      </p>
                    </div>

                    <span className="flex text-ink-faint transition-colors group-hover:text-accent lg:col-span-1 lg:justify-end">
                      <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        ueberschrift="Ihre Frage steht nicht dabei?"
        text="Dann stellen Sie sie mir direkt. Eine kurze Nachricht genügt — Sie bekommen eine ehrliche Antwort, auch wenn sie lautet, dass Sie das nicht brauchen."
        label="Frage stellen"
      />
    </>
  );
}
