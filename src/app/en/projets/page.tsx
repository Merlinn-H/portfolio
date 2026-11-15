import { ProjectsIndexView } from "@/views/ProjectsIndexView";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () => pageMetadata({ locale: "en", path: "/projets", title: "Projects" });

export default function Page() {
  return <ProjectsIndexView locale="en" />;
}
