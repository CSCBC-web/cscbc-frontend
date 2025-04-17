import { getTranslations } from "next-intl/server";

import { title } from "@/components/primitives";
import EventCard from "../Events/eventCard";
import { getTop5FeaturedEvents, EventCategoryType, getLocalizedTitle, getLocalizedTagNames } from "@/lib/events";


export default async function FeaturedEvents({ locale }: { locale: string }) {
  const t = await getTranslations("HomePage");
  const eventListResp = await getTop5FeaturedEvents();
  const eventList = eventListResp.data;
  const event = eventList[0];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full min-h-[50vh] flex text-center justify-center items-center">
        <div className="w-2/5">
          <h1 className={title()}>{t("featuredEvents.title")}</h1>
        </div>
        <div className="w-3/5">
          <EventCard
            locale={locale}
            id={event.documentId}
            title={getLocalizedTitle(locale, event)}
            tags={event.event_tags.map((tag: EventCategoryType) => getLocalizedTagNames(locale, tag))}
            thumbnailUrl={event.thumbnail_img.url}
          />
        </div>
      </div>
    </section>
  );
}
