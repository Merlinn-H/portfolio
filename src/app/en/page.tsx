import { HomeView } from "@/views/HomeView";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () => pageMetadata({ locale: "en", path: "/" });

export default function Page() {
  return <HomeView locale="en" />;
}
