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
        {/* Un seul bloc de texte (pas deux <span> en display:block) : le navigateur le compte
            comme un seul élément, le plus grand de l'écran → LCP peint dès le premier rendu. */}
        {first}
        <br />
        {rest.join(" ")}
      </h1>

      {portrait ? (
        <div className={styles.portrait}>
          <Image
            src={portrait.src}
            width={portrait.width}
            height={portrait.height}
            alt={pick(site.portraitAlt, locale)}
            loading="eager"
            sizes="(min-width: 64rem) 36vw, 75vw"
            quality={75}
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

      <a href="#after-hero" className={`credits ${styles.scroll}`}>
        {t.scroll} <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
