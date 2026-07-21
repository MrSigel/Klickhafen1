import type { Metadata } from "next";
import { RechtAbschnitt, RechtSeite } from "@/components/RechtSeite";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { WHATSAPP_NUMMER_LESBAR } from "@/lib/whatsapp";

/**
 * Datenschutzerklärung — beschreibt EXAKT, was diese Website tut (verifiziert):
 * Hosting bei Vercel, Server-Logs, lokal eingebettete Schriften (keine
 * Google-Verbindung), kein Kontaktformular, WhatsApp-Link, AKTUELL keine
 * Cookies und kein Tracking.
 *
 * WICHTIG (Enrico): Sobald Google Ads / Conversion-Tracking eingebunden wird,
 * ist der Abschnitt „Analyse und Werbung" zu ersetzen UND ein Cookie-Consent-
 * Banner (TTDSG/DSGVO) einzubauen — vorher darf kein Tracking-Cookie gesetzt
 * werden. Dieser Text ist sorgfältig, ersetzt aber keine anwaltliche Prüfung.
 */
const name = `${site.person.vorname} ${site.person.nachname}`;

export const metadata: Metadata = buildMetadata({
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von Klickhafen, Enrico Gross: welche Daten beim Besuch dieser Website verarbeitet werden und welche Rechte Sie haben.",
  path: "/datenschutz",
});

export default function DatenschutzSeite() {
  return (
    <RechtSeite titel="Datenschutzerklärung" pfad="/datenschutz" stand="Juli 2026">
      <RechtAbschnitt ueberschrift="Verantwortlicher">
        <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
        <p>{name} · Klickhafen</p>
        <p>{site.adresse.strasse}</p>
        <p>
          {site.adresse.plz} {site.adresse.ort}
        </p>
        <p>E-Mail: {site.email}</p>
        <p>Telefon / WhatsApp: {WHATSAPP_NUMMER_LESBAR}</p>
      </RechtAbschnitt>

      <RechtAbschnitt ueberschrift="Grundsätzliches">
        <p>
          Der Schutz Ihrer personenbezogenen Daten ist mir wichtig. Ich
          verarbeite Ihre Daten ausschließlich auf Grundlage der gesetzlichen
          Bestimmungen (DSGVO, BDSG, TDDDG). Diese Erklärung informiert Sie über
          Art, Umfang und Zweck der Verarbeitung auf dieser Website.
        </p>
        <p>
          Diese Website erhebt personenbezogene Daten bewusst sparsam. Es gibt
          kein Kontaktformular, keine Registrierung und keinen Newsletter.
        </p>
      </RechtAbschnitt>

      <RechtAbschnitt ueberschrift="Hosting und Server-Logfiles">
        <p>
          Diese Website wird bei {site.hosting.name} gehostet ({" "}
          {site.hosting.anschrift}). {site.hosting.name} verarbeitet dabei in
          meinem Auftrag Daten; ein Vertrag zur Auftragsverarbeitung nach Art. 28
          DSGVO liegt zugrunde.
        </p>
        <p>
          Beim Aufruf der Website werden automatisch Informationen in
          sogenannten Server-Logfiles gespeichert, die Ihr Browser übermittelt:
          IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite,
          verwendeter Browser und Betriebssystem. Diese Daten dienen dem
          sicheren und stabilen Betrieb und werden nicht mit anderen Daten
          zusammengeführt. Rechtsgrundlage ist das berechtigte Interesse an einem
          fehlerfreien Betrieb (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
        <p>
          Eine Verarbeitung kann in Rechenzentren außerhalb der EU (u. a. USA)
          erfolgen. Der Datentransfer ist durch Standardvertragsklauseln der
          EU-Kommission abgesichert. Die Datenschutzerklärung des Anbieters:{" "}
          {site.hosting.datenschutz}
        </p>
      </RechtAbschnitt>

      <RechtAbschnitt ueberschrift="Schriftarten (Fonts)">
        <p>
          Die verwendeten Schriften werden beim Erstellen der Website lokal
          eingebunden und von diesem Server ausgeliefert. Es besteht dadurch
          keine Verbindung Ihres Browsers zu Servern Dritter (etwa Google
          Fonts), und es werden keine IP-Adressen an Dritte übermittelt.
        </p>
      </RechtAbschnitt>

      <RechtAbschnitt ueberschrift="Kontaktaufnahme über WhatsApp">
        <p>
          Auf dieser Website gibt es kein Kontaktformular. Die Kontaktaufnahme
          erfolgt über Schaltflächen, die WhatsApp öffnen. Erst wenn Sie eine
          solche Schaltfläche anklicken und eine Nachricht senden, werden Daten
          an den Betreiber des Messengers, die WhatsApp Ireland Ltd., übermittelt
          und dort nach deren Datenschutzbestimmungen verarbeitet. Auf diese
          Verarbeitung habe ich keinen Einfluss.
        </p>
        <p>
          Der Inhalt Ihrer Nachricht und die von Ihnen übermittelten Daten werden
          zur Bearbeitung Ihrer Anfrage verwendet. Rechtsgrundlage ist Art. 6
          Abs. 1 lit. b DSGVO (Anbahnung eines Vertrags) bzw. lit. f DSGVO
          (berechtigtes Interesse an der Beantwortung Ihrer Anfrage). Ich lösche
          Ihre Anfragen, sobald ihre Speicherung nicht mehr erforderlich ist und
          keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
        <p>
          WhatsApp ist ein Dienst der Meta-Unternehmensgruppe; dabei kann eine
          Datenübermittlung in die USA erfolgen. Details entnehmen Sie der
          Datenschutzerklärung von WhatsApp.
        </p>
      </RechtAbschnitt>

      <RechtAbschnitt ueberschrift="Cookies, Analyse und Werbung">
        <p>
          Diese Website setzt derzeit keine Cookies und bindet keine Analyse-,
          Tracking- oder Werbedienste ein. Es findet keine Reichweitenmessung und
          kein Profiling statt.
        </p>
        <p>
          Sollten künftig Analyse- oder Werbewerkzeuge (etwa im Zusammenhang mit
          Online-Werbung) eingesetzt werden, geschieht dies erst nach Ihrer
          ausdrücklichen Einwilligung über einen Cookie-Hinweis und wird an
          dieser Stelle ergänzt.
        </p>
      </RechtAbschnitt>

      <RechtAbschnitt ueberschrift="Externe Links">
        <p>
          Diese Website verlinkt auf externe Websites (etwa Referenzprojekte).
          Beim Anklicken verlassen Sie diese Website; für die Datenverarbeitung
          auf den Zielseiten sind deren Betreiber verantwortlich.
        </p>
      </RechtAbschnitt>

      <RechtAbschnitt ueberschrift="Ihre Rechte">
        <p>
          Sie haben jederzeit das Recht auf Auskunft (Art. 15), Berichtigung
          (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
          Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen die Verarbeitung
          (Art. 21 DSGVO). Wenden Sie sich dazu an die oben genannten
          Kontaktdaten.
        </p>
        <p>
          Ihnen steht außerdem ein Beschwerderecht bei einer
          Datenschutz-Aufsichtsbehörde zu, in Nordrhein-Westfalen bei der
          Landesbeauftragten für Datenschutz und Informationsfreiheit NRW.
        </p>
      </RechtAbschnitt>

      <RechtAbschnitt ueberschrift="SSL-/TLS-Verschlüsselung">
        <p>
          Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-
          Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am
          „https://“ in der Adresszeile Ihres Browsers.
        </p>
      </RechtAbschnitt>
    </RechtSeite>
  );
}
