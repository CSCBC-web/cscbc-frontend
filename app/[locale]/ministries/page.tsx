export const runtime = 'edge';

import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/config/site";

import { title } from "@/components/primitives";
import MinistryCard from "@/components/ministries/ministryCard";

type Params = Promise<{ locale: string }>;

export default async function NewComersPage(props: { 
  params: Params 
}) {
  const params = await props.params;
  const locale = await params.locale;
  const t = await getTranslations("Ministries");

  const ministryMetaList = siteConfig.ministries.map((ministry) => {
    let ministryMeta: { 
      id: string, 
      title: string,
      img?: string
    } = { id: '', title: '', img: '' };
    switch (locale) {
      case "zh": 
        ministryMeta = {
          id: ministry.id,
          title: ministry.title_zh,
          img: ministry.img_url,
        }
        break;
      case "zh-Hant":
        ministryMeta = {
          id: ministry.id,
          title: ministry.title_zhHant,
          img: ministry.img_url,
        }
        break;
      default:
        ministryMeta = {
          id: ministry.id,
          title: ministry.title_en,
          img: ministry.img_url,
        }
    }
    return ministryMeta;
  })

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <section className="inline-block h-[20vh] text-center justify-center">
        <h1 className={title()}>{t("title")}</h1>
      </section>
      <section className="max-w-7xl flex flex-col gap-10">
        <div className="w-full px-10 flex flex-col items-center justify-center gap-10">
          <div className="w-full py-5 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 justify-items-center">
            {ministryMetaList.map((ministry) => (
              <MinistryCard
                key={ministry.id}
                id={ministry.id}
                title={ministry.title}
                image={ministry.img}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}