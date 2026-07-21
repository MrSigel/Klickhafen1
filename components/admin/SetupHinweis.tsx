/**
 * Wird angezeigt, solange Supabase nicht verbunden ist. So funktioniert der
 * ganze Admin-Bereich auch ohne Keys (baut, rendert, kein Absturz) und sagt
 * genau, was noch zu tun ist.
 */
const schritte = [
  "Supabase-Projekt anlegen (supabase.com) und im SQL-Editor die Datei supabase/schema.sql ausführen.",
  "Unter Authentication → Providers „Allow new users to sign up“ ausschalten.",
  "Project Settings → API: URL und anon-Key kopieren.",
  "Werte in .env.local eintragen (Vorlage: .env.local.example), dazu ADMIN_EMAIL und den Resend-Key.",
  "Neu starten — danach erscheint hier dein Dashboard.",
];

export function SetupHinweis() {
  return (
    <div className="max-w-[68ch] rounded-lg border border-accent/40 bg-paper-sunk p-7">
      <p className="font-mono text-eyebrow tracking-[0.12em] text-accent uppercase">
        Noch einzurichten
      </p>
      <h2 className="mt-3 font-display text-h2">
        Datenbank ist noch nicht verbunden.
      </h2>
      <p className="mt-4 text-small text-ink-soft">
        Das CRM ist gebaut, es fehlen nur deine Zugänge. In fünf Schritten steht es:
      </p>
      <ol className="mt-6 flex flex-col gap-4">
        {schritte.map((s, i) => (
          <li key={i} className="flex gap-4">
            <span className="font-mono text-eyebrow tracking-[0.12em] text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-small text-ink-soft">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
