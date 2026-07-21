import { createBrowserClient } from "@supabase/ssr";

/** Supabase-Client für Client-Komponenten (z. B. Logout-Button). */
export function supabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
