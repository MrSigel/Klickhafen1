import type { Metadata } from "next";

/**
 * Admin-Layout: privater CRM-Bereich. Bewusst noindex/nofollow — dieser Teil
 * gehört in keine Suchmaschine. Er erbt NICHT die Marketing-Navigation
 * (die liegt in app/(site)/layout.tsx).
 *
 * Die eigentliche Hülle mit Seitenleiste ist components/admin/AdminShell.tsx;
 * die Login-Seite kommt bewusst ohne sie aus.
 */
export const metadata: Metadata = {
  title: "CRM",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-paper text-ink">{children}</div>;
}
