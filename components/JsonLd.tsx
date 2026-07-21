/**
 * Strukturierte Daten als nativer <script>-Tag — so empfiehlt es die Next-Doku.
 * Das Escaping von "<" ist Pflicht, nicht Kosmetik: JSON.stringify allein
 * schützt nicht gegen XSS über eingebettete Strings.
 */
export function JsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
