import type { Img } from "@/lib/content";
import styles from "./Intro.module.css";

/**
 * Ident d'ouverture (≤ 1,2 s), joué une fois par session, passable au clic ou au clavier.
 * Rendu en surimpression d'un contenu déjà peint : il ne retarde jamais le LCP.
 * Masqué par défaut : le script inline qui le suit ne l'active (data-play) qu'à la première visite
 * de la session et hors « réduire les animations ». Rien ne dépend d'un attribut de <html>, donc
 * une navigation douce (changement de langue compris) ne peut pas le faire réapparaître.
 */
export function Intro({ logo, label }: { logo: Img; label: string }) {
  return (
    <>
      <div className={styles.intro} data-intro-overlay="" aria-hidden="true" suppressHydrationWarning>
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
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
    </>
  );
}

export const introScript = `(function(){var o=document.currentScript.previousElementSibling;try{if(sessionStorage.getItem('intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;sessionStorage.setItem('intro','1')}catch(e){return}o.setAttribute('data-play','');function end(){o.removeAttribute('data-play');removeEventListener('pointerdown',end);removeEventListener('keydown',end)}addEventListener('pointerdown',end);addEventListener('keydown',end);setTimeout(end,1200)})();`;
