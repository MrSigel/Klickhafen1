import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { SetupHinweis } from "@/components/admin/SetupHinweis";
import { Absenden, Feld, Karte, MiniAktion } from "@/components/admin/formular";
import { kundeAnlegen, kundeLoeschen } from "@/lib/admin/aktionen";
import { kundenLaden } from "@/lib/admin/daten";
import { aktuellerNutzer, supabaseKonfiguriert } from "@/lib/admin/supabase";

export const dynamic = "force-dynamic";

export default async function KundenSeite() {
  if (!supabaseKonfiguriert()) {
    return (
      <AdminShell titel="Kunden" aktiv="/admin/kunden">
        <SetupHinweis />
      </AdminShell>
    );
  }
  if (!(await aktuellerNutzer())) redirect("/admin/login");

  const kunden = await kundenLaden();

  return (
    <AdminShell titel="Kunden" aktiv="/admin/kunden">
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <Karte titel={`Kunden (${kunden.length})`}>
          {kunden.length === 0 ? (
            <p className="text-small text-ink-soft">
              Noch keine Kunden. Lege rechts den ersten an.
            </p>
          ) : (
            <ul className="flex flex-col">
              {kunden.map((k) => (
                <li
                  key={k.id}
                  className="flex items-start justify-between gap-4 border-b border-line py-3.5 first:border-t"
                >
                  <div>
                    <p className="text-ink">
                      {k.name}
                      {k.firma && (
                        <span className="text-ink-soft"> · {k.firma}</span>
                      )}
                    </p>
                    <p className="mt-0.5 text-small text-ink-faint">
                      {[k.email, k.telefon].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>
                  <form action={kundeLoeschen}>
                    <input type="hidden" name="id" value={k.id} />
                    <MiniAktion gefahr>Löschen</MiniAktion>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </Karte>

        <Karte titel="Neuer Kunde">
          <form action={kundeAnlegen} className="flex flex-col gap-4">
            <Feld label="Name" name="name" pflicht platzhalter="Max Mustermann" />
            <Feld label="Firma" name="firma" platzhalter="Muster GmbH" />
            <Feld label="E-Mail" name="email" type="email" />
            <Feld label="Telefon" name="telefon" />
            <Feld label="Anschrift" name="adresse" platzhalter="Straße, PLZ Ort" />
            <Feld label="Notiz" name="notiz" />
            <Absenden>Kunde anlegen</Absenden>
          </form>
        </Karte>
      </div>
    </AdminShell>
  );
}
