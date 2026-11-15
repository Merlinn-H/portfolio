import { notFound } from "next/navigation";
import KeystaticApp from "./keystatic";
import { adminEnabled } from "@/lib/admin";

export const metadata = { title: "Back-office", robots: { index: false, follow: false } };

export default function Layout() {
  if (!adminEnabled) notFound();
  return (
    <html lang="fr">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
