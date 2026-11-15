import { getHome, getProjects, pick } from "@/lib/content";
import { ui, type Locale } from "@/lib/i18n";
import { ProjectList } from "@/components/sections/ProjectList";
import styles from "./PageView.module.css";

export async function ProjectsIndexView({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const projects = await getProjects();
  const section = (await getHome()).find((s) => s.type === "projects");
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={`credits ${styles.eyebrow}`}>{pick(section?.eyebrow, locale) || "Portfolio"}</p>
        <h1 className={styles.title}>{pick(section?.title, locale) || t.allProjects}</h1>
      </header>
      <ProjectList projects={projects} locale={locale} t={t} headingLevel={2} />
    </div>
  );
}
