import { getSite, getHome, getProjects, getExperiences, getFilms, getGames, getPages, getNavigation, getSkills } from "@/lib/content";
export default async function Page() {
  const data = { site: await getSite(), home: await getHome(), projects: await getProjects(), exp: await getExperiences(), films: await getFilms(), games: await getGames(), pages: await getPages(), nav: await getNavigation("fr"), skills: await getSkills() };
  return <main><pre>{JSON.stringify(data, null, 1)}</pre></main>;
}
