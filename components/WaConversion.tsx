"use client";

import { useEffect } from "react";

/**
 * Google-Ads-Conversion für den WhatsApp-Funnel.
 *
 * Es gibt kein Kontaktformular — die „Kontaktaufnahme" IST der WhatsApp-Klick.
 * Damit Google Ads diese Aktion zählen kann, braucht die Kampagne eine Seite,
 * die nach der Kontaktaufnahme lädt. Also: Beim Klick auf einen wa.me-Link
 * öffnen wir WhatsApp in einem neuen Tab UND leiten den aktuellen Tab auf
 * /danke. Der Aufruf von /danke ist das Conversion-Signal.
 *
 * Bewusst als globaler Listener (Event-Delegation) statt an jedem Button —
 * so gilt es für ALLE WhatsApp-CTAs (Header, Hero, Footer, Leistungsseiten …),
 * ohne dass eine Stelle vergessen wird. Ohne JavaScript bleibt der Link ein
 * normaler wa.me-Link: WhatsApp öffnet trotzdem, nur ohne Zählung.
 *
 * WICHTIG: Alle wa.me-Links tragen target="_blank" (ui.tsx, Footer.tsx). Wir
 * verhindern den Klick NICHT — der Browser öffnet WhatsApp nativ im neuen Tab
 * (popup-blocker-sicher). Wir leiten nur den aktuellen Tab kurz danach auf
 * /danke. Neue WhatsApp-Links müssen target="_blank" behalten, sonst würde der
 * aktuelle Tab zu wa.me navigieren, bevor /danke greift.
 */
export function WaConversion() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      // Modifikator-Klicks (Strg/Cmd/Shift/Alt, Mittelklick) unangetastet lassen —
      // damit "in neuem Tab öffnen" des Nutzers weiter funktioniert.
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const ziel = e.target as Element | null;
      const link = ziel?.closest?.(
        'a[href^="https://wa.me/"]',
      ) as HTMLAnchorElement | null;
      if (!link) return;

      // Auf der Danke-Seite selbst NICHT erneut umleiten — dort soll der
      // Fallback-Button WhatsApp einfach normal öffnen (keine Zähl-Schleife).
      if (window.location.pathname === "/danke") return;

      // Klick NICHT verhindern: target="_blank" öffnet WhatsApp nativ im neuen
      // Tab. Kurz danach den aktuellen Tab auf /danke leiten (Conversion) —
      // der kleine Verzug stellt sicher, dass der neue Tab zuerst committed.
      setTimeout(() => {
        window.location.assign("/danke");
      }, 120);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
