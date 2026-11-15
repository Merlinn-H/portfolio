import type { Metadata } from "next";
import { RootShell } from "@/components/layout/RootShell";
import { NotFoundView } from "@/views/NotFoundView";

export const metadata: Metadata = {
  metadataBase: new URL("https://hugopezzo.fr"),
  title: "404 — Hugo Pezzo",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <RootShell locale="fr">
      <NotFoundView locale="fr" />
    </RootShell>
  );
}
