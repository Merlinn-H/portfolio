import {
  getExperiences,
  getFilms,
  getGames,
  getProjects,
  getRenderableSections,
  getSite,
  getSkills,
  pick,
} from "@/lib/content";
import { ui, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Hero } from "@/components/sections/Hero";
import { ProjectList } from "@/components/sections/ProjectList";
import { Manifesto } from "@/components/sections/Manifesto";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Influences } from "@/components/sections/Influences";
import { Contact } from "@/components/sections/Contact";

/** Accueil : sections dans l'ordre et avec la visibilité définis dans /keystatic › Page d'accueil. */
export async function HomeView({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const [site, sections, projects, experiences, skills, films, games] = await Promise.all([
    getSite(),
    getRenderableSections(),
    getProjects(),
    getExperiences(),
    getSkills(),
    getFilms(),
    getGames(),
  ]);

  let n = 0;
  return (
    <>
      {sections.map((s) => {
        const hiddenLabel = s.status === "hidden" ? t.hidden : null;
        const eyebrow = pick(s.eyebrow, locale);
        const title = pick(s.title, locale);
        const intro = pick(s.intro, locale);
        const head = (withTitle = true) => (
          <SectionHead
            index={++n}
            id={s.type}
            eyebrow={eyebrow}
            title={withTitle ? title : undefined}
            hiddenLabel={hiddenLabel}
          />
        );
        const labelled = title ? `${s.type}-title` : undefined;

        switch (s.type) {
          case "hero":
            return <Hero key="hero" site={site} locale={locale} t={t} />;
          case "projects":
            if (projects.length === 0) return null;
            return (
              <Section key={s.type} id="projects" labelledBy={labelled} label={eyebrow}>
                {head()}
                <ProjectList projects={projects} locale={locale} t={t} />
              </Section>
            );
          case "manifesto":
            if (!intro) return null;
            return (
              <Section key={s.type} id="manifesto" labelledBy={labelled} label={eyebrow} tone="light" space="l">
                {head()}
                <Manifesto text={intro} />
              </Section>
            );
          case "experience":
            if (experiences.length === 0) return null;
            return (
              <Section key={s.type} id="experience" labelledBy={labelled} label={eyebrow}>
                {head()}
                <Experience items={experiences} intro={intro} locale={locale} t={t} />
              </Section>
            );
          case "skills":
            if (skills.length === 0) return null;
            return (
              <Section key={s.type} id="skills" labelledBy={labelled} label={eyebrow} space="s">
                {head()}
                <Skills categories={skills} locale={locale} />
              </Section>
            );
          case "influences":
            if (films.length + games.length === 0) return null;
            return (
              <Section key={s.type} id="influences" labelledBy={labelled} label={eyebrow}>
                {head()}
                <Influences films={films} games={games} locale={locale} t={t} />
              </Section>
            );
          case "contact":
            return (
              <Section
                key={s.type}
                id="contact"
                labelledBy={title ? "contact-title" : undefined}
                label={eyebrow}
                space="l"
              >
                {head(false)}
                <Contact title={title} intro={intro} email={site.email} socials={site.socials} cta={t.contactCta} />
              </Section>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
