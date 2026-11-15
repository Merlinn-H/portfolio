import styles from "./HiddenBanner.module.css";

/** Bandeau des pages masquées — n'existe qu'en développement (en production elles renvoient 404). */
export function HiddenBanner({ show, text }: { show: boolean; text: string }) {
  if (!show) return null;
  return (
    <p className={styles.banner} role="status">
      <span className={styles.tag}>●</span> {text}
    </p>
  );
}
