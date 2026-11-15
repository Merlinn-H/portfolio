import styles from "./SectionHead.module.css";
import { HiddenBadge } from "./HiddenBadge";

/** Carton de section : numéro façon Criterion, sur-titre en crédits, titre d'affiche. */
export function SectionHead({
  index,
  eyebrow,
  title,
  id,
  hiddenLabel,
}: {
  index: number;
  eyebrow?: string;
  title?: string;
  id: string;
  hiddenLabel?: string | null;
}) {
  return (
    <header className={styles.head}>
      <p className={`credits ${styles.meta}`}>
        <span className={styles.num}>{String(index).padStart(2, "0")}</span>
        {eyebrow ? <span>{eyebrow}</span> : null}
        <HiddenBadge show={Boolean(hiddenLabel)} label={hiddenLabel ?? ""} />
      </p>
      {title ? (
        <h2 id={`${id}-title`} className={`${styles.title} reveal`}>
          {title}
        </h2>
      ) : null}
    </header>
  );
}
