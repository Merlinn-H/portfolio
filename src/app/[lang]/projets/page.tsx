import { ProjectsIndexView } from "@/views/ProjectsIndexView";
import { pageMetadata } from "@/lib/seo";
import { toLocale, type LangParams } from "@/lib/i18n";

export async function generateMetadata({ params }: LangParams) {
  const locale = toLocale((await params).lang);
  return pageMetadata({ locale, path: "/projets", title: locale === "fr" ? "Projets" : "Projects" });
}

export default async function Page({ params }: LangParams) {
  return <ProjectsIndexView locale={toLocale((await params).lang)} />;
}
