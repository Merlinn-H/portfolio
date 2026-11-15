import type { Metadata } from "next";
import { getSite } from "@/lib/content";
import { RootShell } from "@/components/layout/RootShell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="fr">{children}</RootShell>;
}

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { metadataBase: new URL(site.url || "https://hugopezzo.fr") };
}
