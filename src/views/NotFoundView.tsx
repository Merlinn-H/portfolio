import Link from "next/link";
import { ui } from "@/lib/i18n";
import styles from "./NotFoundView.module.css";

/** 404 bilingue : une URL inconnue ne dit pas dans quelle langue on se trouve. */
export function NotFoundView() {
  const fr = ui("fr");
  const en = ui("en");
  return (
    <div className={styles.wrap}>
      <p className={`credits ${styles.code}`}>404</p>
      <h1 className={styles.title}>{fr.notFoundTitle}</h1>
      <p className={styles.text}>{fr.notFoundText}</p>
      <p className={styles.text} lang="en">
        {en.notFoundTitle} {en.notFoundText}
      </p>
      <p className={styles.actions}>
        <Link href="/" className={styles.pill}>
          ← {fr.notFoundBack}
        </Link>
        <Link href="/en" className={styles.pillGhost} lang="en">
          {en.notFoundBack}
        </Link>
      </p>
    </div>
  );
}
