import { href, ui, type Locale } from "@/lib/i18n";
import styles from "./NotFoundView.module.css";

export function NotFoundView({ locale }: { locale: Locale }) {
  const t = ui(locale);
  return (
    <div className={styles.wrap}>
      <p className={`credits ${styles.code}`}>404</p>
      <h1 className={styles.title}>{t.notFoundTitle}</h1>
      <p className={styles.text}>{t.notFoundText}</p>
      <a href={href(locale, "/")} className={styles.pill}>
        ← {t.notFoundBack}
      </a>
    </div>
  );
}
