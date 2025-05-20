export const runtime = 'edge';

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";

import { title } from "@/components/primitives";
import MdxLayout from "@/app/MDXLayout";

type Params = Promise<{ locale: string }>;

export default async function AboutPage(props: { params: Params }) {
  const params = await props.params;
  const locale = await params.locale;
  const t = await getTranslations("About");

  let path = "";

  switch (locale) {
    case "en":
      path = `${process.env.R2_ENDPOINT}/markdown/about_en.mdx`;
      break;
    case "zh":
      path = `${process.env.R2_ENDPOINT}/markdown/about_zh.mdx`;
      break;
    case "zh-Hant":
      path = `${process.env.R2_ENDPOINT}/markdown/about_zhHant.mdx`;
      break;
    default:
      path = `${process.env.R2_ENDPOINT}/markdown/about_en.mdx`; // default 'en'
  }
  const res = await fetch(path);
  const markdown = await res.text();

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className={title()}>{t("title")}</h1>
      <div className="p-10 w-full flex flex-col items-center justify-center text-start space-y-10">
        <Image
          alt="Church Entire Family"
          height={1000}
          src={process.env.R2_ENDPOINT + "/2023church-1.jpg"}
          width={1200}
        />
        <MdxLayout>
          <MDXRemote source={markdown} />
        </MdxLayout>

        <iframe
          className="w-full"
          height={800}
          src={process.env.R2_ENDPOINT + "/CSCBC_constitution.pdf"}
          title="CSCBC Constitution Document"
          width={1200}
        />
      </div>
    </div>
  );
}
