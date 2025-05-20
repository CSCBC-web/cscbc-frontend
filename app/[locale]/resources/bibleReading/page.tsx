export const runtime = 'edge';

import { getTranslations } from "next-intl/server";

import { title } from "@/components/primitives";

type Params = Promise<{ locale: string }>

export default async function BibleReadingPage(props: { params: Params }) {
  const params = await props.params;
  const locale = await params.locale;

  const t = await getTranslations("Resources.bible_reading");

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className={title()}>{t("title")}</h1>
      <div className="p-10 w-full flex flex-col items-center justify-center text-start space-y-10">
        <iframe 
          className="w-2/3"
          height={800}
          title="CSCBC Bible Reading 2025"
          width={800}
          src={process.env.R2_ENDPOINT + "/CSCBC2025BibleReadingPlan.pdf"}>

        </iframe>
      </div>
    </div>
  );
}