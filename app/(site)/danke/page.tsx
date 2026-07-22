import type { Metadata } from "next";
import { Container, CtaWhatsApp, Eyebrow, LinkButton } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";

/**
 * Bestätigungsseite nach der WhatsApp-Kontaktaufnahme. Dient zugleich als
 * Conversion-Ziel der Google-Ads-Kampagne (in der Kampagne als „Danke"-Seite
 * hinterlegt). noindex — sie gehört in keinen Suchindex, nur in den Funnel.
 * Der WhatsApp-Chat ist beim Aufruf bereits in einem neuen Tab offen
 * (siehe components/WaConversion.tsx); hier steht der Fallback zum erneuten
 * Öffnen.
 */
export const metadata: Metadata = buildMetadata({
  title: "Danke — Ihre Anfrage bei Klickhafen",
  description:
    "Ihr WhatsApp-Chat mit Klickhafen ist geöffnet. Antwort meist am selben Werktag.",
  path: "/danke",
  noIndex: true,
});

export default function DankeSeite() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-24">
      <div className="max-w-[46rem]">
        <Eyebrow>Anfrage</Eyebrow>
        <h1 className="mt-4 font-display text-h1">Danke — Ihr Chat ist offen.</h1>
        <p className="mt-6 max-w-[54ch] text-body text-ink-soft">
          Ihr WhatsApp-Chat mit Klickhafen hat sich in einem neuen Tab geöffnet.
          Schreiben Sie mir dort kurz, worum es geht — ich antworte meist noch am
          selben Werktag und Sie bekommen ein konkretes Festpreisangebot.
        </p>
        <p className="mt-4 max-w-[54ch] text-small text-ink-faint">
          Kein Chat aufgegangen? Hier erneut öffnen:
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <CtaWhatsApp>WhatsApp öffnen</CtaWhatsApp>
          <LinkButton href="/">Zurück zur Startseite</LinkButton>
        </div>
      </div>
    </Container>
  );
}
