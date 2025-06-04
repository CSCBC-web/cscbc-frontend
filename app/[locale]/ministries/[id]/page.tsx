import React from 'react';
import { getTranslations } from 'next-intl/server';
import { MDXRemote } from "next-mdx-remote/rsc";
import NextImage from 'next/image';

import { title } from '@/components/primitives';
import { siteConfig } from '@/config/site';
import MdxLayout from '@/app/MDXLayout';

export default async function MinistryDetail(
  props: {
    params: Promise<{
      locale: string;
      id: string;
    }>
  }
) {
  const params = await props.params;
  const locale = params.locale;
  const id = params.id;

  const t = await getTranslations("Ministries");
  
  const ministryList = siteConfig.ministries

  const ministry = ministryList.find((ministry) => ministry.id === id);
  if (!ministry) {
    return <div>{t("notFound")}</div>;
  }

  let ministryDetail: {
    id: string,
    title: string;
    detail: string | undefined;
  } = { id: '', title: '', detail: '' };

  switch (locale) {
    case "zh":
      ministryDetail = {
        id: ministry.id,
        title: ministry.title_zh,
        detail: ministry.detail_md_url_zh,
      }
      break;
    case "zh-Hant":
      ministryDetail = {
        id: ministry.id,
        title: ministry.title_zhHant,
        detail: ministry.detail_md_url_zhHant,
      }
      break;
    default:
      ministryDetail = {
        id: ministry.id,
        title: ministry.title_en,
        detail: ministry.detail_md_url_en,
      }
  }

  if (!ministryDetail.detail) {
    return <div>{t("notFound")}</div>;
  }
  const res = await fetch(ministryDetail.detail);
  const markdown = await res.text();

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className={title()}>
        {ministryDetail.title}
      </h1>
      <div className="p-10 w-full flex flex-col items-center justify-center text-start space-y-10">
        <MdxLayout>
          <MDXRemote source={markdown} />
        </MdxLayout>
      </div>
    </div>
  )
}