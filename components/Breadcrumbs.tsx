import Link from "next/link";

/**
 * Sichtbare Breadcrumb-Navigation. Das zugehörige BreadcrumbList-Schema
 * wird auf der jeweiligen Seite ausgegeben — beides gehört zusammen.
 */
export function Breadcrumbs({
  trail,
}: {
  /** Ohne Startseite — die wird hier vorangestellt. Letzter Eintrag = aktuelle Seite. */
  trail: { name: string; path: string }[];
}) {
  const items = [{ name: "Startseite", path: "/" }, ...trail];

  return (
    <nav aria-label="Brotkrumennavigation">
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-eyebrow tracking-[0.12em] text-ink-faint uppercase">
        {items.map((item, i) => {
          const letzter = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2.5">
              {letzter ? (
                <span aria-current="page" className="text-ink-soft">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="transition-colors hover:text-accent">
                  {item.name}
                </Link>
              )}
              {!letzter && (
                <span aria-hidden="true" className="text-line">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
