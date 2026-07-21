import type { Metadata } from "next";
import type { BlogPost } from "./blog";
import { services } from "./services";
import { site } from "./site";
import type { Service } from "./services";

/**
 * Ergänzt seitenspezifische Keywords um die lokale Basis, ohne Dubletten.
 * Bewusst knapp — ein Keyword-Meta mit 40 Begriffen ist ein Spam-Signal.
 */
export function keywordsFuer(...extra: string[]): string[] {
  return [...new Set([...extra, ...site.keywords])].slice(0, 12);
}

/**
 * Baut die Metadata einer Seite. `path` ist immer der kanonische Pfad
 * ab Root ("/" oder "/leistungen/webdesign") — metadataBase steht im Layout,
 * relative Pfade sind hier deshalb korrekt und gewollt.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
  rss = false,
  hatEigenesOgBild = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  /** Verweist im <head> auf den RSS-Feed — nur für Blog-Seiten sinnvoll. */
  rss?: boolean;
  /**
   * Setzen, wenn die Route ein EIGENES opengraph-image.tsx hat (Leistungs- und
   * Blog-Detailseiten). Dann setzt buildMetadata KEIN images-Feld — sonst würde
   * das generische Markenbild das seitenspezifische überschreiben (die
   * explizite images-Angabe in den Metadaten hat Vorrang vor der Datei-Route).
   */
  hatEigenesOgBild?: boolean;
}): Metadata {
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: path,
      ...(rss
        ? {
            types: {
              "application/rss+xml": `${site.url}/blog/rss.xml`,
            },
          }
        : {}),
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      // Marken-OG-Bild als Standard für Seiten OHNE eigenes Bild. Die
      // Detailseiten (hatEigenesOgBild) lassen es weg, damit ihr eigenes
      // opengraph-image.tsx greift. Ohne diese Zeile hätten die Übersichts-
      // seiten gar kein og:image — das Wurzelbild wird nicht vererbt, sobald
      // eine Seite ihr eigenes openGraph-Objekt setzt.
      ...(hatEigenesOgBild
        ? {}
        : { images: [{ url: "/opengraph-image", width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(hatEigenesOgBild ? {} : { images: ["/twitter-image"] }),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ------------------------------------------------------------------
   JSON-LD Builder. Rendern über <JsonLd> — nie direkt einbetten.
   ------------------------------------------------------------------ */

const ORGANIZATION_ID = `${site.url}/#organization`;
const PERSON_ID = `${site.url}/#person`;

/** Vollständiger Name — leer, solange der Nachname in site.ts fehlt. */
function personName(): string {
  return [site.person.vorname, site.person.nachname].filter(Boolean).join(" ");
}

/**
 * Person-Schema für E-E-A-T: Suchmaschinen und KI-Systeme wollen wissen, WER
 * hinter den Aussagen steht. Wird bewusst NUR ausgegeben, wenn der Nachname
 * gepflegt ist — ein Autorenprofil mit halbem Namen schadet mehr, als es nützt.
 */
export function personSchema() {
  if (!site.person.nachname) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: personName(),
    givenName: site.person.vorname,
    familyName: site.person.nachname,
    jobTitle: site.person.rolle,
    worksFor: { "@id": ORGANIZATION_ID },
    url: `${site.url}/philosophie`,
    knowsAbout: [
      "Webdesign",
      "Webentwicklung",
      "Suchmaschinenoptimierung",
      "Conversion-Optimierung",
      "Prozessautomatisierung",
    ],
    // Vollständige Anschrift (dieselbe wie Organization) — konsistent statt
    // halb. ORT_ADRESSE wird erst beim Aufruf ausgewertet, nicht beim Laden.
    address: ORT_ADRESSE(),
  };
}

/**
 * WebSite-Schema. Bewusst OHNE potentialAction/SearchAction: Es gibt auf
 * dieser Seite keine Suche. Eine SearchAction zu behaupten, die ins Leere
 * läuft, ist eine Lüge gegenüber dem Crawler.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "de-DE",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** Gemeinsamer WhatsApp-Kontaktpunkt für Organization und LocalBusiness. */
function contactPoint() {
  return {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: site.telefon,
    email: site.email,
    availableLanguage: ["de"],
    areaServed: "DE",
  };
}

/**
 * Vollständige Postanschrift. streetAddress/postalCode nur, wenn gepflegt —
 * eine halbe Adresse im Schema ist für lokales SEO wertlos.
 */
const ORT_ADRESSE = () => ({
  "@type": "PostalAddress",
  ...(site.adresse.strasse ? { streetAddress: site.adresse.strasse } : {}),
  ...(site.adresse.plz ? { postalCode: site.adresse.plz } : {}),
  addressLocality: site.adresse.ort,
  addressRegion: site.adresse.regionKurz,
  addressCountry: site.adresse.land,
});

export function organizationSchema() {
  const name = personName();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.name,
    alternateName: "Klickhafen Webdesign",
    url: site.url,
    description: site.description,
    slogan: site.slogan,
    email: site.email,
    telephone: site.telefon,
    // Logo als raster-taugliches PNG (Apple-Icon-Route); image als OG-Bild.
    logo: `${site.url}/apple-icon`,
    image: `${site.url}/opengraph-image`,
    knowsAbout: [
      "Webdesign",
      "Webentwicklung",
      "Suchmaschinenoptimierung",
      "Conversion-Optimierung",
      "Prozessautomatisierung",
      "Funnel-Marketing",
    ],
    // sameAs nur, wenn echte Profile hinterlegt sind — ein leeres Array wäre
    // wertlos, ein erfundenes Profil ein Vertrauensschaden.
    ...(site.sozialprofile.length ? { sameAs: site.sozialprofile } : {}),
    contactPoint: contactPoint(),
    foundingLocation: { "@type": "Place", name: site.adresse.ort },
    areaServed: site.einzugsgebiet.map((n) => ({ "@type": "Place", name: n })),
    // Verweist auf das Person-Schema, sobald es existiert — sonst nur der
    // Vorname, den ich belegen kann.
    founder: site.person.nachname
      ? { "@id": PERSON_ID }
      : { "@type": "Person", name: site.person.vorname },
    ...(name ? { employee: { "@id": PERSON_ID } } : {}),
    numberOfEmployees: { "@type": "QuantitativeValue", value: 1 },
    knowsLanguage: ["de"],
    address: ORT_ADRESSE(),
  };
}

/** ItemList der Leistungen — für die Übersichtsseite. */
export function leistungenListeSchema(alle: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${site.url}/leistungen/#liste`,
    name: "Leistungen von Klickhafen",
    numberOfItems: alle.length,
    itemListElement: alle.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": `${site.url}/leistungen/${s.slug}/#service`,
        name: s.name,
        description: s.claim,
        url: `${site.url}/leistungen/${s.slug}`,
        provider: { "@id": ORGANIZATION_ID },
      },
    })),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    url: site.url,
    description: site.description,
    image: `${site.url}/opengraph-image`,
    telephone: site.telefon,
    email: site.email,
    parentOrganization: { "@id": ORGANIZATION_ID },
    contactPoint: contactPoint(),
    address: ORT_ADRESSE(),
    // Kartenlink (Suche nach der Anschrift) — hilft bei der lokalen Zuordnung.
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${site.adresse.strasse}, ${site.adresse.plz} ${site.adresse.ort}`,
    )}`,
    // geo nur, wenn exakte Koordinaten gepflegt sind — falsche Koordinaten
    // sind ein stärkeres Negativsignal als gar keine.
    ...(site.adresse.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: site.adresse.geo.lat,
            longitude: site.adresse.geo.lng,
          },
        }
      : {}),
    areaServed: site.einzugsgebiet.map((name) => ({ "@type": "Place", name })),
    knowsLanguage: ["de"],
    // Der Leistungskatalog macht einer generativen Engine in einem Objekt klar,
    // was hier angeboten wird — ohne dass sie sich durch sieben Seiten liest.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leistungen",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${site.url}/leistungen/${s.slug}/#service`,
          name: s.name,
          url: `${site.url}/leistungen/${s.slug}`,
        },
      })),
    },
  };
}

/**
 * Schema für die lokale Landingpage: ein Service, der explizit auf
 * Castrop-Rauxel und die Nachbarorte zeigt. Kein Doorway-Trick — es gibt genau
 * eine solche Seite, mit eigenem Inhalt.
 */
export function lokalServiceSchema({
  name,
  description,
  path,
  orte,
}: {
  name: string;
  description: string;
  path: string;
  orte: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${path}/#service`,
    name,
    description,
    serviceType: "Webdesign",
    url: `${site.url}${path}`,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: orte.map((n) => ({ "@type": "City", name: n })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${site.url}${path}`,
      availableLanguage: { "@type": "Language", name: "Deutsch", alternateName: "de" },
    },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/leistungen/${service.slug}/#service`,
    name: service.name,
    alternateName: service.h1,
    description: service.description,
    url: `${site.url}/leistungen/${service.slug}`,
    serviceType: service.name,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: site.einzugsgebiet.map((name) => ({ "@type": "Place", name })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${site.url}/leistungen/${service.slug}`,
      availableLanguage: { "@type": "Language", name: "Deutsch", alternateName: "de" },
    },
  };
}

export function blogPostingSchema(post: BlogPost) {
  const url = `${site.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#post`,
    headline: post.titel,
    description: post.beschreibung,
    // Die Kurzantwort ist der Absatz, den Antwortmaschinen zitieren sollen —
    // deshalb steht er auch im Schema, nicht nur im HTML.
    abstract: post.kurzantwort,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.datum,
    dateModified: post.aktualisiert ?? post.datum,
    inLanguage: "de-DE",
    articleSection: post.kategorie,
    keywords: [post.kategorie, ...site.keywords].slice(0, 10),
    wordCount: blockWorte(post),
    timeRequired: `PT${post.lesezeit}M`,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": `${site.url}/blog/#blog` },
    image: `${url}/opengraph-image`,
    // Speakable markiert die Absätze, die sich für eine Sprachantwort eignen:
    // die Titelfrage und die Kurzantwort direkt darunter. Genau der Teil, den
    // ein Assistent vorliest. Die cssSelector müssen im HTML existieren.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".kurzantwort"],
    },
    about: post.leistungen.map((slug) => ({
      "@type": "Service",
      "@id": `${site.url}/leistungen/${slug}/#service`,
    })),
  };
}

/** Grobe Wortzahl aus den Blöcken — wordCount will Schema.org wissen. */
function blockWorte(post: BlogPost): number {
  const text = post.blocks
    .map((b) => ("text" in b ? b.text : b.punkte.join(" ")))
    .join(" ");
  return (post.kurzantwort + " " + text).trim().split(/\s+/).length;
}

export function blogSchema(alle: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog/#blog`,
    name: `${site.name} — Klartext`,
    description:
      "Fachbeiträge zu Webdesign, Webentwicklung, Automationen, SEO und Conversion.",
    url: `${site.url}/blog`,
    inLanguage: "de-DE",
    publisher: { "@id": ORGANIZATION_ID },
    blogPost: alle.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${site.url}/blog/${p.slug}/#post`,
      headline: p.titel,
      url: `${site.url}/blog/${p.slug}`,
      datePublished: p.datum,
    })),
  };
}

export function faqSchema(faq: { frage: string; antwort: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.frage,
      acceptedAnswer: { "@type": "Answer", text: f.antwort },
    })),
  };
}

/** `trail` ohne die Startseite — die wird automatisch vorangestellt. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  const items = [{ name: "Startseite", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
