import { getTranslations } from "next-intl/server";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import { title } from "@/components/primitives";
import SermonCard from "@/components/Sermons/sermonCard";
import {
  getFilteredSermonsMeta,
  getLocalizedTitle,
  getLocalizedTagNames,
  SermonMetaType,
  SermonCatType,
} from "@/lib/sermons";

export default async function Sermons(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ cat: string[] | undefined; page: string | undefined; speakers: string[] | undefined }>;
}) {
  // 处理没有传入searchParams的情况
  const searchParams = await props.searchParams;

  if (!searchParams.cat) {
    searchParams.cat = [];
  }
  if (!searchParams.page) {
    searchParams.page = "1";
  }
  if (!searchParams.speakers) {
    searchParams.speakers = [];
  }

  const t = await getTranslations("Sermon");
  const params = await props.params;
  const locale = params.locale;

  // const currentCat = props.searchParams.cat || "all";
  const resp = await getFilteredSermonsMeta(
    Number(searchParams.page),
    searchParams.speakers,
    searchParams.cat,
  );
  const sermonList = resp.data;
  const pageMeta = resp.meta.pagination;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <section className="inline-block h-[20vh] text-center justify-center">
        
        <h1 className={title()}>{t("title")}</h1>
      </section>
      <section className="w-full flex gap-10">
        <div className="w-1/6 px-10 flex flex-col items-center justify-center gap-10">
          {/* TODO: Add a filter tab */}
          Filter tab is in progress...
        </div>
        <div className="w-5/6 px-10 flex flex-col items-center justify-center gap-10">
          <div className="w-full py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
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
