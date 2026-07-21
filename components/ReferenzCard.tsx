import Image from "next/image";
import Link from "next/link";
import type { Referenz } from "@/lib/referenzen";
import { getService } from "@/lib/services";
import { Anker } from "./Anker";
import { ArrowUpRight } from "./ui";

/**
 * Die Vorschau. Liegt ein echter Screenshot vor, wird er gezeigt.
 * Sonst eine typografische Platte — bewusst KEINE nachgebaute
 * Fake-Browserzeile: eine erfundene Vorschau wäre eine Behauptung
 * über fremde Arbeit, die Platte ist ehrlich und trägt trotzdem.
 */
function Vorschau({ referenz }: { referenz: Referenz }) {
  if (referenz.bild) {
    return (
      <Image
        src={`/referenzen/${referenz.bild}`}
        alt={`Startseite von ${referenz.name} — ${referenz.branche}`}
        width={1280}
        height={800}
        className="size-full object-cover object-top"
        sizes="(max-width: 1024px) 100vw, 45vw"
      />
    );
  }

  return (
    <div className="relative flex size-full flex-col justify-between overflow-hidden bg-paper-deep p-7">
      <div className="schein -top-16 -right-16 size-56" />

      <Anker className="relative size-5 text-accent/50" />

      <div className="relative">
        <p className="font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
          {referenz.domain}
        </p>
        <p className="mt-2 font-display text-h2 text-ink">{referenz.name}</p>
      </div>
    </div>
  );
}

export function ReferenzCard({
  referenz,
  index,
}: {
  referenz: Referenz;
  index: number;
}) {
  // Abwechselnd gespiegelt: bricht das Raster auf, ohne dass es beliebig wird.
  const gespiegelt = index % 2 === 1;

  return (
    <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <Link
        href={referenz.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${referenz.name} in neuem Tab öffnen (${referenz.domain})`}
        className={`relative aspect-16/10 overflow-hidden rounded-lg border border-line transition-colors duration-300 hover:border-accent lg:col-span-7 ${
          gespiegelt ? "lg:order-2" : ""
        }`}
      >
        <Vorschau referenz={referenz} />
      </Link>

      <div className={`lg:col-span-5 ${gespiegelt ? "lg:order-1" : ""}`}>
        <p className="eyebrow">{referenz.branche}</p>

        <h3 className="mt-5 text-h1 text-balance">
          <Link
            href={referenz.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            {referenz.name}
          </Link>
        </h3>

        <p className="mt-4 max-w-[52ch] text-ink-soft">{referenz.claim}</p>

        <p className="mt-5 max-w-[52ch] text-small text-ink-soft">
          {referenz.aufgabe}
        </p>

        {referenz.ergebnis && (
          <p className="mt-5 text-small text-accent">{referenz.ergebnis}</p>
        )}

        {/* Interne Verlinkung: jede Referenz zeigt auf die Leistungen, die drinstecken. */}
        <ul className="mt-7 flex flex-wrap gap-2">
          {referenz.leistungen.map((slug) => {
            const service = getService(slug);
            if (!service) return null;
            return (
              <li key={slug}>
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="inline-block rounded-md border border-line px-3 py-1.5 font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase transition-colors hover:border-accent hover:text-accent"
                >
                  {service.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href={referenz.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-small text-accent transition-colors hover:text-accent-hover"
        >
          Live ansehen
          <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
