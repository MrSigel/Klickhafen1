import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Ist Supabase überhaupt eingerichtet? Solange die Keys fehlen, zeigt der
 * Admin-Bereich einen Setup-Bildschirm statt zu crashen — so baut und rendert
 * alles auch ohne verbundene Datenbank.
 */
export function supabaseKonfiguriert(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** Die erlaubte Login-Adresse. Alles andere wird abgewiesen. */
export function adminEmail(): string {
  return (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
}

/**
 * Supabase-Client für Server-Komponenten und Server-Actions. cookies() ist in
 * Next 16 asynchron. setAll darf in reinen Server-Komponenten fehlschlagen
 * (dort sind Cookies read-only) — das Auffrischen der Session übernimmt proxy.ts.
 */
export async function supabaseServer() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (zuSetzen) => {
          try {
            zuSetzen.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server-Komponente: kein Schreibzugriff — proxy.ts kümmert sich.
          }
        },
      },
    },
  );
}

/**
 * Der eingeloggte Nutzer, ODER null. Zusätzlich zur proxy-Sperre wird hier die
 * ADMIN_EMAIL erzwungen — die Next-Doku rät ausdrücklich, die Autorisierung
 * NICHT allein dem Proxy zu überlassen.
 */
export async function aktuellerNutzer() {
  if (!supabaseKonfiguriert()) return null;
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  if (user.email?.toLowerCase() !== adminEmail()) return null;
  return user;
}
