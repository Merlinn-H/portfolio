import type { Img } from "@/lib/content";
import styles from "./Intro.module.css";

/**
 * Ident d'ouverture (≤ 1,2 s), joué une fois par session, passable au clic ou au clavier.
 * Rendu en surimpression d'un contenu déjà peint : il ne retarde jamais le LCP.
 * Un script inline (voir introScript) le retire avant le premier rendu si déjà vu ou si
 * l'utilisateur préfère réduire les animations.
 */
export function Intro({ logo, label }: { logo: Img; label: string }) {
  return (
    <div className={styles.intro} data-intro-overlay="" aria-hidden="true">
      <div
        className={styles.logo}
        style={{
          WebkitMaskImage: `url(${logo.src})`,
          maskImage: `url(${logo.src})`,
          aspectRatio: `${logo.width} / ${logo.height}`,
        }}
        title={label}
      />
    </div>
  );
}

export const introScript = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem('intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='off';return}sessionStorage.setItem('intro','1')}catch(e){d.dataset.intro='off';return}function end(){d.dataset.intro='off';removeEventListener('pointerdown',end);removeEventListener('keydown',end)}addEventListener('pointerdown',end);addEventListener('keydown',end);setTimeout(end,1200)})();`;
