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
      path =
        "https://pub-89e9920648c44264b2116fe675041bf5.r2.dev/markdown/about_en.mdx";
      break;
    case "zh":
      path =
        "https://pub-89e9920648c44264b2116fe675041bf5.r2.dev/markdown/about_zh.mdx";
      break;
    case "zh-Hant":
      path =
        "https://pub-89e9920648c44264b2116fe675041bf5.r2.dev/markdown/about_zhHant.mdx";
      break;
    default:
      path =
        "https://pub-89e9920648c44264b2116fe675041bf5.r2.dev/markdown/about_en.mdx"; // default 'en'
  }
  const res = await fetch(path);
  const markdown = await res.text();

  return (
    <div>
      <h1 className={title()}>{t("title")}</h1>
      <div className="p-10 w-full flex flex-col items-center justify-center text-start space-y-10">
        <Image
          alt="Church Entire Family"
          height={1000}
          src="https://pub-89e9920648c44264b2116fe675041bf5.r2.dev/2023church-1.jpg"
          width={1200}
        />
        <MdxLayout>
          <MDXRemote source={markdown} />
        </MdxLayout>

        <iframe
          className="w-full"
          height={800}
          src="https://pub-89e9920648c44264b2116fe675041bf5.r2.dev/CSCBC_constitution.pdf"
          title="CSCBC Constitution Document"
          width={1200}
        />
      </div>
    </div>
  );
}
