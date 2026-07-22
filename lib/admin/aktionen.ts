"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { aktuellerNutzer, supabaseServer } from "./supabase";

/**
 * Jede Aktion prüft die Anmeldung selbst — die proxy-Sperre allein reicht laut
 * Next-Doku nicht, weil Server-Aktionen POSTs auf ihre eigene Route sind.
 */
async function client() {
  const nutzer = await aktuellerNutzer();
  if (!nutzer) redirect("/admin/login");
  return supabaseServer();
}

const str = (fd: FormData, k: string) => {
  const v = String(fd.get(k) ?? "").trim();
  return v.length ? v : null;
};
const pflichtStr = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const num = (fd: FormData, k: string) => {
  // deutsche Eingabe „1.234,56" tolerieren
  const roh = String(fd.get(k) ?? "").replace(/\./g, "").replace(",", ".");
  const n = Number(roh);
  return Number.isFinite(n) ? n : 0;
};
const bool = (fd: FormData, k: string) => fd.get(k) === "on" || fd.get(k) === "true";

/* ---- Kunden ---- */
export async function kundeAnlegen(fd: FormData) {
  const supabase = await client();
  await supabase.from("kunden").insert({
    name: pflichtStr(fd, "name"),
    firma: str(fd, "firma"),
    email: str(fd, "email"),
    telefon: str(fd, "telefon"),
    adresse: str(fd, "adresse"),
    notiz: str(fd, "notiz"),
  });
  revalidatePath("/admin/kunden");
}

export async function kundeLoeschen(fd: FormData) {
  const supabase = await client();
  await supabase.from("kunden").delete().eq("id", pflichtStr(fd, "id"));
  revalidatePath("/admin/kunden");
}

/* ---- Projekte ---- */
export async function projektAnlegen(fd: FormData) {
  const supabase = await client();
  const { data } = await supabase
    .from("projekte")
    .insert({
      kunde_id: str(fd, "kunde_id"),
      name: pflichtStr(fd, "name"),
      status: pflichtStr(fd, "status") || "aktiv",
      notiz: str(fd, "notiz"),
    })
    .select("id")
    .single();
  revalidatePath("/admin/projekte");
  if (data?.id) redirect(`/admin/projekte/${data.id}`);
}

export async function projektLoeschen(fd: FormData) {
  const supabase = await client();
  await supabase.from("projekte").delete().eq("id", pflichtStr(fd, "id"));
  revalidatePath("/admin/projekte");
  redirect("/admin/projekte");
}

/* ---- Posten (Einnahmen) ---- */
export async function postenAnlegen(fd: FormData) {
  const supabase = await client();
  const projektId = pflichtStr(fd, "projekt_id");
  await supabase.from("posten").insert({
    projekt_id: projektId,
    bezeichnung: pflichtStr(fd, "bezeichnung"),
    betrag: num(fd, "betrag"),
    art: pflichtStr(fd, "art") || "umsatz",
    bezahlt: bool(fd, "bezahlt"),
    datum: str(fd, "datum") ?? undefined,
  });
  revalidatePath(`/admin/projekte/${projektId}`);
  revalidatePath("/admin");
}

export async function postenBezahlt(fd: FormData) {
  const supabase = await client();
  const projektId = pflichtStr(fd, "projekt_id");
  await supabase
    .from("posten")
    .update({ bezahlt: bool(fd, "bezahlt") })
    .eq("id", pflichtStr(fd, "id"));
  revalidatePath(`/admin/projekte/${projektId}`);
  revalidatePath("/admin");
}

export async function postenLoeschen(fd: FormData) {
  const supabase = await client();
  const projektId = pflichtStr(fd, "projekt_id");
  await supabase.from("posten").delete().eq("id", pflichtStr(fd, "id"));
  revalidatePath(`/admin/projekte/${projektId}`);
  revalidatePath("/admin");
}

/* ---- Ausgaben ---- */
export async function ausgabeAnlegen(fd: FormData) {
  const supabase = await client();
  await supabase.from("ausgaben").insert({
    projekt_id: str(fd, "projekt_id"),
    bezeichnung: pflichtStr(fd, "bezeichnung"),
    betrag: num(fd, "betrag"),
    art: pflichtStr(fd, "art") || "eigen",
    kategorie: str(fd, "kategorie"),
    datum: str(fd, "datum") ?? undefined,
  });
  revalidatePath("/admin/ausgaben");
  revalidatePath("/admin");
  const projektId = str(fd, "projekt_id");
  if (projektId) revalidatePath(`/admin/projekte/${projektId}`);
}

export async function ausgabeLoeschen(fd: FormData) {
  const supabase = await client();
  await supabase.from("ausgaben").delete().eq("id", pflichtStr(fd, "id"));
  revalidatePath("/admin/ausgaben");
  revalidatePath("/admin");
}

/* ---- Rechnungen ---- */

/** Liest die frei eingegebenen Positionszeilen aus dem Editor-Formular. */
function zeilenAusForm(fd: FormData) {
  const bez = fd.getAll("z_bezeichnung").map(String);
  const men = fd.getAll("z_menge").map(String);
  const pre = fd.getAll("z_preis").map(String);
  const zahl = (s: string) => {
    const n = Number(String(s ?? "").replace(/\./g, "").replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  };
  return bez
    .map((b, i) => ({
      bezeichnung: b.trim(),
      menge: zahl(men[i] ?? "1") || 1,
      einzelpreis: zahl(pre[i] ?? "0"),
    }))
    .filter((z) => z.bezeichnung.length > 0);
}

export async function rechnungAnlegen(fd: FormData) {
  const supabase = await client();

  const { data: rechnung } = await supabase
    .from("rechnungen")
    .insert({
      projekt_id: str(fd, "projekt_id"),
      kunde_id: str(fd, "kunde_id"),
      nummer: pflichtStr(fd, "nummer"),
      datum: str(fd, "datum") ?? undefined,
      faellig: str(fd, "faellig"),
      notiz: str(fd, "notiz"),
      status: "entwurf",
    })
    .select("id")
    .single();

  const zeilen = zeilenAusForm(fd);
  if (rechnung?.id && zeilen.length) {
    await supabase.from("rechnung_posten").insert(
      zeilen.map((z, i) => ({
        rechnung_id: rechnung.id,
        bezeichnung: z.bezeichnung,
        menge: z.menge,
        einzelpreis: z.einzelpreis,
        position: i,
      })),
    );
  }

  revalidatePath("/admin/rechnungen");
  if (rechnung?.id) redirect(`/admin/rechnungen/${rechnung.id}`);
}

export async function rechnungAktualisieren(fd: FormData) {
  const supabase = await client();
  const id = pflichtStr(fd, "id");

  await supabase
    .from("rechnungen")
    .update({
      kunde_id: str(fd, "kunde_id"),
      nummer: pflichtStr(fd, "nummer"),
      datum: str(fd, "datum") ?? undefined,
      faellig: str(fd, "faellig"),
      notiz: str(fd, "notiz"),
    })
    .eq("id", id);

  // Zeilen komplett ersetzen (einfacher und robuster als Diffen).
  await supabase.from("rechnung_posten").delete().eq("rechnung_id", id);
  const zeilen = zeilenAusForm(fd);
  if (zeilen.length) {
    await supabase.from("rechnung_posten").insert(
      zeilen.map((z, i) => ({
        rechnung_id: id,
        bezeichnung: z.bezeichnung,
        menge: z.menge,
        einzelpreis: z.einzelpreis,
        position: i,
      })),
    );
  }

  revalidatePath(`/admin/rechnungen/${id}`);
  revalidatePath("/admin/rechnungen");
  redirect(`/admin/rechnungen/${id}`);
}

export async function rechnungStatus(fd: FormData) {
  const supabase = await client();
  const id = pflichtStr(fd, "id");
  await supabase
    .from("rechnungen")
    .update({ status: pflichtStr(fd, "status") })
    .eq("id", id);
  revalidatePath(`/admin/rechnungen/${id}`);
  revalidatePath("/admin/rechnungen");
}

export async function rechnungLoeschen(fd: FormData) {
  const supabase = await client();
  await supabase.from("rechnungen").delete().eq("id", pflichtStr(fd, "id"));
  revalidatePath("/admin/rechnungen");
  redirect("/admin/rechnungen");
}

/**
 * Rechnung als PDF per Resend an den Kunden senden. Schwere Abhängigkeiten
 * (react-pdf, resend) werden erst hier dynamisch geladen, nicht bei jeder
 * Aktion. Rückmeldung über einen Query-Parameter auf der Detailseite.
 */
/* ---- Einstellungen (Firma / Rechnung) ---- */
export async function einstellungenSpeichern(fd: FormData) {
  const supabase = await client();
  const { error } = await supabase.from("einstellungen").upsert({
    id: 1,
    firma: pflichtStr(fd, "firma") || "Klickhafen",
    eyebrow: str(fd, "eyebrow"),
    logo_zeigen: bool(fd, "logo_zeigen"),
    inhaber: pflichtStr(fd, "inhaber"),
    strasse: str(fd, "strasse"),
    plz: str(fd, "plz"),
    ort: str(fd, "ort"),
    email: str(fd, "email"),
    telefon: str(fd, "telefon"),
    web: str(fd, "web"),
    bank_inhaber: str(fd, "bank_inhaber"),
    iban: str(fd, "iban"),
    bic: str(fd, "bic"),
    bank_name: str(fd, "bank_name"),
    kleinunternehmer: bool(fd, "kleinunternehmer"),
    ust_satz: num(fd, "ust_satz") || 19,
    ust_id: str(fd, "ust_id"),
    steuernummer: str(fd, "steuernummer"),
    zahlungsziel_tage: Math.round(num(fd, "zahlungsziel_tage")) || 14,
    rechnung_fuss: str(fd, "rechnung_fuss"),
    aktualisiert: new Date().toISOString(),
  });
  revalidatePath("/admin/einstellungen");
  revalidatePath("/admin/rechnungen");
  // Häufigster Fehler: Migration supabase/einstellungen.sql noch nicht gelaufen.
  if (error) redirect("/admin/einstellungen?fehler=tabelle");
  redirect("/admin/einstellungen?gespeichert=1");
}

export async function rechnungSenden(fd: FormData) {
  const supabase = await client();
  const id = pflichtStr(fd, "id");
  const zielRedirect = (p: string) => redirect(`/admin/rechnungen/${id}?${p}`);

  if (!process.env.RESEND_API_KEY) {
    zielRedirect("hinweis=kein-resend");
  }

  const { rechnungDatenLaden } = await import("./rechnung-daten");
  const geladen = await rechnungDatenLaden(id);
  if (!geladen) zielRedirect("hinweis=nicht-gefunden");
  if (!geladen!.empfaengerEmail) zielRedirect("hinweis=keine-email");

  const { rechnungPdf } = await import("./rechnung-pdf");
  const { einstellungenLaden } = await import("./einstellungen");
  const { Resend } = await import("resend");
  const [pdf, e] = await Promise.all([
    rechnungPdf(geladen!.daten),
    einstellungenLaden(),
  ]);
  const absenderMail = e.email ?? "kontakt@klickhafen.com";

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? `${e.firma} <${absenderMail}>`,
    to: geladen!.empfaengerEmail!,
    subject: `Rechnung ${geladen!.daten.nummer} — ${e.firma}`,
    text: `Guten Tag,\n\nanbei die Rechnung ${geladen!.daten.nummer}.\n\nBeste Grüße\n${e.inhaber} · ${e.firma}`,
    attachments: [
      {
        filename: `Rechnung-${geladen!.daten.nummer}.pdf`,
        content: pdf.toString("base64"),
      },
    ],
  });

  if (error) {
    zielRedirect("hinweis=fehler");
  }

  await supabase.from("rechnungen").update({ status: "gesendet" }).eq("id", id);
  revalidatePath(`/admin/rechnungen/${id}`);
  revalidatePath("/admin/rechnungen");
  zielRedirect("hinweis=gesendet");
}
