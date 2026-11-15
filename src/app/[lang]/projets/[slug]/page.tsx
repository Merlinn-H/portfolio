import { ProjectView } from "@/views/ProjectView";
import { getProject, getProjects, pick } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { toLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const p = await getProject(slug);
  return pageMetadata({
    locale,
    path: `/projets/${slug}`,
    title: p?.title,
    description: p ? pick(p.summary, locale) : undefined,
    hidden: p?.status === "hidden",
  });
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params;
  return <ProjectView locale={toLocale(lang)} slug={slug} />;
}
