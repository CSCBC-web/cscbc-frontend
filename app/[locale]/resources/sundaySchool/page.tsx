import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";

import { title } from "@/components/primitives";
import MdxLayout from "@/app/MDXLayout";

type Params = Promise<{ locale: string }>;

export default async function NewComersPage(props: { params: Params }) {
  const params = await props.params;
  const locale = await params.locale;
  const t = await getTranslations("Resources.sunday_school");
  let path = "";

  switch (locale) {
    case "en":
      path = `${process.env.R2_ENDPOINT}/markdown/sundaySchool_en.md`;
      break;
    case "zh":
      path = `${process.env.R2_ENDPOINT}/markdown/sundaySchool_zh.md`;
      break;
    case "zh-Hant":
      path = `${process.env.R2_ENDPOINT}/markdown/sundaySchool_zh-Hant.md`;
      break;
    default:
      path = `${process.env.R2_ENDPOINT}/markdown/sundaySchool_en.md`; // default 'en'
  }
  const res = await fetch(path);
  const markdown = await res.text();
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className={title()}>{t("title")}</h1>
      <div className="p-10 w-full flex flex-col items-center justify-center text-start space-y-10">
        <MdxLayout>
          <MDXRemote source={markdown} />
        </MdxLayout>
      </div>
    </div>
  );
}