import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { WaConversion } from "@/components/WaConversion";
import {
  localBusinessSchema,
  organizationSchema,
  personSchema,
  websiteSchema,
} from "@/lib/seo";

/**
 * Layout des öffentlichen Auftritts: die Marketing-Navigation (Header, Footer)
 * und die globalen strukturierten Daten. Bewusst getrennt vom Root-Layout,
 * damit der private Bereich unter /admin diese Hülle NICHT bekommt.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* personSchema() liefert null ohne Nachnamen — filter hält es dann raus. */}
      <JsonLd
        schema={[
          organizationSchema(),
          localBusinessSchema(),
          websiteSchema(),
          personSchema(),
        ].filter((s) => s !== null)}
      />

      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-99 focus:rounded-md focus:bg-accent focus:px-5 focus:py-3 focus:text-small focus:text-accent-ink"
      >
        Direkt zum Inhalt
      </a>

      <WaConversion />

      <Header />
      <main id="inhalt" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
