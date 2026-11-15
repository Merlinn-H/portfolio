import styles from "./HiddenBadge.module.css";

/** Badge visible uniquement en développement : en production, un élément masqué n'est jamais rendu. */
export function HiddenBadge({ show, label }: { show: boolean; label: string }) {
  if (!show) return null;
  return <span className={styles.badge}>{label}</span>;
}
