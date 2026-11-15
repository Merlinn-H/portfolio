import styles from "./Section.module.css";

/** Section de l'accueil. `tone="light"` = carton inversé (blanc os), `space` varie le rythme vertical. */
export function Section({
  id,
  labelledBy,
  label,
  children,
  tone,
  space = "m",
}: {
  id: string;
  labelledBy?: string;
  label?: string;
  children: React.ReactNode;
  tone?: "light";
  space?: "s" | "m" | "l";
}) {
  return (
    <section
      id={id}
      data-section=""
      data-tone={tone}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      className={`${styles.section} ${styles[space]} ${tone === "light" ? styles.light : ""}`}
    >
      <div className={styles.inner}>{children}</div>
    </section>
  );
}
