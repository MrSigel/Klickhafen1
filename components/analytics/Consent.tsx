"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * DSGVO-/TDDDG-konformes Consent-Banner für das Google-Ads-Conversion-Tracking.
 *
 * Der Google-Tag (components/analytics/GoogleTag.tsx) startet mit Consent
 * „denied". Erst „Akzeptieren" schaltet die Messung über gtag('consent','update')
 * frei; die Wahl wird in localStorage gemerkt, damit das Banner nicht bei jedem
 * Besuch erscheint. „Ablehnen" hält alles aus. Der Widerruf ist über den
 * Fußzeilen-Link „Cookie-Einstellungen" jederzeit möglich (Event kh:consent-open).
 */

const KEY = "kh-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function setzen(status: "granted" | "denied") {
  try {
    localStorage.setItem(KEY, status);
  } catch {
    /* localStorage evtl. blockiert — dann greift nur die aktuelle Sitzung */
  }
  window.gtag?.("consent", "update", {
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
    analytics_storage: status,
  });
}

export function ConsentBanner() {
  const [zeigen, setZeigen] = useState(false);

  useEffect(() => {
    let gewaehlt: string | null = null;
    try {
      gewaehlt = localStorage.getItem(KEY);
    } catch {
      gewaehlt = null;
    }
    // Einmaliger localStorage-Abgleich beim Mount (SSR kennt localStorage nicht,
    // daher bewusst im Effect statt als Initialwert).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!gewaehlt) setZeigen(true);

    const oeffnen = () => setZeigen(true);
    window.addEventListener("kh:consent-open", oeffnen);
    return () => window.removeEventListener("kh:consent-open", oeffnen);
  }, []);

  if (!zeigen) return null;

  const entscheiden = (status: "granted" | "denied") => {
    setzen(status);
    setZeigen(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Hinweis zu Cookies und Werbung"
      className="fixed inset-x-0 bottom-0 z-100 border-t border-line bg-paper-sunk/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-[92rem] flex-col gap-4 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <p className="max-w-[72ch] text-small text-ink-soft">
          Diese Seite misst mit dem Google-Tag den Erfolg von Werbeanzeigen
          (Google Ads) — aber nur mit Ihrer Einwilligung. Ohne Zustimmung werden
          keine Werbe-Cookies gesetzt. Details in der{" "}
          <Link
            href="/datenschutz"
            className="text-accent underline underline-offset-4 hover:text-accent-hover"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>
        <div className="flex flex-none gap-3">
          <button
            type="button"
            onClick={() => entscheiden("denied")}
            className="rounded-md border border-ink-faint px-5 py-2.5 text-small text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Ablehnen
          </button>
          <button
            type="button"
            onClick={() => entscheiden("granted")}
            className="rounded-md border border-accent bg-accent px-5 py-2.5 text-small font-medium text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

/** Fußzeilen-Schalter, der das Banner erneut öffnet (Widerruf/Änderung). */
export function CookieEinstellungen({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("kh:consent-open"))}
      className={
        className ??
        "font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase transition-colors hover:text-accent"
      }
    >
      Cookie-Einstellungen
    </button>
  );
}
