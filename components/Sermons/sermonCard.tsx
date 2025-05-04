import React from "react";
import { Link } from "@heroui/link";
import { Card, CardBody, CardFooter } from "@heroui/card";
import NextImage from "next/image";

export interface SermonCardProps {
  locale: string;
  id: string;
  title: string;
  date: string;
  speaker: string;
  tags?: string[];
  thumbnailUrl: string;
}

export default function SermonCard({
  locale,
  id,
  title,
  date,
  speaker,
  tags,
  thumbnailUrl,
}: SermonCardProps) {
  return (
    <Link href={`/${locale}/sermons/detail/${id}`}>
      <Card className="py-4 w-96" fullWidth={false}>
        <CardBody className="overflow-visible py-2">
          <figure className="w-full max-h-60 relative aspect-[16/9]">
            <NextImage
              fill
              alt="sermonThumbnail"
              className="object-cover"
              priority={false}
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              src={
                thumbnailUrl || `${process.env.R2_ENDPOINT}/default_fellowship.jpg`
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
          <div className="flex w-full pr-4 justify-between text-sm text-muted-foreground">
            <p className="truncate">{speaker}</p>
            <p className="truncate">{date}</p>
          </div>
          {/* <span className="text-sm text-muted-foreground">
            {speaker} - {date}
          </span> */}
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
