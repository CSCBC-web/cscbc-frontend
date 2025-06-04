import { getTranslations } from "next-intl/server";

import { title, subtitle } from "@/components/primitives";
import SermonCard from "@/components/Sermons/sermonCard";
import { getMostRecentSermon, SermonCatType, getLocalizedTitle, getLocalizedTagNames } from "@/lib/sermons";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

export default async function LatestSermon({ locale }: { locale: string}) {
  const t = await getTranslations("HomePage");
  const sermonListResp = await getMostRecentSermon();
  const sermonList = sermonListResp.data;
  const sermon = sermonList[0];
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full min-h-[50vh] flex flex-col lg:flex-row text-center justify-center items-center gap-y-10 lg:gap-x-10">
        <div className="w-full lg:w-2/5">
          <h1 className={title()}>{t("recentSermon.title")}</h1>
          <h2 className={subtitle()}>{t("recentSermon.description")}</h2>
          <div className="flex items-center justify-center gap-2">
            <Link href="/about/contact">
              <Button
                color="primary" 
                radius="full"
                variant="shadow"
              >
                {t("recentSermon.button_contact")}
              </Button>
            </Link>
            <Link href="/resources/bibleReading">
              <Button
                color="primary" 
                radius="full"
                variant="shadow"
              >
                {t("recentSermon.button_bible_reading")}
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center gap-4">
          <h1 className={title({ size: 'sm' })}>{t("recentSermon.recentSermonTitle")}</h1>
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
