import Link from "next/link";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { WHATSAPP_NUMMER_LESBAR, waLink, waZusatz } from "@/lib/whatsapp";
import { Anker } from "./Anker";
import { Container } from "./ui";

const hafenmeisterei = [
  { href: "/webdesign-castrop-rauxel", label: "Webdesign Castrop-Rauxel" },
  { href: "/referenzen", label: "Referenzen" },
  { href: "/blog", label: "Klartext" },
  { href: "/philosophie", label: "Philosophie" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-deep">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 font-display text-h3 text-ink">
              <span className="flex size-9 flex-none items-center justify-center rounded-[0.5rem] border border-accent/30 bg-accent/10">
                <Anker className="size-[1.15rem] text-accent" />
              </span>
              Klickhafen
            </div>
            <p className="mt-4 max-w-[38ch] text-small text-ink-soft">
              {site.slogan} Projekte legen an, werden ausgerüstet und laufen wieder
              aus — aus {site.adresse.ort} ins Ruhrgebiet und darüber hinaus.
            </p>

            {/* Vollständige Anschrift auf jeder Seite (NAP-Konsistenz) — ein
                echtes lokales Ranking- und Vertrauenssignal. address-Element
                mit Mikroformat-Klassen. */}
            <address className="mt-6 text-small text-ink-soft not-italic">
              <span className="font-medium text-ink">Klickhafen</span>
              <br />
              {site.adresse.strasse}
              <br />
              {site.adresse.plz} {site.adresse.ort}
              <br />
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
              >
                {WHATSAPP_NUMMER_LESBAR} — per WhatsApp
                <span className="sr-only">{waZusatz()}</span>
              </a>
            </address>
          </div>

          <nav aria-label="Leistungen" className="md:col-span-4">
            <h2 className="eyebrow">Leistungen</h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/leistungen/${s.slug}`}
                    className="text-small text-ink-soft transition-colors hover:text-accent"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Weitere Seiten" className="md:col-span-3">
            <h2 className="eyebrow">Hafenmeisterei</h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {hafenmeisterei.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-small text-ink-soft transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-small text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.adresse.ort},{" "}
            {site.adresse.regionKurz}
          </p>
          <p className="font-mono text-eyebrow tracking-[0.12em] uppercase">
            {site.domain}
          </p>
        </div>
      </Container>
    </footer>
  );
}
