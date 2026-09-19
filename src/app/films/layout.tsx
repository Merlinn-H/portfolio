import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courts-métrages — Hugo Pezzo",
};

export default function FilmsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
