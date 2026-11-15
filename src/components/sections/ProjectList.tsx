import Link from "next/link";
import type { Project } from "@/lib/content";
import { pick } from "@/lib/content";
import { href, type Dict, type Locale } from "@/lib/i18n";
import { HiddenBadge } from "@/components/ui/HiddenBadge";
import styles from "./ProjectList.module.css";

/**
 * Deux niveaux : les structures (société, studio…) en grand, les courts-métrages en filmographie compacte.
 * Pas de grille de cartes.
 */
export function ProjectList({
  projects,
  locale,
  t,
  headingLevel = 3,
}: {
  projects: Project[];
  locale: Locale;
  t: Dict;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  const Sub = `h${headingLevel}` as const;
  const Item = `h${(headingLevel + 1) as 3 | 4}` as const;
  const features = projects.filter((p) => p.category !== "short");
  const shorts = projects.filter((p) => p.category === "short");

  return (
    <div className={styles.wrap}>
      {features.length > 0 ? (
        <ul className={styles.features}>
          {features.map((p) => (
            <li key={p.slug} className={`${styles.feature} reveal`}>
              <Link href={href(locale, `/projets/${p.slug}`)} prefetch={false} className={styles.featureLink}>
                <span className={`credits ${styles.kicker}`}>
                  {pick(p.kicker, locale)}
                  {p.year ? <span className={styles.year}> · {p.year}</span> : null}
                  <HiddenBadge show={p.status === "hidden"} label={t.hidden} />
                </span>
                <H className={styles.featureTitle}>{p.title}</H>
                <span className={styles.featureSide}>
                  {pick(p.role, locale) ? <span className={styles.role}>{pick(p.role, locale)}</span> : null}
                  <span className={styles.summary}>{pick(p.summary, locale)}</span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {shorts.length > 0 ? (
        <div className={styles.filmography}>
          <Sub className={`credits ${styles.sub}`}>{t.shorts}</Sub>
          <ol className={styles.shorts}>
            {shorts.map((p) => (
              <li key={p.slug} className="reveal">
                <Link href={href(locale, `/projets/${p.slug}`)} prefetch={false} className={styles.shortLink}>
                  <span className={styles.shortYear}>{p.year}</span>
                  <Item className={styles.shortTitle}>
                    {p.title}
                    <HiddenBadge show={p.status === "hidden"} label={t.hidden} />
                  </Item>
                  <span className={styles.shortRole}>{pick(p.role, locale)}</span>
                  <span className={styles.shortArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
