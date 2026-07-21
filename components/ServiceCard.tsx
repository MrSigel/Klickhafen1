import Link from "next/link";
import type { Service } from "@/lib/services";
import { ArrowRight } from "./ui";

/**
 * Karte im Hausdesign: Hairline-Rahmen, dezenter Radius, kein Drop-Shadow.
 * Auf dunklem Grund trägt eine Schattenkante nicht — die Elevation entsteht
 * durch eine minimal gehobene Fläche (paper-lift) plus Akzent-Hairline.
 * Die ganze Karte ist ein Link: größere Trefferfläche, ein Tab-Stopp.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/leistungen/${service.slug}`}
      className="group flex h-full flex-col justify-between gap-8 rounded-lg border border-line bg-paper-sunk p-7 transition-colors duration-300 hover:border-accent hover:bg-paper-lift"
    >
      <div>
        <h3 className="font-display text-h3 text-ink transition-colors group-hover:text-accent">
          {service.name}
        </h3>
        <p className="mt-3 text-small text-ink-soft">{service.claim}</p>
      </div>

      <span className="flex items-center gap-2 font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase transition-colors group-hover:text-accent">
        Kurs ansehen
        <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
