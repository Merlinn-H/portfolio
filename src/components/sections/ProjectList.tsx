import type { Project } from "@/lib/content";
import { pick } from "@/lib/content";
import { href, type Dict, type Locale } from "@/lib/i18n";
import { HiddenBadge } from "@/components/ui/HiddenBadge";
import styles from "./ProjectList.module.css";

/** Liste éditoriale numérotée (pas de grille de cartes). */
export function ProjectList({ projects, locale, t, headingLevel = 3 }: {
  projects: Project[];
  locale: Locale;
  t: Dict;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  return (
    <ol className={styles.list}>
      {projects.map((p, i) => (
        <li key={p.slug} className={`${styles.row} reveal`}>
          <a href={href(locale, `/projets/${p.slug}`)} className={styles.link}>
            <span className={styles.num} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={`credits ${styles.kicker}`}>
              {pick(p.kicker, locale)}
              <HiddenBadge show={p.status === "hidden"} label={t.hidden} />
            </span>
            <H className={styles.title}>{p.title}</H>
            <span className={styles.meta}>
              {p.year ? <span>{p.year}</span> : null}
              {pick(p.role, locale) ? <span>{pick(p.role, locale)}</span> : null}
            </span>
            <span className={styles.summary}>{pick(p.summary, locale)}</span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
