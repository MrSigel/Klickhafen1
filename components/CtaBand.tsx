import { WHATSAPP_NUMMER_LESBAR } from "@/lib/whatsapp";
import { Container, CtaWhatsApp, Eyebrow } from "./ui";
import { Reveal } from "./Reveal";

/**
 * Der Abschluss-CTA. Ein primärer Weg, kein zweiter Button daneben —
 * jede Alternative daneben kostet Conversion.
 */
export function CtaBand({
  service,
  serviceName,
  ueberschrift = "Machen wir Ihr Projekt startklar.",
  text = "Eine Nachricht genügt. Sie schreiben, worum es geht — ich sage Ihnen ehrlich, ob und wie ich helfen kann. Kein Formular, keine Warteschleife.",
  label = "Projekt besprechen",
}: {
  service?: string;
  serviceName?: string;
  ueberschrift?: string;
  text?: string;
  label?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-line bg-paper-deep py-20 md:py-28">
      {/* Ein einziger Lichtschein, tief hinter dem CTA — der einzige Ort
          neben dem Hero, an dem die Seite überhaupt leuchtet. */}
      <div className="schein bottom-[-14rem] left-1/2 size-[40rem] -translate-x-1/2" />

      <Container className="relative">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>Anlegen</Eyebrow>
              <h2 className="mt-5 text-h1 text-balance">{ueberschrift}</h2>
              <p className="mt-5 max-w-[54ch] text-ink-soft">{text}</p>
            </div>

            <div className="flex flex-col items-start gap-4 md:col-span-5 md:items-end">
              <CtaWhatsApp service={service} serviceName={serviceName}>
                {label}
              </CtaWhatsApp>
              <p className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
                {WHATSAPP_NUMMER_LESBAR}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
