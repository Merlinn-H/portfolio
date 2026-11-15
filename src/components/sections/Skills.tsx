import { pick, type getSkills } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import styles from "./Skills.module.css";

type Cat = Awaited<ReturnType<typeof getSkills>>[number];

/** Compétences en « générique de fin » : rôle à gauche, noms à droite. */
export function Skills({ categories, locale }: { categories: readonly Cat[]; locale: Locale }) {
  return (
    <dl className={styles.roll}>
      {categories.map((c) => (
        <div key={c.name.fr} className={`${styles.row} reveal`}>
          <dt className={`credits ${styles.cat}`}>{pick(c.name, locale)}</dt>
          <dd className={styles.items}>
            <ul>
              {c.items.map((s) => (
                <li key={s.fr}>{pick(s, locale)}</li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
