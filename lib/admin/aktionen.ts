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
export async function rechnungAnlegen(fd: FormData) {
  const supabase = await client();
  const projektId = str(fd, "projekt_id");

  // Kunde aus dem Projekt ziehen, damit die Rechnungsanschrift stimmt.
  let kundeId: string | null = null;
  if (projektId) {
    const { data } = await supabase
      .from("projekte")
      .select("kunde_id")
      .eq("id", projektId)
      .single();
    kundeId = data?.kunde_id ?? null;
  }

  const { data: rechnung } = await supabase
    .from("rechnungen")
    .insert({
      projekt_id: projektId,
      kunde_id: kundeId,
      nummer: pflichtStr(fd, "nummer"),
      datum: str(fd, "datum") ?? undefined,
      faellig: str(fd, "faellig"),
      notiz: str(fd, "notiz"),
      status: "entwurf",
    })
    .select("id")
    .single();

  // Ausgewählte Einnahme-Posten des Projekts als Rechnungszeilen übernehmen.
  const postenIds = fd.getAll("posten").map(String);
  if (rechnung?.id && postenIds.length && projektId) {
    const { data: posten } = await supabase
      .from("posten")
      .select("id, bezeichnung, betrag")
      .in("id", postenIds);
    if (posten?.length) {
      await supabase.from("rechnung_posten").insert(
        posten.map((p, i) => ({
          rechnung_id: rechnung.id,
          bezeichnung: p.bezeichnung,
          menge: 1,
          einzelpreis: p.betrag,
          position: i,
        })),
      );
    }
  }

  revalidatePath("/admin/rechnungen");
  if (rechnung?.id) redirect(`/admin/rechnungen/${rechnung.id}`);
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
  const { Resend } = await import("resend");
  const pdf = await rechnungPdf(geladen!.daten);

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? "kontakt@klickhafen.com",
    to: geladen!.empfaengerEmail!,
    subject: `Rechnung ${geladen!.daten.nummer} — Klickhafen`,
    text: `Guten Tag,\n\nanbei die Rechnung ${geladen!.daten.nummer}.\n\nBeste Grüße\nEnrico Gross · Klickhafen`,
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
