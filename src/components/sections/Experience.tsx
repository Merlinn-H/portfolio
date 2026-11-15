import { pick, type getExperiences } from "@/lib/content";
import type { Dict, Locale } from "@/lib/i18n";
import { HiddenBadge } from "@/components/ui/HiddenBadge";
import styles from "./Experience.module.css";

type Exp = Awaited<ReturnType<typeof getExperiences>>[number];

export function Experience({ items, intro, locale, t }: { items: Exp[]; intro: string; locale: Locale; t: Dict }) {
  return (
    <div className={styles.wrap}>
      {intro ? <p className={`${styles.intro} reveal`}>{intro}</p> : null}
      <ol className={styles.list}>
        {items.map((x) => (
          <li key={x.slug} className={`${styles.item} reveal`}>
            <p className={`credits ${styles.period}`}>{pick(x.period, locale)}</p>
            <div className={styles.body}>
              <h3 className={styles.title}>
                {pick(x.title, locale)}
                <HiddenBadge show={x.status === "hidden"} label={t.hidden} />
              </h3>
              <p className={styles.company}>
                {x.company}
                {x.location ? <span> — {x.location}</span> : null}
              </p>
              {pick(x.description, locale) ? <p className={styles.desc}>{pick(x.description, locale)}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
