"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import type { Faq as FaqItem } from "@/lib/services";
import { cx } from "./ui";

/**
 * Eine aufklappbare FAQ-Zeile mit weicher Höhenanimation.
 *
 * Warum nicht mehr das native <details>: Das klappt schlagartig um, weil es
 * keine Höhe animieren kann. Diese Fassung nutzt den grid-rows-Trick
 * (0fr → 1fr), der sich sauber überblenden lässt.
 *
 * Zwei Dinge bleiben bewusst erhalten:
 * 1. Die Antwort steht IMMER im DOM (nur per overflow geklippt), nicht erst
 *    nach dem Klick. Das ist der AEO/GEO-Punkt — Crawler lesen den Text auch
 *    im zugeklappten Zustand.
 * 2. Bei prefers-reduced-motion läuft es sofort auf: die globale Regel in
 *    globals.css setzt jede transition-duration auf ~0. Keine Extrabehandlung.
 *
 * Barrierefreiheit: ein echter Button mit aria-expanded/aria-controls. Im
 * zugeklappten Zustand macht `inert` den geklippten Text für Tastatur und
 * Screenreader unsichtbar — im DOM bleibt er trotzdem.
 */
export function FaqEintrag({
  item,
  delay = 0,
}: {
  item: FaqItem;
  delay?: number;
}) {
  const [offen, setOffen] = useState(false);
  const reduce = useReducedMotion();
  const antwortId = useId();

  // Der Scroll-Reveal sitzt bewusst HIER auf dem Gruppen-div, nicht in einem
  // zusätzlichen Wrapper außen herum: Eine <dl> darf ihre <dt>/<dd> nur über
  // EINE div-Ebene schachteln. Ein extra Wrapper macht die Liste ungültig und
  // Screenreader verlieren den Bezug „Frage gehört zu Antwort".
  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <motion.div {...anim} className="group border-b border-line first:border-t">
      <dt>
        <button
          type="button"
          onClick={() => setOffen((v) => !v)}
          aria-expanded={offen}
          aria-controls={antwortId}
          className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left"
        >
          <span
            className={cx(
              "font-display text-h3 transition-colors",
              offen ? "text-accent" : "text-ink group-hover:text-accent",
            )}
          >
            {item.frage}
          </span>
          <span
            aria-hidden="true"
            className="mt-1.5 flex size-5 flex-none items-center justify-center"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={cx(
                "size-4 text-accent transition-transform duration-300 ease-out",
                offen && "rotate-45",
              )}
            >
              <path d="M8 2v12M2 8h12" />
            </svg>
          </span>
        </button>
      </dt>

      {/* Der grid-rows-Trick: die Zeile fährt von 0fr auf 1fr, das innere
          overflow-hidden klippt weich mit. Kein max-height-Raten. */}
      <dd
        id={antwortId}
        className={cx(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          offen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden" inert={!offen}>
          <p className="max-w-[68ch] pr-6 pb-6 text-ink-soft">{item.antwort}</p>
        </div>
      </dd>
    </motion.div>
  );
}
