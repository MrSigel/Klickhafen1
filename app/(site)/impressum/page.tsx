import type { Metadata } from "next";
import { RechtAbschnitt, RechtSeite } from "@/components/RechtSeite";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { WHATSAPP_NUMMER_LESBAR } from "@/lib/whatsapp";

/**
 * Die Pflichtangaben sind gefüllt, deshalb ist die Seite jetzt indexierbar:
 * Ein vollständiges Impressum ist in Deutschland ein Vertrauens- und
 * E-E-A-T-Signal, kein Ballast.
 */
export const metadata: Metadata = buildMetadata({
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von Klickhafen, Enrico Gross, Castrop-Rauxel.",
  path: "/impressum",
});

const name = `${site.person.vorname} ${site.person.nachname}`;

export default function ImpressumSeite() {
  return (
    <RechtSeite titel="Impressum" pfad="/impressum">
      <RechtAbschnitt ueberschrift="Angaben gemäß § 5 DDG">
        <p>{name}</p>
        <p>Klickhafen (Einzelunternehmen)</p>
        <p>{site.adresse.strasse}</p>
        <p>
          {site.adresse.plz} {site.adresse.ort}
        </p>
        <p>Deutschland</p>
      </RechtAbschnitt>

      <RechtAbschnitt ueberschrift="Kontakt">
        <p>Telefon / WhatsApp: {WHATSAPP_NUMMER_LESBAR}</p>
        <p>E-Mail: {site.email}</p>
      </RechtAbschnitt>

      <RechtAbschnitt ueberschrift="Umsatzsteuer">
        <p>
          Gemäß § 19 UStG wird keine Umsatzsteuer berechnet
          (Kleinunternehmerregelung). Es wird daher keine
          Umsatzsteuer-Identifikationsnummer geführt.
        </p>
      </RechtAbschnitt>

      <RechtAbschnitt ueberschrift="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>{name}</p>
        <p>{site.adresse.strasse}</p>
        <p>
          {site.adresse.plz} {site.adresse.ort}
        </p>
      </RechtAbschnitt>

      <RechtAbschnitt ueberschrift="Streitschlichtung">
        <p>
          Ich bin nicht bereit und nicht verpflichtet, an
          Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </RechtAbschnitt>

      <RechtAbschnitt ueberschrift="Haftung für Inhalte und Links">
        <p>
          Die Inhalte dieser Seiten wurden mit Sorgfalt erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch
          keine Gewähr übernommen werden.
        </p>
        <p>
          Diese Website verweist auf externe Websites Dritter, auf deren Inhalte
          kein Einfluss besteht. Für diese fremden Inhalte ist stets der
          jeweilige Anbieter oder Betreiber verantwortlich.
        </p>
      </RechtAbschnitt>
    </RechtSeite>
  );
}
