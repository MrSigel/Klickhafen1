/**
 * Rechnungssummen — die EINE Stelle, an der § 19 vs. Regelbesteuerung gerechnet
 * wird. PDF und Detailseite lesen hier, damit sie nie auseinanderlaufen.
 *
 * Die eingegebenen Einzelpreise gelten als NETTO. Bei Kleinunternehmer (§ 19)
 * gibt es keine Umsatzsteuer → netto = brutto. Bei Regelbesteuerung wird die
 * USt mit dem hinterlegten Satz aufgeschlagen und separat ausgewiesen.
 */
export type Betragszeile = { menge: number; einzelpreis: number };

export type Betrag = {
  netto: number;
  ust: number;
  brutto: number;
  ustSatz: number;
  kleinunternehmer: boolean;
};

export function rechnungBetrag(
  posten: Betragszeile[],
  opts: { kleinunternehmer: boolean; ustSatz: number },
): Betrag {
  const netto = posten.reduce((s, p) => s + p.menge * p.einzelpreis, 0);
  const ust = opts.kleinunternehmer ? 0 : netto * (opts.ustSatz / 100);
  return {
    netto,
    ust,
    brutto: netto + ust,
    ustSatz: opts.ustSatz,
    kleinunternehmer: opts.kleinunternehmer,
  };
}
