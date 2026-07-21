import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import { site } from "@/lib/site";
import { datum, euro } from "./format";

/**
 * Rechnungs-PDF für Kleinunternehmer (§ 19 UStG — keine Umsatzsteuer).
 *
 * Bewusst HELL/druckbar gestaltet, nicht im dunklen Website-Look: Rechnungen
 * werden gedruckt und abgelegt. Standardschrift Helvetica (in react-pdf
 * eingebaut) — keine Font-Ladeprobleme.
 */

export type RechnungPostenDaten = {
  bezeichnung: string;
  menge: number;
  einzelpreis: number;
};

export type RechnungDaten = {
  nummer: string;
  datum: string;
  faellig?: string | null;
  empfaenger: {
    name: string;
    firma?: string | null;
    adresse?: string | null;
  };
  posten: RechnungPostenDaten[];
  notiz?: string | null;
};

const ACCENT = "#1b4d3e";
const INK = "#14161a";
const GRAU = "#6b7280";
const LINIE = "#e2e0da";

const s = StyleSheet.create({
  seite: {
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: INK,
    lineHeight: 1.5,
  },
  kopf: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  marke: { fontSize: 18, fontFamily: "Helvetica-Bold", color: INK },
  markeZusatz: { fontSize: 8, color: ACCENT, letterSpacing: 1, marginTop: 2 },
  absenderKlein: { fontSize: 8, color: GRAU, marginTop: 24, marginBottom: 4 },
  adresseBlock: { textAlign: "right", fontSize: 9, color: GRAU },
  empfaenger: { marginTop: 8, fontSize: 10 },
  titelZeile: {
    marginTop: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  h1: { fontSize: 20, fontFamily: "Helvetica-Bold" },
  meta: { fontSize: 9, color: GRAU, textAlign: "right" },
  metaWert: { color: INK, fontFamily: "Helvetica-Bold" },
  tabelleKopf: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderColor: INK,
    paddingBottom: 6,
    marginTop: 28,
    fontSize: 8,
    color: GRAU,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  zeile: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: LINIE,
    paddingVertical: 8,
  },
  colPos: { width: "8%" },
  colText: { width: "50%" },
  colMenge: { width: "12%", textAlign: "right" },
  colPreis: { width: "15%", textAlign: "right" },
  colBetrag: { width: "15%", textAlign: "right", fontFamily: "Helvetica-Bold" },
  summeZeile: { flexDirection: "row", justifyContent: "flex-end", marginTop: 14 },
  summeBox: { width: "45%" },
  summeGesamt: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1.5,
    borderColor: INK,
    paddingTop: 8,
    marginTop: 4,
  },
  summeLabel: { fontSize: 12, fontFamily: "Helvetica-Bold" },
  summeWert: { fontSize: 12, fontFamily: "Helvetica-Bold" },
  hinweis: { marginTop: 28, fontSize: 9, color: GRAU },
  fuss: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderColor: LINIE,
    paddingTop: 8,
    fontSize: 7.5,
    color: GRAU,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

function RechnungDokument({ daten }: { daten: RechnungDaten }) {
  const gesamt = daten.posten.reduce(
    (sum, p) => sum + p.menge * p.einzelpreis,
    0,
  );
  const absenderZeile = `${site.person.vorname} ${site.person.nachname} · ${site.adresse.strasse} · ${site.adresse.plz} ${site.adresse.ort}`;

  return (
    <Document
      title={`Rechnung ${daten.nummer}`}
      author={site.name}
      creator={site.name}
    >
      <Page size="A4" style={s.seite}>
        <View style={s.kopf}>
          <View>
            <Text style={s.marke}>Klickhafen</Text>
            <Text style={s.markeZusatz}>WEBDESIGN · RUHRGEBIET</Text>
          </View>
          <View style={s.adresseBlock}>
            <Text>
              {site.person.vorname} {site.person.nachname}
            </Text>
            <Text>{site.adresse.strasse}</Text>
            <Text>
              {site.adresse.plz} {site.adresse.ort}
            </Text>
            <Text>{site.email}</Text>
          </View>
        </View>

        <Text style={s.absenderKlein}>{absenderZeile}</Text>
        <View style={s.empfaenger}>
          {daten.empfaenger.firma && (
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              {daten.empfaenger.firma}
            </Text>
          )}
          <Text>{daten.empfaenger.name}</Text>
          {daten.empfaenger.adresse
            ?.split("\n")
            .map((z, i) => <Text key={i}>{z}</Text>)}
        </View>

        <View style={s.titelZeile}>
          <Text style={s.h1}>Rechnung</Text>
          <View style={s.meta}>
            <Text>
              Nr. <Text style={s.metaWert}>{daten.nummer}</Text>
            </Text>
            <Text>
              Datum <Text style={s.metaWert}>{datum(daten.datum, true)}</Text>
            </Text>
            {daten.faellig && (
              <Text>
                Fällig bis{" "}
                <Text style={s.metaWert}>{datum(daten.faellig, true)}</Text>
              </Text>
            )}
          </View>
        </View>

        <View style={s.tabelleKopf}>
          <Text style={s.colPos}>Pos.</Text>
          <Text style={s.colText}>Beschreibung</Text>
          <Text style={s.colMenge}>Menge</Text>
          <Text style={s.colPreis}>Einzel</Text>
          <Text style={s.colBetrag}>Betrag</Text>
        </View>

        {daten.posten.map((p, i) => (
          <View style={s.zeile} key={i}>
            <Text style={s.colPos}>{i + 1}</Text>
            <Text style={s.colText}>{p.bezeichnung}</Text>
            <Text style={s.colMenge}>{p.menge}</Text>
            <Text style={s.colPreis}>{euro(p.einzelpreis)}</Text>
            <Text style={s.colBetrag}>{euro(p.menge * p.einzelpreis)}</Text>
          </View>
        ))}

        <View style={s.summeZeile}>
          <View style={s.summeBox}>
            <View style={s.summeGesamt}>
              <Text style={s.summeLabel}>Gesamtbetrag</Text>
              <Text style={s.summeWert}>{euro(gesamt)}</Text>
            </View>
          </View>
        </View>

        <Text style={s.hinweis}>
          Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
          {daten.notiz ? `\n${daten.notiz}` : ""}
          {"\n"}
          {site.bank
            ? `Zahlbar${daten.faellig ? ` bis ${datum(daten.faellig, true)}` : ""} auf: ${site.bank.inhaber} · IBAN ${site.bank.iban} · BIC ${site.bank.bic}`
            : `Bitte überweisen Sie den Betrag${daten.faellig ? ` bis ${datum(daten.faellig, true)}` : ""} auf das Ihnen bekannte Konto.`}
        </Text>

        <View style={s.fuss} fixed>
          <Text>
            {site.person.vorname} {site.person.nachname} · Klickhafen ·{" "}
            {site.adresse.ort}
          </Text>
          <Text>{site.domain}</Text>
        </View>
      </Page>
    </Document>
  );
}

/** Erzeugt die PDF-Bytes — server-seitig. */
export async function rechnungPdf(daten: RechnungDaten): Promise<Buffer> {
  return renderToBuffer(<RechnungDokument daten={daten} />);
}
