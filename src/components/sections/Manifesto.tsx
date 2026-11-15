import styles from "./Manifesto.module.css";

/** Manifeste : la première phrase en affiche, le reste en colonne de lecture. */
export function Manifesto({ text }: { text: string }) {
  const m = text.match(/^(.+?[.!?])\s+([\s\S]*)$/);
  const lead = m ? m[1] : text;
  const rest = m ? m[2] : "";
  return (
    <div className={styles.wrap}>
      <p className={`${styles.lead} reveal`}>{lead}</p>
      {rest ? <p className={`${styles.rest} reveal`}>{rest}</p> : null}
    </div>
  );
}
