import React from "react";
import { Link } from "@heroui/link";
import { Card, CardBody, CardFooter } from "@heroui/card";
import NextImage from "next/image";

import { EventTime } from "@/lib/events";

export interface EventCardProps {
  locale: string;
  id: string;
  title: string;
  //type: string;
  tags?: string[];
  thumbnailUrl?: string;
  time?: EventTime[];
}

export default function EventCard({
  locale,
  id,
  title,
  tags,
  thumbnailUrl,
  time
}: EventCardProps) {
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
        
        return `${start} - ${end.slice(-5)}`; // 同一天只显示一次日期
    }

    return '';
  };
  return (
    <Link href={`/${locale}/events/detail/${id}`}>
      <Card className="py-4 w-80" fullWidth={false}>
        <CardBody className="overflow-visible py-2">
          <figure className="w-full max-h-60 relative aspect-[16/9]">
            <NextImage
              fill
              alt="eventThumbnail"
              className="object-cover"
              priority={false}
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              src={
                thumbnailUrl ||
                "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              }
            />
          </figure>
        </CardBody>
        <CardFooter className="text-lg flex flex-col items-start justify-start">
          <div className="flex w-full pr-4">
            <p className="truncate overflow-hidden text-lg font-semibold">
              {title}
            </p>
          </div>
          {time && (
            <p className="text-sm">
              {parseEventTime(time)}
            </p>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}