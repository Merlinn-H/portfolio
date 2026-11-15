import { getProject, getProjects, getSite, pick } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Projet — Hugo Pezzo";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [site, p] = await Promise.all([getSite(), getProject(slug)]);
  return ogImage({
    eyebrow: p ? pick(p.kicker, "fr") : site.name,
    title: p?.title ?? site.name,
    footer: [site.name, p?.year].filter(Boolean).join(" — "),
  });
}
