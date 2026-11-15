import { notFound } from "next/navigation";
import { getPage, pick } from "@/lib/content";
import { ui, type Locale } from "@/lib/i18n";
import { HiddenBanner } from "@/components/ui/HiddenBanner";
import styles from "./PageView.module.css";

/** Page libre (collection « pages »). Les blocs « [À RÉDIGER] » sont signalés visuellement. */
export async function PageView({ locale, slug }: { locale: Locale; slug: string }) {
  const page = await getPage(slug);
  if (!page) notFound();
  const t = ui(locale);
  const todo = (s: string) => s.includes("[À RÉDIGER]");
  return (
    <article className={styles.page}>
      <HiddenBanner show={page.status === "hidden"} text={t.hiddenPage} />
      <header className={styles.head}>
        {pick(page.eyebrow, locale) ? (
          <p className={`credits ${styles.eyebrow} ${todo(pick(page.eyebrow, locale)) ? styles.todo : ""}`}>
            {pick(page.eyebrow, locale)}
          </p>
        ) : null}
        <h1 className={styles.title}>{pick(page.title, locale)}</h1>
        {pick(page.intro, locale) ? (
          <p className={`${styles.intro} ${todo(pick(page.intro, locale)) ? styles.todo : ""}`}>
            {pick(page.intro, locale)}
          </p>
        ) : null}
      </header>
      <div className={styles.blocks}>
        {page.blocks.map((b, i) => (
          <section key={i} className={`${styles.block} reveal`} aria-labelledby={`block-${i}`}>
            <h2 id={`block-${i}`} className={styles.blockTitle}>
              {pick(b.heading, locale)}
            </h2>
            {pick(b.body, locale)
              .split(/\n\s*\n/)
              .filter(Boolean)
              .map((p, j) => (
                <p key={j} className={todo(p) ? styles.todo : undefined}>
                  {p}
                </p>
              ))}
            {b.links.filter((l) => l.url).length > 0 ? (
              <ul className={styles.links}>
                {b.links
                  .filter((l) => l.url)
                  .map((l) => (
                    <li key={l.url}>
                      <a href={l.url!} target="_blank" rel="noopener noreferrer" className={styles.pill}>
                        {pick(l.label, locale) || l.url} <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
