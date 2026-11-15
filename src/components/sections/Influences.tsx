import Image from "next/image";
import { pick, type getFilms, type getGames } from "@/lib/content";
import type { Dict, Locale } from "@/lib/i18n";
import { HiddenBadge } from "@/components/ui/HiddenBadge";
import styles from "./Influences.module.css";

type Film = Awaited<ReturnType<typeof getFilms>>[number];
type Game = Awaited<ReturnType<typeof getGames>>[number];

/** Cinémathèque personnelle. Une rubrique vide n'est pas affichée. */
export function Influences({ films, games, locale, t }: { films: Film[]; games: Game[]; locale: Locale; t: Dict }) {
  return (
    <div className={styles.wrap}>
      {films.length > 0 ? (
        <div>
          <h3 className={`credits ${styles.sub}`}>
            {t.films} <span>{films.length}</span>
          </h3>
          <ul className={styles.films}>
            {films.map((f) => {
              const title = (locale === "en" && f.titleEn) || f.title;
              return (
                <li key={f.slug} className={styles.film}>
                  <a href={f.url ?? undefined} target="_blank" rel="noopener noreferrer" className={styles.filmLink}>
                    {f.posterImg ? (
                      <Image
                        src={f.posterImg.src}
                        width={f.posterImg.width}
                        height={f.posterImg.height}
                        alt={`${locale === "fr" ? "Affiche de" : "Poster for"} ${title}`}
                        sizes="(min-width: 64rem) 18vw, (min-width: 40rem) 30vw, 62vw"
                        className={styles.poster}
                      />
                    ) : null}
                    <span className={styles.filmTitle}>
                      {title}
                      <HiddenBadge show={f.status === "hidden"} label={t.hidden} />
                    </span>
                    <span className={`credits ${styles.filmMeta}`}>
                      {f.director} · {f.year}
                    </span>
                  </a>
                  {pick(f.description, locale) ? <p className={styles.filmDesc}>{pick(f.description, locale)}</p> : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {games.length > 0 ? (
        <div>
          <h3 className={`credits ${styles.sub}`}>
            {t.games} <span>{games.length}</span>
          </h3>
          <ul className={styles.games}>
            {games.map((g) => (
              <li key={g.slug} className={`${styles.game} reveal`}>
                <div className={styles.gameHead}>
                  <a href={g.url ?? undefined} target="_blank" rel="noopener noreferrer" className={`link ${styles.gameTitle}`}>
                    {g.title}
                  </a>
                  <HiddenBadge show={g.status === "hidden"} label={t.hidden} />
                  <span className={`credits ${styles.gameGenre}`}>{pick(g.genre, locale)}</span>
                </div>
                {pick(g.description, locale) ? <p className={styles.gameDesc}>{pick(g.description, locale)}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
