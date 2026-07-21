import type { ReactNode } from "react";
import { SeitenHero } from "./SeitenHero";
import { Container } from "./ui";

/**
 * Gemeinsames Gerüst für Impressum und Datenschutz.
 *
 * `stand` ist optional und rendert eine dezente „Stand: …"-Zeile — kein
 * alarmierender Platzhalter-Kasten mehr (die Seiten sind befüllt und live).
 */
export function RechtSeite({
  titel,
  pfad,
  stand,
  children,
}: {
  titel: string;
  pfad: string;
  stand?: string;
  children: ReactNode;
}) {
  return (
    <>
      <SeitenHero
        breadcrumb={[{ name: titel, path: pfad }]}
        eyebrow="Rechtliches"
        titel={titel}
      >
        {stand ? (
          <p className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
            Stand: {stand}
          </p>
        ) : null}
      </SeitenHero>

      <section className="py-14 md:py-20">
        <Container>
          <div className="flex max-w-[68ch] flex-col gap-8 text-ink-soft">
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}

/** Ein Abschnitt innerhalb einer Rechtsseite. */
export function RechtAbschnitt({
  ueberschrift,
  children,
}: {
  ueberschrift: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-h3 font-display text-ink">{ueberschrift}</h2>
      <div className="mt-3 flex flex-col gap-2 text-small">{children}</div>
    </section>
  );
}
