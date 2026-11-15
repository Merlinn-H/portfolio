import styles from "./template.module.css";

/** Ré-monté à chaque navigation : fondu d'entrée des pages (transform/clip seulement, jamais opacity 0 → LCP intact). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className={styles.page}>{children}</div>;
}
