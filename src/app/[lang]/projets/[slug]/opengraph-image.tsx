import { getProject, getProjects, getSite, pick } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";
import { locales, toLocale } from "@/lib/i18n";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Hugo Pezzo";

export async function generateStaticParams() {
  const projects = await getProjects();
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const [site, p] = await Promise.all([getSite(), getProject(slug)]);
  return ogImage({
    eyebrow: p ? pick(p.kicker, locale) : site.name,
    title: p?.title ?? site.name,
    footer: [site.name, p?.year].filter(Boolean).join(" — "),
  });
}
