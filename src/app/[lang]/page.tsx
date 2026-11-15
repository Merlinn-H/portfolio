import { HomeView } from "@/views/HomeView";
import { pageMetadata } from "@/lib/seo";
import { toLocale, type LangParams } from "@/lib/i18n";

export async function generateMetadata({ params }: LangParams) {
  return pageMetadata({ locale: toLocale((await params).lang), path: "/" });
}

export default async function Page({ params }: LangParams) {
  return <HomeView locale={toLocale((await params).lang)} />;
}
