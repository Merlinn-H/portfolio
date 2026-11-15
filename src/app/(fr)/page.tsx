import { HomeView } from "@/views/HomeView";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () => pageMetadata({ locale: "fr", path: "/" });

export default function Page() {
  return <HomeView locale="fr" />;
}
