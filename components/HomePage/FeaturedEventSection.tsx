import { getTranslations } from "next-intl/server";

import { subtitle, title } from "@/components/primitives";
import EventCard from "../Events/eventCard";
import { getTop5FeaturedEvents, EventCategoryType, getLocalizedTitle, getLocalizedTagNames } from "@/lib/events";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";


export default async function FeaturedEvents({ locale }: { locale: string }) {
  const t = await getTranslations("HomePage");
  const eventListResp = await getTop5FeaturedEvents();
  const eventList = eventListResp.data;
  const event = eventList[0];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full min-h-[50vh] flex flex-col lg:flex-row text-center justify-center items-center gap-y-10 lg:gap-x-10">
        <div className="w-full lg:w-2/5 flex flex-col items-center justify-center gap-4">
          <h1 className={title()}>{t("featuredEvents.title")}</h1>
          <h2 className={subtitle()}>{t("featuredEvents.subtitle")}</h2>
          <p className="text-gray-500">{t("featuredEvents.description")}</p>
          <div className="flex items-center justify-center gap-2">
            <Link href="/events">
              <Button 
                color="primary" 
                radius="full"
                variant="shadow" 
              >
                  {t("featuredEvents.allEventsButton")}
              </Button>
            </Link>
            <Link href="https://us06web.zoom.us/j/84931430905?pwd=eldHRjZuREh6M3ZiemVaV2JMam9PUT09">
              <Button 
                color="primary" 
                radius="full"
                variant="shadow" 
              >
                  Zoom
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center gap-4">
          <h1 className={title({ size:'sm' })}>{t("featuredEvents.featuredEventsTitle")}</h1>
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
