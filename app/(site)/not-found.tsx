import { AnkerFallback } from "@/components/hero/AnkerFallback";
import { Container, Eyebrow, LinkButton } from "@/components/ui";

export default function NichtGefunden() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>Fehler 404</Eyebrow>
            <h1 className="mt-6 text-h1 text-balance">
              Diese Seite liegt nicht in unserem Hafen.
            </h1>
            <p className="mt-6 max-w-[48ch] text-ink-soft">
              Vermutlich hat sich die Adresse geändert oder ein Zeichen ist auf dem
              Weg verloren gegangen. Zurück auf einen bekannten Kurs:
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <LinkButton href="/">Zur Startseite</LinkButton>
              <LinkButton href="/leistungen">Zu den Leistungen</LinkButton>
            </div>
          </div>

          <div className="opacity-40 md:col-span-5">
            <AnkerFallback />
          </div>
        </div>
      </Container>
    </section>
  );
}
