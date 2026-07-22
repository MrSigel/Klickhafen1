import Link from "next/link";
import type { ReactNode } from "react";
import { Anker } from "@/components/Anker";
import { cx } from "@/components/ui";
import { LogoutButton } from "./LogoutButton";

const nav = [
  { href: "/admin", label: "Übersicht" },
  { href: "/admin/kunden", label: "Kunden" },
  { href: "/admin/projekte", label: "Projekte" },
  { href: "/admin/ausgaben", label: "Ausgaben" },
  { href: "/admin/rechnungen", label: "Rechnungen" },
  { href: "/admin/einstellungen", label: "Einstellungen" },
];

/**
 * Die Hülle des CRM: schmale Seitenleiste links, Inhalt rechts. Bewusst nüchtern
 * und funktional — das ist dein Arbeitswerkzeug, kein Verkaufsauftritt.
 * `aktiv` markiert den aktuellen Bereich (vom Aufrufer übergeben, da
 * Server-Komponente den Pfad nicht kennt).
 */
export function AdminShell({
  aktiv,
  titel,
  children,
}: {
  aktiv?: string;
  titel: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[100rem] flex-col lg:flex-row">
      <aside className="flex flex-none flex-col border-b border-line bg-paper-sunk lg:w-60 lg:border-r lg:border-b-0">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <span className="flex size-8 items-center justify-center rounded-md border border-accent/30 bg-accent/10">
            <Anker className="size-4 text-accent" />
          </span>
          <span className="font-display text-h3">Klickhafen</span>
          <span className="ml-1 font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
            CRM
          </span>
        </div>

        <nav aria-label="CRM-Navigation" className="flex gap-1 px-3 pb-3 lg:flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={aktiv === item.href ? "page" : undefined}
              className={cx(
                "rounded-md px-3 py-2 text-small transition-colors",
                aktiv === item.href
                  ? "bg-accent/12 text-accent"
                  : "text-ink-soft hover:bg-paper-lift hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto hidden px-5 py-4 lg:block">
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 px-5 py-8 md:px-8 md:py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="font-display text-h1">{titel}</h1>
          <div className="lg:hidden">
            <LogoutButton />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
