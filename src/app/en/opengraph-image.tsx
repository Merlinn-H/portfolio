import { getSite, pick } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Hugo Pezzo";

export default async function Image() {
  const site = await getSite();
  return ogImage({ eyebrow: pick(site.role, "en"), title: site.name, footer: pick(site.tagline, "en") });
}
