import styles from "./Section.module.css";

export function Section({
  id,
  labelledBy,
  label,
  children,
  tone,
}: {
  id: string;
  labelledBy?: string;
  label?: string;
  children: React.ReactNode;
  tone?: "sunken";
}) {
  return (
    <section
      id={id}
      data-section=""
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      className={`${styles.section} ${tone === "sunken" ? styles.sunken : ""}`}
    >
      <div className={styles.inner}>{children}</div>
    </section>
  );
}
