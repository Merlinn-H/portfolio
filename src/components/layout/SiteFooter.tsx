import type { Dict } from "@/lib/i18n";
import styles from "./SiteFooter.module.css";

export function SiteFooter({ name, note, email, socials, t }: {
  name: string;
  note: string;
  email?: string;
  socials: readonly { label: string; url: string | null }[];
  t: Dict;
}) {
  return (
    <footer className={styles.footer}>
      <p className={styles.name}>{name}</p>
      <ul className={styles.links}>
        {email ? (
          <li>
            <a className="link" href={`mailto:${email}`}>{email}</a>
          </li>
        ) : null}
        {socials.filter((s) => s.url).map((s) => (
          <li key={s.label}>
            <a className="link" href={s.url!} target="_blank" rel="noopener noreferrer">{s.label}</a>
          </li>
        ))}
        <li>
          <a className="link" href="#top">{t.backToTop} ↑</a>
        </li>
      </ul>
      <p className={styles.note}>© {new Date().getFullYear()} {note}</p>
    </footer>
  );
}
