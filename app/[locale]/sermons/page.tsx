import { getTranslations } from "next-intl/server";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import { title } from "@/components/primitives";
import SermonCard from "@/components/Sermons/sermonCard";
import SermonFilter from "@/components/Sermons/filter";
import {
  getFilteredSermonsMeta,
  filterSermonsBySpeakerCategoryIds,
  getLocalizedTitle,
  getLocalizedTagNames,
  getAllSermonSpeakers,
  getAllSermonCategories,
  SermonMetaType,
  SermonCatType,
  SermonSpeakerType
} from "@/lib/sermons";
import { get } from "http";

async function getSermonPageData(
  locale: string,
  searchParams: {
    categories?: string;
    speakers?: string;
    page?: string
  }
) {
  const parseArrayParam = (param?: string): string[] => {
    if (!param) return [];
    return param
      .split(',')
      .map(item => decodeURIComponent(item.trim()))
      .filter(Boolean);
  }
  if (!searchParams.page) {
    searchParams.page = "1";
  }

  const searchParamsCategoryList = parseArrayParam(searchParams.categories);
  const searchParamsSpeakerList = parseArrayParam(searchParams.speakers);

  const categoryResp = await getAllSermonCategories();
  const categories = categoryResp.data;
  const categoryOptions = categories.map((category: SermonCatType) => ({
    documentId: category.documentId,
    label: getLocalizedTagNames(locale, category),
  }));

  const speakerResp = await getAllSermonSpeakers();
  const speakers = speakerResp.data;
  const speakerOptions = speakers.map((speaker: SermonSpeakerType) => ({
    documentId: speaker.documentId,
    name: speaker.name,
  }));

  const sermonResp = await filterSermonsBySpeakerCategoryIds(
    Number(searchParams.page),
    searchParamsSpeakerList,
    searchParamsCategoryList,
  );

  return {
    searchParamsCategoryList,
    searchParamsSpeakerList,
    categoryOptions,
    speakerOptions,
    sermonList: sermonResp.data,
    pageMeta: sermonResp.meta.pagination,
  };
}

export default async function Sermons(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ 
    categories: string | undefined; 
    speakers: string | undefined;
    page: string | undefined; }>;
}) {
  const t = await getTranslations("Sermon");
  const params = await props.params;
  const locale = params.locale;
  const searchParams = await props.searchParams;

  const {
    searchParamsCategoryList,
    searchParamsSpeakerList,
    categoryOptions,
    speakerOptions,
    sermonList,
    pageMeta,
  } = await getSermonPageData(locale, searchParams);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <section className="inline-block h-[20vh] text-center justify-center">
        
        <h1 className={title()}>{t("title")}</h1>
      </section>
      <section className="w-full flex gap-10">
        <div className="hidden xl:block w-1/6 px-10 flex-col items-center justify-start gap-10">
          <SermonFilter
            categories={categoryOptions}
            speakers={speakerOptions}
            selectedCategories={searchParamsCategoryList}
            selectedSpeakers={searchParamsSpeakerList}
            categoryGroupTitle={t("filter.categoryGroupTitle")}
            speakerGroupTitle={t("filter.speakerGroupTitle")}
            resetButtonText={t("filter.resetButton")}
            applyButtonText={t("filter.applyButton")}
            // onCategoryChange={() => {}}
            // onSpeakerChange={() => {}}
          />
        </div>
        <div className="w-full xl:w-5/6 px-10 flex flex-col items-center justify-center gap-10">
          <div className="w-full py-5 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 justify-items-center">
            {sermonList.map((sermon: SermonMetaType, index: number) => (
              <SermonCard
                key={index}
                date={sermon.date}
                id={sermon.documentId}
                locale={locale}
                speaker={sermon.sermon_speaker.name}
                tags={sermon.sermon_categories.map((category: SermonCatType) =>
                  getLocalizedTagNames(locale, category),
                )}
                thumbnailUrl={sermon.thumbnail.url}
                title={getLocalizedTitle(locale, sermon)}
              />
            ))}
          </div>
            <div className="w-full py-5 flex justify-center items-center mt-4 space-x-4">
            <Button 
              color="primary"
              variant="solid"
              isDisabled={Number(searchParams.page) === 1}>
              <Link
              href={`/${locale}/sermons?${new URLSearchParams({
                page: String(Number(searchParams.page) - 1),
                ...(searchParams.categories ? { categories: searchParams.categories } : {}),
                ...(searchParams.speakers ? { speakers: searchParams.speakers } : {}),
              }).toString()}`}
              >
                <span className="text-background">{t("page_up")}</span>
              </Link>
            </Button>
            <span className="flex items-center">
              {searchParams.page}/{pageMeta.pageCount} {t("page")}
            </span>
            <Button
              color="primary"
              variant="solid"
              isDisabled={Number(searchParams.page) === pageMeta.pageCount}
            >
              <Link
              href={`/${locale}/sermons?${new URLSearchParams({
                page: String(Number(searchParams.page) + 1),
                ...(searchParams.categories ? { categories: searchParams.categories } : {}),
                ...(searchParams.speakers ? { speakers: searchParams.speakers } : {}),
              }).toString()}`}
              >
              <span className="text-background">{t("page_down")}</span>
              </Link>
            </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
