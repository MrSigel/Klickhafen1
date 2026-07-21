import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SeitenHero } from "@/components/SeitenHero";
import { Container, Eyebrow } from "@/components/ui";
import { breadcrumbSchema, buildMetadata, keywordsFuer } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Philosophie — warum Klickhafen so heißt, wie es heißt",
  description:
    "Klickhafen entstand aus einem Wunsch: mich mit Webdesign und Webentwicklung selbstständig zu machen. Die Geschichte, die Haltung und die Art zu arbeiten.",
  path: "/philosophie",
  keywords: keywordsFuer("Philosophie", "über mich", "Werte"),
});

/** Die Haltung — als echte Aussagen, nicht als Werteliste mit Icons. */
const haltung = [
  {
    titel: "Ehrlichkeit vor Auftragsvolumen",
    text: "Wenn eine Standardlösung für Sie günstiger und besser ist als das, was ich bauen würde, sage ich das. Ein Projekt, das sich für Sie nicht rechnet, ist auch für mich keine gute Referenz.",
  },
  {
    titel: "Handwerk statt Baukastendenken",
    text: "Es gibt einen Grund, warum es hier auch Baukasten-Lösungen gibt: Manchmal sind sie richtig. Aber sie sind eine bewusste Entscheidung, keine Bequemlichkeit — und ich sage Ihnen offen, wo ihre Grenze liegt.",
  },
  {
    titel: "Was ich baue, gehört Ihnen",
    text: "Quellcode, Zugänge, Dokumentation. Keine Abhängigkeit von mir als Person, kein System, das Sie an mich bindet. Wer nur über Abhängigkeit gehalten wird, war ohnehin nie überzeugt.",
  },
  {
    titel: "Ein Gespräch statt eines Formulars",
    text: "Auf dieser Website gibt es kein einziges Kontaktformular. Sie schreiben mir direkt per WhatsApp, ich antworte als Mensch. Das ist keine Marketing-Idee, sondern schlicht der kürzeste Weg.",
  },
];

export default function PhilosophieSeite() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([{ name: "Philosophie", path: "/philosophie" }])}
      />

      <SeitenHero
        breadcrumb={[{ name: "Philosophie", path: "/philosophie" }]}
        eyebrow="Die Geschichte"
        titel="Ein Hafen entsteht nicht aus einem Plan. Er entsteht aus Bedarf."
        intro="Warum Klickhafen so heißt, wie es heißt — und was das für Ihr Projekt bedeutet."
      />

      {/* Die ausführliche Geschichte. Fließtext auf 68ch begrenzt. */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>Woher es kommt</Eyebrow>
            </div>

            <div className="md:col-span-8">
              <Reveal>
                <div className="flex max-w-[68ch] flex-col gap-6 text-ink-soft">
                  <p className="text-lg text-ink">
                    Klickhafen entstand aus einem einzigen Wunsch: mich mit
                    Webdesign und Webentwicklung selbstständig zu machen.
                  </p>
                  <p>
                    Das klingt unspektakulär, und das war es auch. Am Anfang stand
                    kein Businessplan und keine Positionierungsstrategie, sondern
                    eine einfache Landingpage. Eine Seite, ein Ziel, ein Kunde, der
                    zufrieden war.
                  </p>
                  <p>
                    Danach kam die nächste. Und irgendwann kamen Anfragen, die mit
                    einer Seite nicht mehr zu beantworten waren: Prozesse, die
                    automatisiert werden mussten. Websites, die nicht nur schön sein,
                    sondern gefunden werden sollten — von Google und inzwischen
                    genauso von KI-Systemen. Funnels, die aus Werbebudget Aufträge
                    machen. Anwendungen, für die es kein fertiges Produkt gab.
                  </p>
                  <p>
                    Am anderen Ende dieser Entwicklung stand ein komplexes
                    Browsergame: Spiellogik, Zustandsverwaltung, Datenhaltung über
                    viele gleichzeitige Spieler hinweg. Von der einfachen
                    Landingpage bis dorthin ist es ein weiter Weg — und genau
                    dieser Weg ist der Punkt.
                  </p>
                  <p className="text-ink">
                    Denn wer beide Enden kennt, baut das Kleine nicht überkompliziert
                    und das Große nicht auf Sand. Das ist der eigentliche Wert von
                    Spannweite: Sie erzeugt Augenmaß.
                  </p>
                  <p>
                    Irgendwann brauchte das alles einen Namen. Und der Name ist das
                    Bild: ein Hafen für alles, was mit Web zu tun hat. Der Ort, an
                    dem Projekte anlegen, ausgerüstet werden und wieder auslaufen.
                    Nicht der Ort, an dem sie liegen bleiben — ein Hafen ist kein
                    Museum. Er ist Infrastruktur für Bewegung.
                  </p>
                  <p>
                    Der Sitz ist Castrop-Rauxel, mitten im Ruhrgebiet. Einer
                    Gegend, die weiß, wie es ist, sich neu erfinden zu müssen, und
                    in der man Arbeit an Ergebnissen misst statt an Ankündigungen.
                    Das passt.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Haltung */}
      <section className="border-b border-line bg-paper-sunk py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>Haltung</Eyebrow>
              <h2 className="mt-5 max-w-[16ch] text-h1 text-balance">
                Woran Sie mich messen können.
              </h2>
            </div>

            <ul className="grid gap-5 md:col-span-8 sm:grid-cols-2">
              {haltung.map((punkt, i) => (
                <li key={punkt.titel}>
                  <Reveal delay={i * 0.05}>
                    {/* In einer abgesenkten Sektion muss die Karte HELLER sein
                        als der Grund, sonst kehrt sich die Elevation um. */}
                    <article className="h-full rounded-lg border border-line bg-paper-lift p-7">
                      <h3 className="text-h3 font-display">{punkt.titel}</h3>
                      <p className="mt-3 text-small text-ink-soft">{punkt.text}</p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CtaBand
        ueberschrift="Klingt nach einer Arbeitsweise, die zu Ihnen passt?"
        text="Dann schreiben Sie mir. Ein kurzes Gespräch kostet Sie nichts und bringt in der Regel mehr Klarheit als drei Angebote."
      />
    </>
  );
}
