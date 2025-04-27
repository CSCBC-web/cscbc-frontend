import { getTranslations } from "next-intl/server";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import { title } from "@/components/primitives";
import EventCard from "@/components/Events/eventCard";
import EventFilter from "@/components/Events/filter";
import { 
  EventMetaType,
  EventCategoryType, 
  getFilteredEventsMeta,
  getAllEventCategories,
  getLocalizedTitle, 
  getLocalizedTagNames 
} from "@/lib/events";

export default async function EventsPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ 
    categories: string | undefined; 
    page: string | undefined }>;
}) {
  const t = await getTranslations("Event");
  const params = await props.params;
  const locale = params.locale;

  const searchParams = await props.searchParams;

  const parseArrayParam = (param?: string): string[] => {
    if (!param) return [];
    return param
      .split(',')
      .map(item => decodeURIComponent(item.trim()))
      .filter(Boolean);
  };
  const searchParamsCategoryList = parseArrayParam(searchParams.categories);

  if (!searchParams.page) {
    searchParams.page = "1";
  }

  const resp = await getFilteredEventsMeta(
    locale,
    Number(searchParams.page),
    searchParamsCategoryList,
  )

  const categoriesResp = await getAllEventCategories();
  const categories = categoriesResp.data;
  const categoryNameList = categories.map((category: EventCategoryType) => 
    getLocalizedTagNames(locale, category)
  )

  const eventList = resp.data;
  const pageMeta = resp.meta.pagination;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <section className="inline-block h-[20vh] text-center justify-center">
        <h1 className={title()}>{t("title")}</h1>
      </section>
      <section className="w-full flex gap-10">
        <div className="w-1/6 px-10 flex flex-col items-center justify-center gap-10">
          <EventFilter
            categories={categoryNameList}
            selectedCategories={searchParamsCategoryList}
            categoryGroupTitle={t("filter.categoryGroupTitle")}
            resetButtonText={t("filter.resetButton")}
            applyButtonText={t("filter.applyButton")}
          />
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
          <div className="w-full py-5 flex justify-center items-center mt-4 space-x-4">
            <Button isDisabled={Number(searchParams.page) === 1}>
              <Link
                href={`/${locale}/sermons?page=${Number(searchParams.page) - 1}`}
              >
                {t("page_up")}
              </Link>
            </Button>
            <span className="flex items-center">
              {searchParams.page}/{pageMeta.pageCount} {t("page")}
            </span>
            <Button
              isDisabled={Number(searchParams.page) === pageMeta.pageCount}
            >
              <Link
                href={`/${locale}/sermons/?page=${Number(searchParams.page) + 1}`}
              >
                {t("page_down")}
              </Link>
            </Button>
          </div>
        </div>  
      </section>
    </div>
  );
}
