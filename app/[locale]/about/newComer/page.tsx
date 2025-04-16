import { getTranslations } from "next-intl/server";

import { title } from "@/components/primitives";

type Params = Promise<{ locale: string }>;

export default async function NewComersPage(props: { params: Params }) {
  const params = await props.params;
  const locale = await params.locale;
  const t = await getTranslations("About.NewComer");
  // TODO: Add .md files for paragraphs below.
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className={title()}>{t("title")}</h1>
    </div>
  );
}