import Image from "next/image";
import Link from "next/link";
import { AnkerSignature } from "@/components/hero/AnkerSignature";
import { CtaBand } from "@/components/CtaBand";
import { FaqSektion } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import {
  ArrowRight,
  ArrowUpRight,
  Container,
  CtaWhatsApp,
  Eyebrow,
} from "@/components/ui";
import { postsNachDatum } from "@/lib/blog";
import { startFaq } from "@/lib/faq";
import { referenzen } from "@/lib/referenzen";
import { faqSchema } from "@/lib/seo";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function Startseite() {
  return (
    <>
      {/* Die Startseite ist die meistverlinkte Seite und hatte bisher kein
          FAQPage-Schema — die größte AEO-Lücke der Website. Organization,
          LocalBusiness, WebSite und Person liegen bereits im Layout. */}
      <JsonLd schema={faqSchema(startFaq)} />
      {/* ---------------------------------------------------------------
          Hero.
          Die vorherige Fassung öffnete mit „Jedes Projekt braucht einen
          Hafen" — schön, aber ein generischer Claim: Wer eine Website
          braucht, erfuhr daraus nicht, was er bekommt. Der Hausstil verlangt
          ausdrücklich das Gegenteil ("öffne mit dem konkretesten Element").
          Deshalb jetzt: konkretes Versprechen, drei Fakten gegen die drei
          Einwände, und echter Beleg — die vier Kundenseiten sind das
          Konkreteste, was es gibt. Die Metapher lebt in den Eyebrows und auf
          /philosophie weiter, sie trägt aber nicht mehr den Verkauf.
          --------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-line">
        {/* Der einzige Lichtschein oben: liegt hinter dem Anker, nicht hinter
            der Schrift — sonst frisst er den Kontrast. */}
        <div className="schein top-[-6rem] right-[-6rem] size-[40rem] lg:right-[6rem]" />

        <Container className="relative pt-10 pb-0 md:pt-14 lg:pt-16">
          {/* Mobile ist die Reihenfolge bewusst anders als im DOM: Text →
              Beleg → Signature. Nachgemessen schob der Anker (quadratisch,
              volle Breite) den Beleg sonst auf 1101px — weit unter die Falz.
              Beweis schlägt Atmosphäre. Ab lg räumt order-none wieder auf. */}
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-7">
              <Eyebrow>Castrop-Rauxel · Ruhrgebiet · bundesweit</Eyebrow>

              <h1 className="mt-5 text-display-xl text-balance">
                Websites, die gefunden werden — bei Google und in KI-Antworten.
              </h1>

              <p className="mt-6 max-w-[54ch] text-lg text-ink-soft">
                Webdesign, Entwicklung, Funnels und Automationen. Von der
                einfachen Landingpage bis zum komplexen Browsergame — alles
                gebaut von einer Person, die Sie direkt erreichen. Kein Team,
                das Sie durchreicht, kein Formular, das Sie warten lässt.
              </p>

              {/* Nur EIN Button. Der zweite hieß „Arbeiten ansehen" und führte
                  nach /referenzen — exakt dorthin, wohin der Beleg-Streifen
                  direkt darunter führt, nur ohne dessen Beweis. Doppelt, und
                  auf 360px-Geräten brach er um und schob den Beleg unter die
                  Falz. Ein primärer Weg pro Sektion. */}
              <div className="mt-8">
                <CtaWhatsApp>Projekt besprechen</CtaWhatsApp>
              </div>
            </div>

            <div className="order-3 flex justify-center lg:order-none lg:col-span-5 lg:justify-end">
              <AnkerSignature />
            </div>

            {/* Beleg direkt unter dem CTA — nachgemessen: so liegt er auf
                jedem Gerät über der Falzlinie. Vier echte, live nachprüfbare
                Kundenseiten sind das stärkste Signal der Seite; darunter wäre
                es verschenkt. Eine Zeile, kompakt, keine Kacheln. */}
            <Link
              href="/referenzen"
              className="group order-2 flex flex-col gap-3 border-t border-line py-5 sm:flex-row sm:items-center sm:gap-8 lg:order-none lg:col-span-12 lg:mt-1"
            >
              <p className="eyebrow flex-none">Zuletzt gebaut</p>
              <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
                {referenzen.map((r) => (
                  <li
                    key={r.slug}
                    className="font-mono text-small text-ink-soft transition-colors group-hover:text-ink"
                  >
                    {r.domain}
                  </li>
                ))}
              </ul>
              <span className="flex flex-none items-center gap-2 font-mono text-eyebrow tracking-[0.12em] text-accent uppercase sm:ml-auto">
                Alle ansehen
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </Container>

        {/* Fakten-Leiste: beantwortet die drei Einwände, die vor jedem Auftrag
            stehen — Preis, Erreichbarkeit, Abhängigkeit. Als abgesetzte Fläche
            der Sockel des Heros. */}
        <div className="border-t border-line bg-paper-sunk">
          <Container>
            <dl className="grid sm:grid-cols-3">
              {site.fakten.map((fakt) => (
                <div
                  key={fakt.label}
                  className="border-b border-line py-6 last:border-b-0 sm:border-b-0 sm:border-l sm:py-7 sm:pr-6 sm:pl-7 sm:first:border-l-0 sm:first:pl-0"
                >
                  <dt className="eyebrow">{fakt.label}</dt>
                  {/* Wert und Erläuterung gehören in EIN <dd>: In einer <dl>
                      darf der Gruppen-div nur dt und dd enthalten, kein <p>. */}
                  <dd className="mt-3">
                    <span className="font-display text-h3 text-ink">
                      {fakt.wert}
                    </span>
                    <span className="mt-2 block max-w-[34ch] text-small text-ink-soft">
                      {fakt.text}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Beweis zuerst — echte, live erreichbare Projekte direkt unter
          dem Hero. Trust vor Erklärung, nicht umgekehrt.
          --------------------------------------------------------------- */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Im Logbuch</Eyebrow>
              <h2 className="mt-5 max-w-[20ch] text-h1 text-balance">
                Vier Branchen. Vier Aufgaben. Alle live.
              </h2>
            </div>
            <Link
              href="/referenzen"
              className="text-small text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
            >
              Alle Referenzen ansehen
            </Link>
          </div>

          {/* Echte Screenshots statt einer Textliste: Auf einer Beweis-Sektion
              schlägt ein Bild jede Beschreibung. Die Bilder sind Aufnahmen der
              Live-Seiten, keine Montagen. */}
          <ul className="mt-14 grid gap-5 sm:grid-cols-2">
            {referenzen.map((referenz, i) => (
              <li key={referenz.slug} className="h-full">
                <Reveal delay={i * 0.05} className="h-full">
                  <a
                    href={referenz.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${referenz.name} in neuem Tab öffnen (${referenz.domain})`}
                    className="group flex h-full flex-col overflow-hidden rounded-lg border border-line transition-colors duration-300 hover:border-accent"
                  >
                    <div className="relative aspect-16/10 overflow-hidden bg-paper-deep">
                      {referenz.bild && (
                        <Image
                          src={`/referenzen/${referenz.bild}`}
                          alt={`Startseite von ${referenz.name} — ${referenz.branche}`}
                          width={1600}
                          height={1000}
                          sizes="(max-width: 640px) 100vw, 45vw"
                          className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      )}
                    </div>

                    <div className="flex flex-1 items-start justify-between gap-4 bg-paper-sunk p-6 transition-colors duration-300 group-hover:bg-paper-lift">
                      <div>
                        <h3 className="font-display text-h3 text-ink transition-colors group-hover:text-accent">
                          {referenz.name}
                        </h3>
                        <p className="mt-1.5 text-small text-ink-soft">
                          {referenz.branche}
                        </p>
                        <p className="mt-3 font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
                          {referenz.domain}
                        </p>
                      </div>
                      <ArrowUpRight className="mt-1 text-ink-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                    </div>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Philosophie — verdichtet, mit Weg zur ausführlichen Seite.
          --------------------------------------------------------------- */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Woher der Name kommt</Eyebrow>
            </div>

            <div className="lg:col-span-8">
              <Reveal>
                <h2 className="text-h1 text-balance">
                  Aus einem Wunsch wurde eine Werft.
                </h2>

                <div className="mt-7 flex max-w-[62ch] flex-col gap-5 text-ink-soft">
                  <p>
                    Klickhafen entstand aus einem einzigen Wunsch: mich mit
                    Webdesign und Webentwicklung selbstständig zu machen. Die ersten
                    Projekte begannen mit einer einfachen Landingpage — und reichten
                    bis zu einem komplexen Browsergame.
                  </p>
                  <p>
                    Dazwischen liegt alles, was ein Webprojekt fordern kann:
                    Automationen, die Prozesse übernehmen. Websites, die in
                    Suchmaschinen und KI-Antworten gefunden werden. Funnels, die aus
                    Aufmerksamkeit Aufträge machen. Individuelle Lösungen für alles,
                    wofür es kein fertiges Produkt gibt.
                  </p>
                  <p className="text-ink">
                    Der Name ist das Bild: ein Hafen für alles, was mit Web zu tun
                    hat. Der Ort, an dem Projekte anlegen, ausgerüstet werden und
                    wieder auslaufen — seetüchtig.
                  </p>
                </div>

                <Link
                  href="/philosophie"
                  className="mt-8 inline-flex items-center gap-2 text-small text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
                >
                  Die ganze Geschichte lesen
                </Link>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Leistungen — aus lib/services.ts, eine Quelle für alles.
          --------------------------------------------------------------- */}
      <section className="border-b border-line bg-paper-sunk py-20 md:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Ausrüstung</Eyebrow>
              <h2 className="mt-5 max-w-[18ch] text-h1 text-balance">
                Alles, was Ihr Projekt seetüchtig macht.
              </h2>
            </div>
            <p className="max-w-[38ch] text-small text-ink-soft">
              Sieben Leistungen, die einzeln funktionieren und zusammen mehr
              ergeben. Jede mit klarem Ablauf und ehrlicher Einschätzung, ob sie
              sich für Sie rechnet.
            </p>
          </div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      {/* ---------------------------------------------------------------
          Klartext — ein Weg für alle, die noch nicht anfragen wollen.
          Der Anreißer ist die Kurzantwort selbst, keine Werbezeile.
          --------------------------------------------------------------- */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Klartext</Eyebrow>
              <h2 className="mt-5 max-w-[20ch] text-h1 text-balance">
                Erst lesen, dann entscheiden.
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-small text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
            >
              Alle Beiträge ansehen
            </Link>
          </div>

          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {postsNachDatum()
              .slice(0, 3)
              .map((post, i) => (
                <li key={post.slug} className="h-full">
                  <Reveal delay={i * 0.05} className="h-full">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col justify-between gap-8 rounded-lg border border-line bg-paper-sunk p-7 transition-colors duration-300 hover:border-accent hover:bg-paper-lift"
                    >
                      <div>
                        <p className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
                          {post.kategorie}
                        </p>
                        <h3 className="mt-3 font-display text-h3 text-ink transition-colors group-hover:text-accent">
                          {post.titel}
                        </h3>
                        <p className="mt-3 line-clamp-4 text-small text-ink-soft">
                          {post.kurzantwort}
                        </p>
                      </div>
                      <span className="flex items-center gap-2 font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase transition-colors group-hover:text-accent">
                        {post.lesezeit} Min lesen
                        <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
          </ul>
        </Container>
      </section>

      <FaqSektion
        faq={startFaq}
        ueberschrift="Das fragen mich fast alle zuerst."
      />

      <CtaBand />
    </>
  );
}
