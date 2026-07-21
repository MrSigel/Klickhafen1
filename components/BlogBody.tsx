import type { BlogBlock } from "@/lib/blog";

/**
 * Rendert die typisierten Blöcke eines Beitrags.
 *
 * Bewusst kein MDX und kein dangerouslySetInnerHTML: Die Blöcke sind
 * typisiert, also kann kein kaputtes oder unsicheres Markup entstehen,
 * und die H-Struktur bleibt erzwungen sauber (H1 nur im Hero, hier ab H2).
 */
export function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="flex flex-col">
      {blocks.map((block, i) => {
        switch (block.typ) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-14 max-w-[24ch] text-h2 text-balance first:mt-0"
              >
                {block.text}
              </h2>
            );

          case "absatz":
            return (
              <p key={i} className="mt-5 max-w-[68ch] text-ink-soft">
                {block.text}
              </p>
            );

          case "liste":
            return (
              <ul key={i} className="mt-6 flex max-w-[68ch] flex-col gap-3.5">
                {block.punkte.map((punkt) => (
                  <li key={punkt} className="flex gap-3.5 text-ink-soft">
                    <span
                      aria-hidden="true"
                      className="mt-3 h-px w-4 flex-none bg-accent"
                    />
                    <span>{punkt}</span>
                  </li>
                ))}
              </ul>
            );

          case "hinweis":
            return (
              <aside
                key={i}
                className="mt-8 max-w-[68ch] rounded-lg border border-line bg-paper-sunk p-6"
              >
                <p className="eyebrow">Merken</p>
                <p className="mt-3 text-small text-ink">{block.text}</p>
              </aside>
            );
        }
      })}
    </div>
  );
}
