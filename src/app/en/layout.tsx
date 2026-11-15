import { RootShell } from "@/components/layout/RootShell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
