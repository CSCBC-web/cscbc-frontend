import React from "react";
import { getTranslations } from "next-intl/server";
import Player from 'next-video/player';

import AudioPlayer from "@/components/Sermons/audioPlayer"
import { title } from "@/components/primitives";
import { getSermonById, SermonCatType, getLocalizedTagNames } from "@/lib/sermons";

export default async function SermonDetail(
    props: {
        params: Promise<{ 
            locale: string;
            id: string;}>
    }
) {
  const params = await props.params;
  const locale = params.locale;
  const id = params.id;

  const resp = await getSermonById(id);
  const sermon = resp.data;

  const tags = sermon.sermon_categories.map((category:SermonCatType) => getLocalizedTagNames(locale, category)) || [];
  const t = await getTranslations("Sermon");
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>{t("sermon_details.title")}</h1>
      </div>
      <div className="p-10 flex flex-col justify-col justify-center items-start gap-y-6">
        
        <article className="prose max-w-full">
          {sermon ? (
            <>
              <h1 className="text-black ">{ locale === 'zh' ? sermon.title_zh : locale==='zh-Hant' ? sermon.title_zhHant : sermon.title_en }</h1>
              <h3 className="text-black ">{ sermon.date }</h3>
              <h3 className="text-black ">{ sermon.sermon_speaker.name }</h3>

              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              { sermon.description? (
                <p>
                    { sermon.description }
                </p>
              ) : (
                <>
                
                </>
              )}
            </>
          ) : (
            <>
              <p>No Sermon Found...</p>
            </>
          )}
        </article>
        { sermon.video? (
          <>
            <Player className="w-full"
              style={{ aspectRatio: '16/9'}}
              src={ sermon.video.url }
              poster={ sermon.thumbnail.url }
            />
          </>
        ):(
          <></>
        ) }
                          
                      
        { sermon.audio? (
          <>
            <AudioPlayer
              src={ sermon.audio.url } // 远程链接
              title= { locale === 'zh' ? sermon.title_zh : locale==='zh-Hant' ? sermon.title_zhHant : sermon.title_en } // 音频标题
              className="w-full"
              // 你可以根据需要定制其他 props
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}