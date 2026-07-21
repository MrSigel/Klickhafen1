import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Zugangssperre für /admin (Next 16: „Proxy", früher Middleware; Node-Runtime).
 *
 * Bewusst nur ein OPTIMISTISCHER Schnellcheck plus Session-Auffrischung — die
 * Next-Doku rät ausdrücklich, die eigentliche Autorisierung NICHT allein hier
 * zu treffen. Jede Admin-Seite prüft zusätzlich `aktuellerNutzer()` inklusive
 * ADMIN_EMAIL.
 */
export async function proxy(request: NextRequest) {
  const pfad = request.nextUrl.pathname;

  // Die Login-Seite muss ohne Session erreichbar sein.
  const oeffentlich = pfad.startsWith("/admin/login");

  // Ohne Keys: durchlassen, damit der Setup-Bildschirm erscheint.
  const konfiguriert =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!konfiguriert) return NextResponse.next();

  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (zuSetzen) => {
          zuSetzen.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Session früh lesen — refresht die Cookies vor dem Rendern.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const erlaubt =
    user && user.email?.toLowerCase() === (process.env.ADMIN_EMAIL ?? "").toLowerCase();

  if (!erlaubt && !oeffentlich) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (erlaubt && pfad.startsWith("/admin/login")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: "/admin/:path*",
};
