import { getSite, pick } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";
import { locales, toLocale } from "@/lib/i18n";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Hugo Pezzo";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const locale = toLocale((await params).lang);
  const site = await getSite();
  return ogImage({ eyebrow: pick(site.role, locale), title: site.name, footer: pick(site.tagline, locale) });
}
