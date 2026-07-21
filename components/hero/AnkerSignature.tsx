"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnkerFallback } from "./AnkerFallback";

/**
 * ssr: false ist laut Next-16-Doku nur in Client Components erlaubt —
 * deshalb liegt der dynamische Import hier und nicht in app/page.tsx.
 * Das hält three.js komplett aus dem initialen Bundle und aus dem HTML.
 */
const AnkerScene = dynamic(() => import("./AnkerScene"), {
  ssr: false,
  loading: () => <AnkerFallback />,
});

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Führt die Arbeit aus, sobald der Browser Luft hat. requestIdleCallback gibt
 * es in Safari erst spät — dort ein kurzer Timer als Ersatz. Das `timeout`
 * sorgt dafür, dass die Szene auch auf dauerbeschäftigten Seiten kommt.
 */
function beiLeerlauf(arbeit: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(arbeit, { timeout: 2500 });
  } else {
    window.setTimeout(arbeit, 900);
  }
}

/** Kein WebGL → three.js gar nicht erst laden. */
function hatWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

export function AnkerSignature() {
  const huelle = useRef<HTMLDivElement>(null);
  /** Einmal true, bleibt true — three.js soll nicht mehrfach geladen werden. */
  const [laden, setLaden] = useState(false);
  /** Steuert, ob die Szene rendert. Weggescrollt = kein Frame mehr. */
  const [imBild, setImBild] = useState(false);

  useEffect(() => {
    const el = huelle.current;
    if (!el) return;

    // matchMedia direkt statt useReducedMotion(): der Hook ist dreiwertig
    // (null, solange nicht ermittelt) und blockiert das Laden sonst dauerhaft.
    const mq = window.matchMedia(REDUCED_MOTION);
    let beobachter: IntersectionObserver | undefined;

    const pruefen = () => {
      beobachter?.disconnect();
      beobachter = undefined;

      // Wer keine Bewegung will, bekommt dauerhaft das statische Bild.
      if (mq.matches || !hatWebGL()) {
        setLaden(false);
        setImBild(false);
        return;
      }

      // Der Beobachter bleibt bestehen: er entscheidet nicht nur, wann geladen
      // wird, sondern hält die Szene auch an, sobald sie aus dem Bild ist.
      beobachter = new IntersectionObserver(
        ([eintrag]) => {
          setImBild(eintrag.isIntersecting);
          // Sichtbar reicht NICHT als Startsignal: Der Hero steht beim
          // Seitenaufruf im Bild, three.js würde also sofort laden und den
          // Hauptthread belegen, während die Display-Schrift für das
          // LCP-Element (die H1) lädt. Gemessen kostete das spürbar LCP.
          // Deshalb zusätzlich auf Leerlauf warten — das statische SVG steht
          // ja bereits, es fehlt nur die Bewegung.
          if (eintrag.isIntersecting) beiLeerlauf(() => setLaden(true));
        },
        { rootMargin: "200px" },
      );
      beobachter.observe(el);
    };

    pruefen();
    mq.addEventListener("change", pruefen);

    return () => {
      beobachter?.disconnect();
      mq.removeEventListener("change", pruefen);
    };
  }, []);

  return (
    // Auf Mobile bewusst klein: die Signature ist quadratisch und fraß dort
    // 375px Höhe — sie schob CTA und Beleg unter die Falzlinie. Sie darf
    // Atmosphäre liefern, aber nicht das Verkaufsargument verdrängen.
    <div
      ref={huelle}
      className="relative aspect-square w-full max-w-[17rem] sm:max-w-[24rem] lg:max-w-[32rem] [contain:layout_paint]"
    >
      {laden ? <AnkerScene aktiv={imBild} /> : <AnkerFallback />}
    </div>
  );
}
