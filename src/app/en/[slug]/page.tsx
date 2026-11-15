import { PageView } from "@/views/PageView";
import { getPage, getPages, pick } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPages()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPage(slug);
  return pageMetadata({
    locale: "en",
    path: `/${slug}`,
    title: p ? pick(p.title, "en") : undefined,
    description: p ? pick(p.seoDescription, "en") : undefined,
    hidden: p?.status === "hidden",
    image: "/en/opengraph-image",
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PageView locale="en" slug={slug} />;
}
