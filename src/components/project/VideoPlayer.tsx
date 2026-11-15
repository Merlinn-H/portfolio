"use client";

import { useState } from "react";
import styles from "./VideoPlayer.module.css";

/** Lecteur « façade » : rien n'est chargé depuis YouTube avant le clic. */
export function VideoPlayer({ id, title, label, hint }: { id: string; title: string; label: string; hint: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className={styles.frame}>
      {play ? (
        <iframe
          className={styles.iframe}
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className={styles.facade} onClick={() => setPlay(true)} aria-describedby={`hint-${id}`}>
          <span className={styles.card} aria-hidden="true">
            {title}
          </span>
          <span className={styles.play}>
            <span aria-hidden="true" className={styles.icon}>
              ▶
            </span>{" "}
            {label}
          </span>
          <span id={`hint-${id}`} className={`credits ${styles.hint}`}>
            {hint}
          </span>
        </button>
      )}
    </div>
  );
}
