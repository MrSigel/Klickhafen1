import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { SetupHinweis } from "@/components/admin/SetupHinweis";
import { Absenden, Auswahl, Feld, Feldgross, Karte } from "@/components/admin/formular";
import { einstellungenSpeichern } from "@/lib/admin/aktionen";
import { einstellungenLaden } from "@/lib/admin/einstellungen";
import { aktuellerNutzer, supabaseKonfiguriert } from "@/lib/admin/supabase";

export const dynamic = "force-dynamic";

export default async function EinstellungenSeite({
  searchParams,
}: {
  searchParams: Promise<{ gespeichert?: string; fehler?: string }>;
}) {
  if (!supabaseKonfiguriert()) {
    return (
      <AdminShell titel="Einstellungen" aktiv="/admin/einstellungen">
        <SetupHinweis />
      </AdminShell>
    );
  }
  if (!(await aktuellerNutzer())) redirect("/admin/login");

  const { gespeichert, fehler } = await searchParams;
  const e = await einstellungenLaden();

  return (
    <AdminShell titel="Einstellungen" aktiv="/admin/einstellungen">
      <p className="-mt-4 mb-8 max-w-[60ch] text-small text-ink-soft">
        Alles, was auf deiner Rechnung steht — an einer Stelle. Änderungen greifen
        sofort für neue PDFs und die Vorschau.
      </p>

      {gespeichert && (
        <p
          role="status"
          className="mb-6 rounded-md border border-accent/40 bg-accent/8 px-4 py-3 text-small text-accent"
        >
          Gespeichert. Deine Rechnungen nutzen ab sofort diese Angaben.
        </p>
      )}
      {fehler === "tabelle" && (
        <p
          role="status"
          className="mb-6 rounded-md border border-red-500/40 bg-red-500/8 px-4 py-3 text-small text-red-400"
        >
          Konnte nicht gespeichert werden. Vermutlich fehlt noch die Tabelle —
          bitte einmal <code className="font-mono">supabase/einstellungen.sql</code>{" "}
          im Supabase-SQL-Editor ausführen, dann erneut speichern.
        </p>
      )}

      <form action={einstellungenSpeichern} className="flex flex-col gap-8">
        <Karte titel="Marke & Absender">
          <div className="grid gap-4 sm:grid-cols-2">
            <Feld label="Firma / Marke" name="firma" pflicht wert={e.firma} />
            <Feld
              label="Zusatz unter der Marke"
              name="eyebrow"
              platzhalter="WEBDESIGN · RUHRGEBIET"
              wert={e.eyebrow ?? ""}
            />
            <Feld label="Inhaber (voller Name)" name="inhaber" pflicht wert={e.inhaber} />
            <Auswahl
              label="Logo im Kopf zeigen"
              name="logo_zeigen"
              wert={e.logoZeigen ? "true" : "false"}
              optionen={[
                { wert: "true", text: "Ja — Anker-Logo anzeigen" },
                { wert: "false", text: "Nein — nur Wortmarke" },
              ]}
            />
            <Feld label="Straße & Nr." name="strasse" wert={e.strasse ?? ""} />
            <div className="grid grid-cols-[7rem_1fr] gap-4">
              <Feld label="PLZ" name="plz" wert={e.plz ?? ""} />
              <Feld label="Ort" name="ort" wert={e.ort ?? ""} />
            </div>
          </div>
        </Karte>

        <Karte titel="Kontakt">
          <div className="grid gap-4 sm:grid-cols-3">
            <Feld label="E-Mail" name="email" type="email" wert={e.email ?? ""} />
            <Feld label="Telefon" name="telefon" wert={e.telefon ?? ""} />
            <Feld label="Website" name="web" wert={e.web ?? ""} />
          </div>
        </Karte>

        <Karte titel="Bankverbindung">
          <p className="mb-4 -mt-1 text-small text-ink-faint">
            Erscheint als Zahlungsblock auf der Rechnung. Bleibt es leer, druckt die
            Rechnung eine neutrale Zahlungszeile statt falscher Kontodaten.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Feld
              label="Kontoinhaber"
              name="bank_inhaber"
              platzhalter="Enrico Gross"
              wert={e.bankInhaber ?? ""}
            />
            <Feld label="Bank" name="bank_name" platzhalter="z. B. Sparkasse" wert={e.bankName ?? ""} />
            <Feld label="IBAN" name="iban" platzhalter="DE00 0000 0000 0000 0000 00" wert={e.iban ?? ""} />
            <Feld label="BIC" name="bic" platzhalter="XXXXDEXXXXX" wert={e.bic ?? ""} />
          </div>
        </Karte>

        <Karte titel="Steuer">
          <div className="grid gap-4 sm:grid-cols-2">
            <Auswahl
              label="Besteuerung"
              name="kleinunternehmer"
              wert={e.kleinunternehmer ? "true" : "false"}
              optionen={[
                { wert: "true", text: "§ 19 UStG — Kleinunternehmer (keine USt)" },
                { wert: "false", text: "Regelbesteuerung — USt ausweisen" },
              ]}
            />
            <Feld
              label="USt-Satz in % (bei Regelbesteuerung)"
              name="ust_satz"
              type="text"
              wert={String(e.ustSatz)}
            />
            <Feld
              label="USt-IdNr. (bei Regelbesteuerung)"
              name="ust_id"
              platzhalter="DE123456789"
              wert={e.ustId ?? ""}
            />
            <Feld label="Steuernummer" name="steuernummer" wert={e.steuernummer ?? ""} />
          </div>
          <p className="mt-4 text-small text-ink-faint">
            Bei „§ 19“ steht die Rechnung ohne Umsatzsteuer und mit dem gesetzlichen
            Hinweis. Bei „Regelbesteuerung“ weist das PDF Netto, USt und Brutto
            getrennt aus.
          </p>
        </Karte>

        <Karte titel="Rechnungstext">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[10rem_1fr] gap-4">
              <Feld
                label="Zahlungsziel (Tage)"
                name="zahlungsziel_tage"
                type="text"
                wert={String(e.zahlungszielTage)}
              />
              <div />
            </div>
            <Feldgross
              label="Fußtext auf der Rechnung"
              name="rechnung_fuss"
              zeilen={3}
              platzhalter="z. B. „Vielen Dank für die Zusammenarbeit.“"
              wert={e.rechnungFuss ?? ""}
            />
          </div>
        </Karte>

        <div className="flex items-center gap-4">
          <Absenden>Speichern</Absenden>
          <a
            href="/admin/rechnung-vorschau"
            target="_blank"
            rel="noopener noreferrer"
            className="text-small text-ink-soft underline-offset-4 hover:text-accent hover:underline"
          >
            Muster-Rechnung als PDF ansehen
          </a>
        </div>
      </form>
    </AdminShell>
  );
}
