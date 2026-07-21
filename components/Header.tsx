"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { posts } from "@/lib/blog";
import { referenzen } from "@/lib/referenzen";
import { services } from "@/lib/services";
import { CtaWhatsApp, Container, cx } from "./ui";
import { Logo } from "./Logo";

/**
 * Die Kopf-Navigation.
 *
 * Signature statt Standard: Der aktive/gehoverte Punkt bekommt KEINE gleitende
 * Unterstreichung (der KI-Default), sondern eine feine Akzent-Hairline ÜBER dem
 * Wort, die von links einwischt — eine „Peilmarke", die das Hairline-vor-
 * Eyebrow-Motiv der Marke aufgreift. Dazu datentreue Mono-Zähler (die Ziffer
 * kommt aus der Datenquelle, eine achte Leistung ändert sie von selbst).
 *
 * Der Header schwebt oben transparent über dem Hero und wird beim Scrollen
 * fest (Tiefwasser-Fläche + Hairline) — ein ruhiger, premiumtypischer Wechsel,
 * kein Effekt um des Effekts willen.
 */
type NavItem = { href: string; label: string; zaehler?: number };

const nav: NavItem[] = [
  { href: "/leistungen", label: "Leistungen", zaehler: services.length },
  { href: "/referenzen", label: "Referenzen", zaehler: referenzen.length },
  { href: "/blog", label: "Klartext", zaehler: posts.length },
  { href: "/philosophie", label: "Philosophie" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [offen, setOffen] = useState(false);
  const [gescrollt, setGescrollt] = useState(false);
  const [letzterPfad, setLetzterPfad] = useState(pathname);

  // Route gewechselt → Menü zu (Anpassung beim Render, kein Kaskadenrender).
  if (letzterPfad !== pathname) {
    setLetzterPfad(pathname);
    setOffen(false);
  }

  // Header wird fest, sobald man den obersten Rand verlässt.
  useEffect(() => {
    const beiScroll = () => setGescrollt(window.scrollY > 8);
    beiScroll();
    window.addEventListener("scroll", beiScroll, { passive: true });
    return () => window.removeEventListener("scroll", beiScroll);
  }, []);

  // Offenes Menü: Hintergrund nicht scrollen, Escape schließt.
  useEffect(() => {
    document.body.style.overflow = offen ? "hidden" : "";
    const beiTaste = (e: KeyboardEvent) => e.key === "Escape" && setOffen(false);
    if (offen) window.addEventListener("keydown", beiTaste);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", beiTaste);
    };
  }, [offen]);

  const fest = gescrollt || offen;

  return (
    <header
      className={cx(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        fest
          ? "border-line bg-paper/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6 md:h-20">
          <Logo />

          <nav
            aria-label="Hauptnavigation"
            className="hidden items-center gap-7 lg:flex xl:gap-9"
          >
            {nav.map((item) => {
              const aktiv = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={aktiv ? "page" : undefined}
                  className="group/nav relative flex items-start gap-1 py-1 text-small"
                >
                  {/* Die Peilmarke: Hairline über dem Wort, wischt von links ein. */}
                  <span
                    aria-hidden="true"
                    className={cx(
                      "absolute -top-1.5 left-0 h-px w-5 origin-left transition-transform duration-300 ease-out",
                      aktiv
                        ? "scale-x-100 bg-accent"
                        : "scale-x-0 bg-line-strong group-hover/nav:scale-x-100",
                    )}
                  />
                  <span
                    className={cx(
                      "transition-colors",
                      aktiv
                        ? "text-accent"
                        : "text-ink-soft group-hover/nav:text-ink",
                    )}
                  >
                    {item.label}
                  </span>
                  {item.zaehler && (
                    <>
                      <span
                        aria-hidden="true"
                        className={cx(
                          "font-mono text-[0.5625rem] leading-none transition-colors",
                          aktiv ? "text-accent" : "text-ink-faint",
                        )}
                      >
                        {item.zaehler}
                      </span>
                      <span className="sr-only">{` (${item.zaehler} Einträge)`}</span>
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-none items-center gap-2">
            {/* Pfeil erst ab sm: auf 360px würde er die Leiste überlaufen. */}
            <CtaWhatsApp
              className="px-4 py-2.5 md:px-5"
              pfeilClassName="hidden sm:block"
            >
              <span className="hidden sm:inline">Projekt besprechen</span>
              <span className="sm:hidden">Schreiben</span>
            </CtaWhatsApp>

            <button
              type="button"
              onClick={() => setOffen((v) => !v)}
              aria-expanded={offen}
              aria-controls="menue"
              className="-mr-2 flex size-10 items-center justify-center rounded-md text-ink transition-colors hover:text-accent lg:hidden"
            >
              <span className="sr-only">
                {offen ? "Menü schließen" : "Menü öffnen"}
              </span>
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="size-5"
              >
                {offen ? (
                  <path d="M4 4l12 12M16 4L4 16" />
                ) : (
                  <path d="M2 6h16M2 14h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobiles Menü — Logbuch-Stil: große Display-Punkte, dann die Register. */}
      {offen && (
        <div
          id="menue"
          className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
        >
          <Container className="py-8">
            <nav aria-label="Hauptnavigation mobil">
              <ul className="flex flex-col">
                {nav.map((item) => {
                  const aktiv = pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={aktiv ? "page" : undefined}
                        className={cx(
                          "flex items-baseline justify-between gap-4 border-b border-line py-4 font-display text-h2 transition-colors",
                          aktiv ? "text-accent" : "text-ink hover:text-accent",
                        )}
                      >
                        {item.label}
                        {item.zaehler && (
                          <span
                            aria-hidden="true"
                            className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint"
                          >
                            {item.zaehler}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <p className="eyebrow mt-9">Ausrüstung</p>
              <ul className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/leistungen/${s.slug}`}
                      className="block py-2.5 text-small text-ink-soft transition-colors hover:text-accent"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="eyebrow mt-9">Im Logbuch</p>
              <ul className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {referenzen.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-baseline justify-between gap-3 py-2.5 text-small text-ink-soft transition-colors hover:text-accent"
                    >
                      {r.name}
                      <span className="font-mono text-[0.625rem] text-ink-faint">
                        {r.domain}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
