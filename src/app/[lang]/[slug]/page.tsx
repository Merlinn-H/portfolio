import { PageView } from "@/views/PageView";
import { getPage, getPages, pick } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { toLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPages()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const p = await getPage(slug);
  return pageMetadata({
    locale,
    path: `/${slug}`,
    title: p ? pick(p.title, locale) : undefined,
    description: p ? pick(p.seoDescription, locale) : undefined,
    hidden: p?.status === "hidden",
  });
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params;
  return <PageView locale={toLocale(lang)} slug={slug} />;
}
