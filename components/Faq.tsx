import type { Faq as FaqItem } from "@/lib/services";
import { FaqEintrag } from "./FaqEintrag";
import { Container, Eyebrow } from "./ui";

/**
 * FAQ-Sektion. Die Sektion selbst bleibt server-gerendert (der Antworttext
 * steht damit garantiert im initialen HTML — der AEO/GEO-Punkt); nur die
 * einzelne aufklappbare Zeile ist als FaqEintrag ein Client-Baustein mit
 * weicher Höhenanimation.
 */
export function FaqSektion({
  faq,
  ueberschrift = "Häufige Fragen",
}: {
  faq: FaqItem[];
  ueberschrift?: string;
}) {
  return (
    <section className="border-t border-line bg-paper-sunk py-20 md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Klartext</Eyebrow>
            <h2 className="mt-5 text-h1 text-balance">{ueberschrift}</h2>
          </div>

          <div className="md:col-span-8">
            {/* Direkt <dl> → FaqEintrag: kein Wrapper dazwischen, sonst wird
                die Definitionsliste ungültig (siehe Kommentar im Eintrag). */}
            <dl>
              {faq.map((item, i) => (
                <FaqEintrag key={item.frage} item={item} delay={i * 0.04} />
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
