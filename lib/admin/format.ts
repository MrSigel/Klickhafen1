/** Euro-Format, deutsch. Deterministisch (fixe Locale). */
const eur = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export function euro(betrag: number): string {
  return eur.format(betrag);
}

const MONATE = [
  "Jan.", "Feb.", "März", "Apr.", "Mai", "Juni",
  "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez.",
];

/** ISO-Datum → "3. Juli 2026" bzw. kurz "03.07.2026". */
export function datum(iso: string, lang = false): string {
  const [j, m, t] = iso.slice(0, 10).split("-");
  if (lang) return `${Number(t)}. ${MONATE[Number(m) - 1]} ${j}`;
  return `${t}.${m}.${j}`;
}
