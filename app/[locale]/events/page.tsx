import { getTranslations } from "next-intl/server";
import { title } from "@/components/primitives";
import { EventMetaType, getFilteredEventsMeta } from "@/lib/events";
import EventCard from "@/components/Events/eventCard";
import { EventCategoryType, getLocalizedTitle, getLocalizedTagNames } from "@/lib/events";

export default async function EventsPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: { cat: string[]; page: string };
}) {
  const t = await getTranslations("Event");
  const params = await props.params;
  const locale = params.locale;

  const searchParams = await props.searchParams;
  if (!searchParams.cat) {
    searchParams.cat = [];
  }
  if (!searchParams.page) {
    searchParams.page = "1";
  }

  const resp = await getFilteredEventsMeta(
    Number(searchParams.page),
    searchParams.cat,
  )
  const eventList = resp.data;
  const pageMeta = resp.meta.pagination;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <section className="inline-block h-[20vh] text-center justify-center">
        {/* TODO: Add a filter tab */}
        <h1 className={title()}>{t("title")}</h1>
      </section>
      <section className="w-full flex gap-10">
        <div className="w-1/6 bg-red-400 px-10 flex flex-col items-center justify-center gap-10">
          HAHAHAH
        </div>
        <div className="w-5/6 px-10 flex flex-col items-center justify-center gap-10">
          <div className="w-full py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {eventList.map((event: EventMetaType, index:number) => (
              <EventCard
                key={index}
                locale={locale}
                id={event.documentId}
                title={getLocalizedTitle(locale, event)}
                //type={event.time.type}
                tags={event.event_tags.map((tag:EventCategoryType) => getLocalizedTagNames(locale, tag))}
                thumbnailUrl={event.thumbnail_img.url}
                time={event.time}
              />
            ))}
          </div>
        </div>  
      </section>
    </div>
  );
}
