"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/content";
import type { Dict, Locale } from "@/lib/i18n";
import styles from "./SiteNav.module.css";

type Props = { items: NavItem[]; locale: Locale; t: Dict; name: string; homeHref: string };

/** Chemin équivalent dans l'autre langue (les slugs sont identiques en FR et EN). */
function alternatePath(pathname: string, locale: Locale) {
  if (locale === "en") return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return pathname === "/" ? "/en" : `/en${pathname}`;
}

export function SiteNav({ items, locale, t, name, homeHref }: Props) {
  const pathname = usePathname() || "/";
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isHome = pathname === homeHref;
  // Au-delà de 6 onglets : menu partout ; à 6, menu entre 1024 et 1280 px (sinon la barre déborde).
  const compact = items.length > 6;
  const many = items.length >= 6;

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
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (item: NavItem) => {
    const hash = item.href.split("#")[1];
    if (hash) return isHome && active === hash;
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();
  const altHref = alternatePath(pathname, locale);

  const lang = (
    <p className={styles.lang} aria-label={t.langLabel}>
      <a
        href={locale === "fr" ? pathname : altHref}
        hrefLang="fr"
        lang="fr"
        aria-label="Français"
        aria-current={locale === "fr" ? "true" : undefined}
      >
        FR
      </a>
      <span aria-hidden="true">/</span>
      <a
        href={locale === "en" ? pathname : altHref}
        hrefLang="en"
        lang="en"
        aria-label="English"
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </a>
    </p>
  );

  return (
    <>
      <header
        className={styles.header}
        data-scrolled={scrolled || !isHome ? "" : undefined}
        data-compact={compact ? "" : undefined}
        data-many={many ? "" : undefined}
      >
        <div className={styles.bar}>
          <a href={homeHref} className={styles.brand}>
            {name}
          </a>
          <nav aria-label={t.navLabel} className={styles.desktopNav}>
            <ul>
              {items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={styles.item}
                    aria-current={isActive(item) ? (item.href.includes("#") ? "location" : "page") : undefined}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.label}
                    {item.hidden ? <span className={styles.hiddenTag}>{t.hidden}</span> : null}
                  </a>
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
            <a href={homeHref} className={styles.brand} onClick={close}>
              {name}
            </a>
            <button type="button" className={styles.closeButton} onClick={close}>
              {t.close}
            </button>
          </div>
          <nav aria-label={t.navLabel}>
            <ol className={styles.sheetList}>
              {items.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={close}
                    aria-current={isActive(item) ? "location" : undefined}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className={styles.sheetNum} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                    {item.hidden ? <span className={styles.hiddenTag}>{t.hidden}</span> : null}
                  </a>
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
