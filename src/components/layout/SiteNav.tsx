"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IntentLink as Link } from "@/components/ui/IntentLink";
import { useSelectedLayoutSegments } from "next/navigation";
import type { NavItem } from "@/lib/content";
import { href, type Dict, type Locale } from "@/lib/i18n";
import styles from "./SiteNav.module.css";

type Props = { items: NavItem[]; locale: Locale; t: Dict; name: string };

/**
 * Navigation principale. Toutes les navigations internes sont « douces » (next/link) :
 * seule la partie qui change est chargée, sans recharger la page.
 * Le chemin courant est lu depuis les segments de route (et non l'URL affichée),
 * car le français est servi à la racine via des rewrites.
 */
export function SiteNav({ items, locale, t, name }: Props) {
  const segments = useSelectedLayoutSegments().filter((s) => !/^(\(|__|\/)/.test(s)); // ignore groupes, segments internes (__PAGE__, /_not-found)
  const path = `/${segments.join("/")}`.replace(/\/$/, "") || "/";
  const isHome = path === "/";
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstPath = useRef(path);
  // Au-delà de 6 onglets : menu partout ; à 6, menu entre 1024 et 1280 px (sinon la barre déborde).
  const compact = items.length > 6;
  const many = items.length >= 6;

  // Après la première navigation douce, les pages entrent avec une petite animation (jamais au premier chargement).
  useLayoutEffect(() => {
    if (path !== firstPath.current) document.documentElement.dataset.nav = "";
  }, [path]);

  // Section active : celle qui occupe le milieu de l'écran (aucune tant que le hero est visible).
  useEffect(() => {
    if (!isHome) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id === "top" ? null : e.target.id);
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome, locale]);

  useLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const itemPath = (h: string) => h.replace(/^\/en(?=\/|#|$)/, "").split("#")[0] || "/";
  const isActive = (item: NavItem) => {
    if (item.external) return false;
    const hash = item.href.split("#")[1];
    if (hash) return isHome && active === hash;
    const p = itemPath(item.href);
    return path === p || path.startsWith(`${p}/`);
  };

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  const navLink = (item: NavItem, className: string | undefined, children: React.ReactNode) =>
    item.external ? (
      <a href={item.href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link
        href={item.href}
        className={className}
        aria-current={isActive(item) ? (item.href.includes("#") ? "location" : "page") : undefined}
      >
        {children}
      </Link>
    );

  // Bascule de langue : même page, même position de lecture, sans rechargement.
  const lang = (
    <p className={styles.lang} role="group" aria-label={t.langLabel}>
      {(["fr", "en"] as const).map((l, i) => (
        <span key={l} className={styles.langItem}>
          {i > 0 ? <span aria-hidden="true">/</span> : null}
          <Link
            href={href(l, path)}
            scroll={false}
            hrefLang={l}
            lang={l}
            aria-label={l === "fr" ? "Français" : "English"}
            aria-current={locale === l ? "true" : undefined}
            onClick={close}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </p>
  );

  const homeHref = href(locale, "/");

  return (
    <>
      <header
        className={styles.header}
        data-scrolled={scrolled || !isHome ? "" : undefined}
        data-compact={compact ? "" : undefined}
        data-many={many ? "" : undefined}
      >
        <div className={styles.bar}>
          <Link href={homeHref} className={styles.brand}>
            {name}
          </Link>
          <nav aria-label={t.navLabel} className={styles.desktopNav}>
            <ul>
              {items.map((item) => (
                <li key={item.href}>
                  {navLink(
                    item,
                    styles.item,
                    <>
                      {item.label}
                      {item.hidden ? <span className={styles.hiddenTag}>{t.hidden}</span> : null}
                    </>,
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.desktopLang}>{lang}</div>
          <button type="button" className={styles.menuButton} onClick={open} aria-haspopup="dialog">
            {t.menu}
          </button>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        className={styles.sheet}
        aria-label={t.navLabel}
        onClick={(e) => e.target === dialogRef.current && close()}
      >
        <div className={styles.sheetInner}>
          <div className={styles.sheetTop}>
            <Link href={homeHref} className={styles.brand} onClick={close}>
              {name}
            </Link>
            <button type="button" className={styles.closeButton} onClick={close}>
              {t.close}
            </button>
          </div>
          {/* Un lien choisi dans la feuille la referme (délégation : un seul gestionnaire). */}
          <nav aria-label={t.navLabel} onClick={(e) => (e.target as Element).closest("a") && close()}>
            <ol className={styles.sheetList}>
              {items.map((item, i) => (
                <li key={item.href}>
                  {navLink(
                    item,
                    undefined,
                    <>
                      <span className={styles.sheetNum} aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                      {item.hidden ? <span className={styles.hiddenTag}>{t.hidden}</span> : null}
                    </>,
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className={styles.sheetFoot}>{lang}</div>
        </div>
      </dialog>
    </>
  );
}
