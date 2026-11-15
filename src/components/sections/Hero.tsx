import Image from "next/image";
import { Hanzi } from "@/components/ui/Hanzi";
import type { getSite } from "@/lib/content";
import { pick } from "@/lib/content";
import type { Dict, Locale } from "@/lib/i18n";
import styles from "./Hero.module.css";

type Site = Awaited<ReturnType<typeof getSite>>;

export function Hero({ site, locale, t }: { site: Site; locale: Locale; t: Dict }) {
  const [first, ...rest] = site.name.split(" ");
  const portrait = site.portraitImg;
  return (
    <section id="top" data-section="" className={styles.hero} aria-labelledby="hero-title">
      <p className={`credits ${styles.role}`}>{pick(site.role, locale)}</p>

      <h1 id="hero-title" className={styles.name}>
        <span>{first}</span> <span className={styles.last}>{rest.join(" ")}</span>
      </h1>

      {portrait ? (
        <div className={styles.portrait}>
          <Image
            src={portrait.src}
            width={portrait.width}
            height={portrait.height}
            alt={pick(site.portraitAlt, locale)}
            priority
            sizes="(min-width: 64rem) 30vw, 50vw"
            quality={60}
          />
        </div>
      ) : null}

      <p className={styles.tagline}>{pick(site.tagline, locale)}</p>

      {site.quote?.text ? (
        <figure className={styles.quote}>
          {site.quote.hanzi ? (
            <Hanzi text={site.quote.hanzi} label={site.quote.source} className={styles.hanzi} />
          ) : null}
          <blockquote lang="en">“{site.quote.text}”</blockquote>
          <figcaption className="credits">{site.quote.source}</figcaption>
        </figure>
      ) : null}

      <a href="#content-start" className={`credits ${styles.scroll}`}>
        {t.scroll} <span aria-hidden="true">↓</span>
      </a>
      <span id="content-start" className={styles.anchor} />
    </section>
  );
}
