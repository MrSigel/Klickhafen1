import { OG_GROESSE, OG_TYP, ogBild } from "@/lib/og";
import { getService, services } from "@/lib/services";

/** Alle sieben Bilder zur Buildzeit erzeugen, nicht auf Anfrage. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const alt = "Leistung von Klickhafen";
export const size = OG_GROESSE;
export const contentType = OG_TYP;

/** params ist in Next 16 ein Promise — auch hier, nicht nur in page.tsx. */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  return ogBild({
    eyebrow: service?.eyebrow ?? "Leistung",
    titel: service?.h1 ?? "Klickhafen",
  });
}
