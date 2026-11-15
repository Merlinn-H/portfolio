import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, getProjects, getSite, pick } from "@/lib/content";
import { href, ui, type Locale } from "@/lib/i18n";
import { HiddenBanner } from "@/components/ui/HiddenBanner";
import { VideoPlayer } from "@/components/project/VideoPlayer";
import styles from "./ProjectView.module.css";

export async function ProjectView({ locale, slug }: { locale: Locale; slug: string }) {
  const project = await getProject(slug);
  if (!project) notFound();
  const t = ui(locale);
  const [all, site] = await Promise.all([getProjects(), getSite()]);
  const ctaText = pick(project.cta?.text, locale);
  const ctaButton = pick(project.cta?.button, locale);
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all.length > 1 ? all[(idx + 1) % all.length] : null;

  const body = pick(project.body, locale) || pick(project.summary, locale);
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const role = pick(project.role, locale);
  const tagline = pick(project.tagline, locale);
  const roles = role ? role.split(",").map((r) => r.trim()) : [];

  return (
    <article className={styles.page}>
      <HiddenBanner show={project.status === "hidden"} text={t.hiddenPage} />
      <header className={styles.head}>
        <nav aria-label={locale === "fr" ? "Fil d'Ariane" : "Breadcrumb"} className={`credits ${styles.crumbs}`}>
          <a className="link" href={href(locale, "/projets")}>
            {t.allProjects}
          </a>
          <span aria-hidden="true">/</span>
          <span>{pick(project.kicker, locale)}</span>
        </nav>
        <h1 className={styles.title}>{project.title}</h1>
        {tagline ? <p className={styles.tagline}>{tagline}</p> : null}
        <dl className={styles.meta}>
          {project.year ? (
            <div>
              <dt className="credits">{t.year}</dt>
              <dd>{project.year}</dd>
            </div>
          ) : null}
          {roles.length ? (
            <div>
              <dt className="credits">{t.role}</dt>
              <dd>
                {roles.map((r) => (
                  <span key={r}>{r}</span>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      </header>

      {project.youtubeId ? (
        <div className={styles.media}>
          <VideoPlayer
            id={project.youtubeId}
            title={project.title}
            label={t.watch}
            hint={t.watchOn}
            card={project.year || pick(project.kicker, locale)}
          />
        </div>
      ) : project.coverImg ? (
        <div className={styles.media}>
          <Image
            src={project.coverImg.src}
            width={project.coverImg.width}
            height={project.coverImg.height}
            alt={pick(project.coverAlt, locale)}
            sizes="(min-width: 90rem) 86rem, 100vw"
            preload
            fetchPriority="high"
            className={styles.cover}
          />
        </div>
      ) : project.logoImg ? (
        <div className={`${styles.media} ${styles.logoFrame}`}>
          <Image
            src={project.logoImg.src}
            width={project.logoImg.width}
            height={project.logoImg.height}
            alt={`Logo ${project.title}`}
            sizes="(min-width: 64rem) 32rem, 70vw"
            preload
            fetchPriority="high"
            className={styles.logo}
          />
        </div>
      ) : null}

      <div className={styles.body}>
        {paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? styles.lead : undefined}>
            {p}
          </p>
        ))}
      </div>

      {project.highlights.length > 0 ? (
        <ol className={styles.highlights}>
          {project.highlights.map((h, i) => (
            <li key={i} className="reveal">
              <span className={styles.hlNum} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className={styles.hlTitle}>{pick(h.title, locale)}</h2>
              <p>{pick(h.text, locale)}</p>
            </li>
          ))}
        </ol>
      ) : null}

      {project.links.filter((l) => l.url).length > 0 ? (
        <ul className={styles.links}>
          {project.links
            .filter((l) => l.url)
            .map((l) => (
              <li key={l.url}>
                <a href={l.url!} target="_blank" rel="noopener noreferrer" className={styles.pill}>
                  {t.visit} {pick(l.label, locale)} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
        </ul>
      ) : null}

      {ctaText && site.email ? (
        <aside className={styles.cta} aria-label={ctaButton || ctaText}>
          <p className={styles.ctaText}>{ctaText}</p>
          <a className={styles.pill} href={`mailto:${site.email}`}>
            {ctaButton || site.email} <span aria-hidden="true">↗</span>
          </a>
        </aside>
      ) : null}

      {next && next.slug !== project.slug ? (
        <a className={styles.next} href={href(locale, `/projets/${next.slug}`)}>
          <span className="credits">{t.next}</span>
          <span className={styles.nextTitle}>
            {next.title} <span aria-hidden="true">→</span>
          </span>
        </a>
      ) : null}
    </article>
  );
}
