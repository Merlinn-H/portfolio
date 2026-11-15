import { ProjectView } from "@/views/ProjectView";
import { getProject, getProjects, pick } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProject(slug);
  return pageMetadata({
    locale: "en",
    path: `/projets/${slug}`,
    title: p?.title,
    description: p ? pick(p.summary, "en") : undefined,
    hidden: p?.status === "hidden",
    image: `/en/projets/${slug}/opengraph-image`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectView locale="en" slug={slug} />;
}
