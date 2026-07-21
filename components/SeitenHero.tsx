import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Peilkreis } from "./Peilkreis";
import { Container, Eyebrow, cx } from "./ui";

/**
 * Der Kopf jeder Unterseite — EIN Bauteil für alle.
 *
 * Vorher rollte jede Seite ihren eigenen Hero, entsprechend uneinheitlich
 * waren Abstände, Größen und Raster. Und weil die Signature nur auf der
 * Startseite lag, wirkten die Unterseiten tot: viel schwarze Fläche, nichts,
 * was den Blick hält.
 *
 * Jetzt: angeschnittene Peilrose plus ein einzelner Lichtschein hinter der
 * Überschrift, überall gleich aufgebaut. Die rechte Spalte trägt Intro,
 * Aktion und Beleg — sie steht auf der Grundlinie der Überschrift, damit
 * der CTA nicht im Nichts hängt.
 */
export function SeitenHero({
  eyebrow,
  titel,
  intro,
  aktion,
  beleg,
  breadcrumb,
  gross = false,
  children,
}: {
  eyebrow: string;
  titel: ReactNode;
  /** Rechte Spalte: der Einstiegsabsatz */
  intro?: ReactNode;
  /** Rechte Spalte: der primäre CTA */
  aktion?: ReactNode;
  /** Rechte Spalte: Beweis direkt neben der Aktion (echte Projekte) */
  beleg?: ReactNode;
  breadcrumb: { name: string; path: string }[];
  /** display-xl statt h1 — für Seiten, die als Auftritt gedacht sind */
  gross?: boolean;
  /** Ersetzt die rechte Spalte vollständig (z. B. auf /kontakt) */
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Motiv und Licht sitzen rechts oben. Auf schmalen Geräten laufen sie
          zwangsläufig hinter die Überschrift — das ist geprüft, nicht gehofft:
          am hellsten Punkt des Scheins liegt --ink bei 11,8:1 und --ink-soft
          bei 5,5:1, beides deutlich über AA. Wer den Schein kräftiger dreht,
          rechnet das neu nach. */}
      <Peilkreis className="-top-[22rem] -right-[16rem] size-[46rem] opacity-70 md:-top-[26rem] md:-right-[10rem] lg:size-[52rem]" />
      <div className="schein -top-40 right-0 size-[34rem] opacity-70 lg:right-[10rem]" />

      <Container className="relative py-12 md:py-16 lg:py-20">
        <Breadcrumbs trail={breadcrumb} />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1
              className={cx(
                "mt-6 text-balance",
                gross ? "text-display-xl" : "text-h1",
              )}
            >
              {titel}
            </h1>
          </div>

          <div className="flex flex-col items-start gap-7 lg:col-span-5 lg:self-end">
            {children ?? (
              <>
                {intro && (
                  <p className="max-w-[46ch] text-ink-soft">{intro}</p>
                )}
                {aktion}
                {beleg}
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
