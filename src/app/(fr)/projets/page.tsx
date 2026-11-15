import { ProjectsIndexView } from "@/views/ProjectsIndexView";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () =>
  pageMetadata({ locale: "fr", path: "/projets", title: "Projets", image: "/opengraph-image" });

export default function Page() {
  return <ProjectsIndexView locale="fr" />;
}
