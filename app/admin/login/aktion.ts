"use server";

import { redirect } from "next/navigation";
import {
  adminEmail,
  supabaseKonfiguriert,
  supabaseServer,
} from "@/lib/admin/supabase";

export type LoginErgebnis = { fehler: string } | null;

/**
 * Anmeldung per E-Mail + Passwort. Den Nutzer legst du direkt in Supabase an
 * (Authentication → Users). Zugang nur für die in ADMIN_EMAIL hinterlegte
 * Adresse — jede andere wird abgewiesen. Bei Erfolg setzt Supabase die
 * Session-Cookies (Server-Action darf schreiben) und wir leiten ins CRM.
 */
export async function anmelden(
  _prev: LoginErgebnis,
  formData: FormData,
): Promise<LoginErgebnis> {
  if (!supabaseKonfiguriert()) {
    return { fehler: "Supabase ist noch nicht eingerichtet." };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("passwort") ?? "");

  // Neutrale Meldung — verrät nicht, ob E-Mail oder Passwort falsch war.
  const abweisen = { fehler: "E-Mail oder Passwort ist falsch." };

  if (!email || !password || email !== adminEmail()) {
    return abweisen;
  }

  const supabase = await supabaseServer();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return abweisen;
  }

  redirect("/admin");
}
