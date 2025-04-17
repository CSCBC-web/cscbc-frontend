import React from "react";
import { getTranslations } from "next-intl/server";
import NextImage from "next/image";

import { 
  getEventById, 
  EventCategoryType, 
  getLocalizedTitle, 
  getLocalizedTagNames, 
  getLocalizedContent 
} from "@/lib/events";
import { title } from "@/components/primitives";

export default async function EventDetail(
  props: {
    params: Promise<{
      locale: string;
      id: string;
    }>
  }
) {
  const parseEventTime = (timeArray: any[]) => {
    if (!timeArray || timeArray.length === 0) return '';
    
    const timeEntry = timeArray[0];
    const componentType = timeEntry.__component;
    
    if (componentType === 'event-time-fields.weekly-time-fields') {
      return `${timeEntry.weekday} ${timeEntry.start_time.slice(0,5)} - ${timeEntry.end_time.slice(0,5)}`;
    }
    
    if (componentType === 'event-time-fields.once-time-fields') {
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getUTCFullYear()}/${(date.getUTCMonth()+1).toString().padStart(2,'0')}/${date.getUTCDate().toString().padStart(2,'0')} ${date.getUTCHours().toString().padStart(2,'0')}:${date.getUTCMinutes().toString().padStart(2,'0')}`;
      };
      
      const start = formatDate(timeEntry.start_datetime);
      const end = formatDate(timeEntry.end_datetime);
      
      return `${start} - ${end.slice(-5)}`;
    }
    
    return '';
  };
  const params = await props.params;
  const locale = params.locale;
  const id = params.id;

  const resp = await getEventById(id);
  const event = resp.data;

  const tags = event.event_tags.map(
    (category: EventCategoryType) => getLocalizedTagNames(locale, category)
  ) || [];
  const descriptionContent = getLocalizedContent(locale, event)
  const eventTime = parseEventTime(event.time);

  const t = await getTranslations("Event");

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>{t("event_details.title")}</h1>
      </div>
      <figure className="relative w-1/2 h-96">
        <NextImage
          src={event.thumbnail_img.url}
          alt="Thumbnail"
          fill // 使用 fill 布局模式
          sizes="(max-width: 768px) 100vw, 80vw" // 响应式尺寸规则
          className="rounded-lg object-cover shadow-lg" // 保持原有样式
          priority // 首屏图片优先加载
          quality={85} // 优化图片质量
        />
      </figure>
      <div className="p-10 flex flex-col justify-col justify-center items-start gap-y-6">
        <article className="prose max-w-full">
          {event ? (
            <>
              <h1 className="text-black ">{ getLocalizedTitle(locale, event) }</h1>
              <h3 className="text-black ">{ eventTime }</h3>

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

              { descriptionContent ? (
                <p>
                    { descriptionContent }
                </p>
              ) : (
                <>
                
                </>
              )}
            </>
          ) : (
            <>
              <p>No Event Found...</p>
            </>
          )}
        </article>
      </div>
    </div>
  )
}