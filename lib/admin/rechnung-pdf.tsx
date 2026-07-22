import {
  Document,
  Page,
  Path,
  Rect,
  StyleSheet,
  Svg,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import type { Einstellungen } from "./typen";
import { rechnungBetrag } from "./rechnung-betrag";
import { datum, euro } from "./format";

/**
 * Rechnungs-PDF für Klickhafen.
 *
 * Bewusst HELL/druckbar (nicht im dunklen Website-Look) — Rechnungen werden
 * gedruckt und abgelegt. Kopf mit Anker-Logo + Wortmarke, sauber gesetzter
 * Absender/Empfänger, Positionstabelle, Summenblock mit § 19- bzw. USt-Logik,
 * Zahlungsblock und dreispaltige Fußzeile. Standardschrift Helvetica (in
 * react-pdf eingebaut) — keine Font-Ladeprobleme.
 *
 * Alle Firmen-/Steuerangaben kommen aus den Einstellungen (Tabelle
 * `einstellungen`), damit Enrico alles im CRM steuern kann.
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
const ACCENT_INK = "#f7f5f0";
const INK = "#14161a";
const INK_SOFT = "#3d424b";
const GRAU = "#6b7280";
const LINIE = "#e2e0da";

const s = StyleSheet.create({
  seite: {
    paddingTop: 44,
    paddingBottom: 92,
    paddingHorizontal: 46,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: INK,
    lineHeight: 1.5,
  },

  // Kopf
  kopf: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  markeReihe: { flexDirection: "row", alignItems: "center" },
  logoFeld: {
    width: 34,
    height: 34,
    borderRadius: 7,
    backgroundColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  marke: { fontSize: 17, fontFamily: "Helvetica-Bold", color: INK, letterSpacing: 0.2 },
  markeZusatz: {
    fontSize: 7,
    color: ACCENT,
    letterSpacing: 1.4,
    marginTop: 2,
    fontFamily: "Helvetica-Bold",
  },
  absenderBlock: { textAlign: "right", fontSize: 8.5, color: INK_SOFT, lineHeight: 1.45 },
  absenderName: { fontFamily: "Helvetica-Bold", color: INK },

  regel: { height: 1.5, backgroundColor: ACCENT, marginTop: 16 },

  // Anschriften
  absenderKlein: { fontSize: 7.5, color: GRAU, marginTop: 26, marginBottom: 5 },
  empfaenger: { fontSize: 10.5, lineHeight: 1.5 },
  empfaengerFirma: { fontFamily: "Helvetica-Bold" },

  // Titelzeile
  titelZeile: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  h1: { fontSize: 22, fontFamily: "Helvetica-Bold", letterSpacing: -0.3 },
  metaBlock: { fontSize: 9, color: GRAU, textAlign: "right", lineHeight: 1.6 },
  metaWert: { color: INK, fontFamily: "Helvetica-Bold" },

  // Tabelle
  tabelleKopf: {
    flexDirection: "row",
    backgroundColor: "#f3f1ea",
    borderTopWidth: 1.5,
    borderColor: INK,
    paddingVertical: 7,
    paddingHorizontal: 6,
    marginTop: 26,
    fontSize: 7.5,
    color: INK_SOFT,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    fontFamily: "Helvetica-Bold",
  },
  zeile: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: LINIE,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  colPos: { width: "7%", color: GRAU },
  colText: { width: "51%", paddingRight: 8 },
  colMenge: { width: "10%", textAlign: "right" },
  colPreis: { width: "16%", textAlign: "right" },
  colBetrag: { width: "16%", textAlign: "right", fontFamily: "Helvetica-Bold" },

  // Summen
  summeZeile: { flexDirection: "row", justifyContent: "flex-end", marginTop: 16 },
  summeBox: { width: "48%" },
  summeReihe: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
    fontSize: 10,
    color: INK_SOFT,
  },
  summeGesamt: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1.5,
    borderColor: INK,
    paddingTop: 8,
    marginTop: 5,
  },
  summeLabel: { fontSize: 12.5, fontFamily: "Helvetica-Bold" },
  summeWert: { fontSize: 12.5, fontFamily: "Helvetica-Bold" },

  // Hinweise & Zahlung
  hinweis: { marginTop: 26, fontSize: 9.5, color: INK_SOFT, lineHeight: 1.5 },
  zahlBox: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: LINIE,
    borderRadius: 6,
    padding: 12,
    backgroundColor: "#faf9f5",
  },
  zahlTitel: {
    fontSize: 7.5,
    color: ACCENT,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },
  zahlReihe: { flexDirection: "row", marginBottom: 1.5 },
  zahlLabel: { width: 96, color: GRAU, fontSize: 9 },
  zahlWert: { fontSize: 9, color: INK },
  gruss: { marginTop: 20, fontSize: 10, color: INK_SOFT },

  // Fußzeile
  fuss: {
    position: "absolute",
    bottom: 30,
    left: 46,
    right: 46,
    borderTopWidth: 1,
    borderColor: LINIE,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.5,
    color: GRAU,
    lineHeight: 1.45,
  },
  fussSpalte: { width: "32%" },
  fussSpalteRechts: { width: "32%", textAlign: "right" },
  fussTitel: { color: INK_SOFT, fontFamily: "Helvetica-Bold", marginBottom: 1.5 },
});

/** Das Anker-Logo als Vektor (weiß, auf Akzentfläche) — 1:1 aus components/Anker. */
function AnkerLogo() {
  return (
    <Svg viewBox="0 0 24 24" width={18} height={18}>
      <Path
        d="M12 0.9a3.1 3.1 0 100 6.2 3.1 3.1 0 000-6.2zm0 1.85a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"
        fill={ACCENT_INK}
        fillRule="evenodd"
      />
      <Rect x="10.85" y="5.0" width="2.3" height="16.2" rx="1.15" fill={ACCENT_INK} />
      <Rect x="5.7" y="8.3" width="12.6" height="2.2" rx="1.1" fill={ACCENT_INK} />
      <Path
        d="M3.84 16.1A8.8 8.8 0 0020.16 16.1L18.03 15.24A6.5 6.5 0 015.97 15.24Z"
        fill={ACCENT_INK}
      />
      <Path d="M18.03 15.24L20.16 16.1L21.84 13.54Z" fill={ACCENT_INK} />
      <Path d="M5.97 15.24L3.84 16.1L2.16 13.54Z" fill={ACCENT_INK} />
    </Svg>
  );
}

function RechnungDokument({
  daten,
  e,
}: {
  daten: RechnungDaten;
  e: Einstellungen;
}) {
  const betrag = rechnungBetrag(daten.posten, {
    kleinunternehmer: e.kleinunternehmer,
    ustSatz: e.ustSatz,
  });

  const ortTeil = [e.plz, e.ort].filter(Boolean).join(" ");
  const absenderZeile = [e.inhaber, e.strasse, ortTeil]
    .filter(Boolean)
    .join(" · ");
  const bankInhaber = e.bankInhaber ?? e.inhaber;
  const hatBank = Boolean(e.iban);

  return (
    <Document title={`Rechnung ${daten.nummer}`} author={e.firma} creator={e.firma}>
      <Page size="A4" style={s.seite}>
        {/* Kopf */}
        <View style={s.kopf}>
          <View style={s.markeReihe}>
            {e.logoZeigen && (
              <View style={s.logoFeld}>
                <AnkerLogo />
              </View>
            )}
            <View>
              <Text style={s.marke}>{e.firma}</Text>
              {e.eyebrow && <Text style={s.markeZusatz}>{e.eyebrow}</Text>}
            </View>
          </View>
          <View style={s.absenderBlock}>
            <Text style={s.absenderName}>{e.inhaber}</Text>
            {e.strasse && <Text>{e.strasse}</Text>}
            {ortTeil !== "" && <Text>{ortTeil}</Text>}
            {e.email && <Text>{e.email}</Text>}
            {e.telefon && <Text>{e.telefon}</Text>}
          </View>
        </View>

        <View style={s.regel} />

        {/* Anschriften */}
        <Text style={s.absenderKlein}>{absenderZeile}</Text>
        <View style={s.empfaenger}>
          {daten.empfaenger.firma && (
            <Text style={s.empfaengerFirma}>{daten.empfaenger.firma}</Text>
          )}
          <Text>{daten.empfaenger.name}</Text>
          {daten.empfaenger.adresse
            ?.split("\n")
            .map((z, i) => <Text key={i}>{z}</Text>)}
        </View>

        {/* Titel + Meta */}
        <View style={s.titelZeile}>
          <Text style={s.h1}>Rechnung</Text>
          <View style={s.metaBlock}>
            <Text>
              Rechnungs-Nr. <Text style={s.metaWert}>{daten.nummer}</Text>
            </Text>
            <Text>
              Datum <Text style={s.metaWert}>{datum(daten.datum, true)}</Text>
            </Text>
            {daten.faellig && (
              <Text>
                Fällig bis <Text style={s.metaWert}>{datum(daten.faellig, true)}</Text>
              </Text>
            )}
          </View>
        </View>

        {/* Positionen */}
        <View style={s.tabelleKopf}>
          <Text style={s.colPos}>Pos.</Text>
          <Text style={s.colText}>Beschreibung</Text>
          <Text style={s.colMenge}>Menge</Text>
          <Text style={s.colPreis}>Einzel</Text>
          <Text style={s.colBetrag}>{e.kleinunternehmer ? "Betrag" : "Netto"}</Text>
        </View>

        {daten.posten.map((p, i) => (
          <View style={s.zeile} key={i} wrap={false}>
            <Text style={s.colPos}>{i + 1}</Text>
            <Text style={s.colText}>{p.bezeichnung}</Text>
            <Text style={s.colMenge}>{p.menge}</Text>
            <Text style={s.colPreis}>{euro(p.einzelpreis)}</Text>
            <Text style={s.colBetrag}>{euro(p.menge * p.einzelpreis)}</Text>
          </View>
        ))}

        {/* Summen */}
        <View style={s.summeZeile}>
          <View style={s.summeBox}>
            {!e.kleinunternehmer && (
              <>
                <View style={s.summeReihe}>
                  <Text>Zwischensumme (netto)</Text>
                  <Text>{euro(betrag.netto)}</Text>
                </View>
                <View style={s.summeReihe}>
                  <Text>zzgl. {betrag.ustSatz.toString().replace(".", ",")} % USt</Text>
                  <Text>{euro(betrag.ust)}</Text>
                </View>
              </>
            )}
            <View style={s.summeGesamt}>
              <Text style={s.summeLabel}>Gesamtbetrag</Text>
              <Text style={s.summeWert}>{euro(betrag.brutto)}</Text>
            </View>
          </View>
        </View>

        {/* Steuer-Hinweis */}
        <Text style={s.hinweis}>
          {e.kleinunternehmer
            ? "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet."
            : `Im Gesamtbetrag sind ${betrag.ustSatz
                .toString()
                .replace(".", ",")} % Umsatzsteuer (${euro(betrag.ust)}) enthalten.`}
        </Text>

        {/* Zahlungsblock */}
        <View style={s.zahlBox}>
          <Text style={s.zahlTitel}>Zahlung</Text>
          {hatBank ? (
            <>
              <View style={s.zahlReihe}>
                <Text style={s.zahlLabel}>Kontoinhaber</Text>
                <Text style={s.zahlWert}>{bankInhaber}</Text>
              </View>
              <View style={s.zahlReihe}>
                <Text style={s.zahlLabel}>IBAN</Text>
                <Text style={s.zahlWert}>{e.iban}</Text>
              </View>
              {e.bic && (
                <View style={s.zahlReihe}>
                  <Text style={s.zahlLabel}>BIC</Text>
                  <Text style={s.zahlWert}>{e.bic}</Text>
                </View>
              )}
              {e.bankName && (
                <View style={s.zahlReihe}>
                  <Text style={s.zahlLabel}>Bank</Text>
                  <Text style={s.zahlWert}>{e.bankName}</Text>
                </View>
              )}
              <View style={s.zahlReihe}>
                <Text style={s.zahlLabel}>Verwendungszweck</Text>
                <Text style={s.zahlWert}>Rechnung {daten.nummer}</Text>
              </View>
            </>
          ) : (
            <Text style={s.zahlWert}>
              Bitte überweisen Sie den Betrag
              {daten.faellig ? ` bis zum ${datum(daten.faellig, true)}` : ""} auf das
              Ihnen bekannte Konto. Verwendungszweck: Rechnung {daten.nummer}.
            </Text>
          )}
        </View>

        {(daten.notiz || e.rechnungFuss) && (
          <Text style={s.gruss}>{daten.notiz ?? e.rechnungFuss}</Text>
        )}

        {/* Fußzeile */}
        <View style={s.fuss} fixed>
          <View style={s.fussSpalte}>
            <Text style={s.fussTitel}>{e.firma}</Text>
            <Text>{e.inhaber}</Text>
            {e.strasse && <Text>{e.strasse}</Text>}
            {ortTeil !== "" && <Text>{ortTeil}</Text>}
          </View>
          <View style={s.fussSpalte}>
            <Text style={s.fussTitel}>Kontakt</Text>
            {e.email && <Text>{e.email}</Text>}
            {e.telefon && <Text>{e.telefon}</Text>}
            {e.web && <Text>{e.web}</Text>}
          </View>
          <View style={s.fussSpalteRechts}>
            <Text style={s.fussTitel}>Steuer</Text>
            {e.kleinunternehmer ? (
              <Text>Kleinunternehmer § 19 UStG</Text>
            ) : (
              e.ustId && <Text>USt-IdNr. {e.ustId}</Text>
            )}
            {e.steuernummer && <Text>St.-Nr. {e.steuernummer}</Text>}
            {hatBank && <Text>IBAN {e.iban}</Text>}
          </View>
        </View>
      </Page>
    </Document>
  );
}

/** Reine Render-Variante mit übergebenen Einstellungen — ohne DB (testbar). */
export function rechnungPdfMit(
  daten: RechnungDaten,
  e: Einstellungen,
): Promise<Buffer> {
  return renderToBuffer(<RechnungDokument daten={daten} e={e} />);
}

/** Erzeugt die PDF-Bytes — server-seitig. Lädt die Einstellungen selbst. */
export async function rechnungPdf(daten: RechnungDaten): Promise<Buffer> {
  const { einstellungenLaden } = await import("./einstellungen");
  const e = await einstellungenLaden();
  return rechnungPdfMit(daten, e);
}
