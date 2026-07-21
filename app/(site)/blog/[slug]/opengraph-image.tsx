import { getPost, posts } from "@/lib/blog";
import { OG_GROESSE, OG_TYP, ogBild } from "@/lib/og";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const alt = "Beitrag im Klickhafen-Blog";
export const size = OG_GROESSE;
export const contentType = OG_TYP;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return ogBild({
    eyebrow: post?.kategorie ?? "Blog",
    titel: post?.titel ?? "Klickhafen",
    fuss: post ? `${post.lesezeit} Min Lesezeit` : undefined,
  });
}
