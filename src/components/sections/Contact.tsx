import styles from "./Contact.module.css";

export function Contact({
  title,
  intro,
  email,
  socials,
  cta,
}: {
  title: string;
  intro: string;
  email?: string;
  socials: readonly { label: string; url: string | null }[];
  cta: string;
}) {
  return (
    <div className={styles.wrap}>
      {title ? (
        <h2 id="contact-title" className={`${styles.title} reveal`}>
          {title}
        </h2>
      ) : null}
      {intro ? <p className={styles.intro}>{intro}</p> : null}
      {email ? (
        <a className={styles.email} href={`mailto:${email}`}>
          <span className="visually-hidden">{cta} : </span>
          {email}
          <span aria-hidden="true" className={styles.arrow}>
            ↗
          </span>
        </a>
      ) : null}
      <ul className={styles.socials}>
        {socials
          .filter((s) => s.url)
          .map((s) => (
            <li key={s.label}>
              <a href={s.url!} target="_blank" rel="noopener noreferrer" className={styles.pill}>
                {s.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
