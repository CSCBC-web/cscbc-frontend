import { getTranslations } from "next-intl/server";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { title } from "@/components/primitives";
import EventCard from "@/components/Events/eventCard";
import EventFilter from "@/components/Events/filter";
import { 
  EventMetaType,
  EventCategoryType, 
  getAllEventCategories,
  getLocalizedTitle, 
  getLocalizedTagNames,
  filterEventsByTagIds
} from "@/lib/events";

// 抽离处理搜索参数和数据获取的函数
async function getEventPageData(
  locale: string, 
  searchParams: { 
    categories?: string; 
    page?: string 
  }) {
  // 辅助函数：解析逗号分隔参数
  const parseArrayParam = (param?: string): string[] => {
    if (!param) return [];
    return param
      .split(',')
      .map(item => decodeURIComponent(item.trim()))
      .filter(Boolean);
  };

  if (!searchParams.page) {
    searchParams.page = "1";
  }

  const searchParamsCategoryList = parseArrayParam(searchParams.categories);

  const categoriesResp = await getAllEventCategories();
  const categories = categoriesResp.data;
  const categoryOptions = categories.map((category: EventCategoryType) => ({
    documentId: category.documentId,
    label: getLocalizedTagNames(locale, category),
  }));

  const resp = await filterEventsByTagIds(
    Number(searchParams.page),
    searchParamsCategoryList,
  );

  return {
    searchParamsCategoryList,
    categoryOptions,
    eventList: resp.data,
    pageMeta: resp.meta.pagination,
  };
}

export default async function EventsPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ 
    categories: string | undefined; 
    page: string | undefined 
  }>;
}) {
  const t = await getTranslations("Event");
  const params = await props.params;
  const locale = params.locale;
  const searchParams = await props.searchParams;

  // 调用抽离的函数获取数据
  const { searchParamsCategoryList, categoryOptions, eventList, pageMeta } =
    await getEventPageData(locale, searchParams);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <section className="inline-block h-[20vh] text-center justify-center">
        <h1 className={title()}>{t("title")}</h1>
      </section>
      <section className="w-full flex gap-10">
        <div className="w-1/6 px-10 flex flex-col items-center justify-center gap-10">
          <EventFilter
            categories={categoryOptions}
            selectedCategories={searchParamsCategoryList}
            categoryGroupTitle={t("filter.categoryGroupTitle")}
            resetButtonText={t("filter.resetButton")}
            applyButtonText={t("filter.applyButton")}
          />
        </div>
        <div className="w-5/6 px-10 flex flex-col items-center justify-center gap-10">
          <div className="w-full py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {eventList.map((event: EventMetaType, index: number) => (
              <EventCard
                key={index}
                locale={locale}
                id={event.documentId}
                title={getLocalizedTitle(locale, event)}
                tags={event.event_tags.map((tag: EventCategoryType) =>
                  getLocalizedTagNames(locale, tag)
                )}
                thumbnailUrl={event.thumbnail_img.url}
                time={event.time}
              />
            ))}
          </div>
          <div className="w-full py-5 flex justify-center items-center mt-4 space-x-4">
            <Button isDisabled={Number(searchParams.page) === 1}>
              <Link href={`/${locale}/sermons?page=${Number(searchParams.page) - 1}`}>
                {t("page_up")}
              </Link>
            </Button>
            <span className="flex items-center">
              {searchParams.page}/{pageMeta.pageCount} {t("page")}
            </span>
            <Button isDisabled={Number(searchParams.page) === pageMeta.pageCount}>
              <Link href={`/${locale}/sermons/?page=${Number(searchParams.page) + 1}`}>
                {t("page_down")}
              </Link>
            </Button>
          </div>
        </div>  
      </section>
    </div>
  );
}
