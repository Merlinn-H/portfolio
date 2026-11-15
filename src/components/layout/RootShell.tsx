import "@/styles/globals.css";
import { display, text } from "@/lib/fonts";
import { getNavigation, getSite, img, pick } from "@/lib/content";
import { href, ui, type Locale } from "@/lib/i18n";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { Intro, introScript } from "./Intro";
import styles from "./RootShell.module.css";

export async function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const site = await getSite();
  const nav = await getNavigation(locale);
  const t = ui(locale);
  const introLogo = site.introEnabled ? img(site.introLogo) : null;
  const url = site.url ?? "";

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: pick(site.role, locale),
    url: url ? `${url}${href(locale, "/") === "/" ? "" : href(locale, "/")}` : undefined,
    image: url && site.portrait ? `${url}${site.portrait}` : undefined,
    email: site.email ? `mailto:${site.email}` : undefined,
    sameAs: site.socials.map((s) => s.url).filter(Boolean),
  };

  return (
    <html lang={locale} className={`${display.variable} ${text.variable}`} data-intro={introLogo ? undefined : "off"}>
      <body>
        {/* Exécuté avant le premier rendu du contenu : décide si l'ident est joué. */}
        {introLogo ? <script dangerouslySetInnerHTML={{ __html: introScript }} /> : null}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        <a href="#content" className={styles.skip}>
          {t.skip}
        </a>
        {introLogo ? <Intro logo={introLogo} label={site.introLogoAlt ?? ""} /> : null}
        <SiteNav items={nav} locale={locale} t={t} name={site.name} homeHref={href(locale, "/")} />
        <main id="content" tabIndex={-1} className={styles.main}>
          {children}
        </main>
        <SiteFooter name={site.name} note={pick(site.footer, locale)} email={site.email} socials={site.socials} t={t} />
      </body>
    </html>
  );
}
