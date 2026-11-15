import { ProjectsIndexView } from "@/views/ProjectsIndexView";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () =>
  pageMetadata({ locale: "en", path: "/projets", title: "Projects", image: "/en/opengraph-image" });

export default function Page() {
  return <ProjectsIndexView locale="en" />;
}
