import { ProjectsIndexView } from "@/views/ProjectsIndexView";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () =>
  pageMetadata({ locale: "fr", path: "/projets", title: "Projets" });

export default function Page() {
  return <ProjectsIndexView locale="fr" />;
}
