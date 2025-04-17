import { getTranslations } from "next-intl/server";

import { title } from "@/components/primitives";
import SermonCard from "@/components/Sermons/sermonCard";
import { getMostRecentSermon, SermonCatType, getLocalizedTitle, getLocalizedTagNames } from "@/lib/sermons";

export default async function LatestSermon({ locale }: { locale: string}) {
  const t = await getTranslations("HomePage");
  const sermonListResp = await getMostRecentSermon();
  const sermonList = sermonListResp.data;
  const sermon = sermonList[0];
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full min-h-[50vh] flex text-center justify-center items-center">
        <div className="w-2/5">
          <h1 className={title()}>{t("recentSermon.title")}</h1>
        </div>
        <div className="w-3/5">
          <SermonCard
            locale={locale}
            id={sermon.documentId}
            title={getLocalizedTitle(locale, sermon)}
            speaker={sermon.sermon_speaker.name}
            date={sermon.date}
            tags={sermon.sermon_categories.map((category:SermonCatType) => getLocalizedTagNames(locale, category))}
            thumbnailUrl={sermon.thumbnail.url}
          />
        </div>
      </div>
    </section>
  );
}
