import React from "react";

import { Link } from "@heroui/link";
import { Card, CardBody, CardFooter } from "@heroui/card";
import NextImage from "next/image";

export interface MinistryCardProps {
  id: string;
  title: string;
  image?: string;
}

export default function MinistryCard(
  {
    id,
    title,
    image
  }: MinistryCardProps
) {
  return (
    <Link href={`/ministries/${id}`}>
      <Card className="py-4 w-96" fullWidth={false}>
        <CardBody className="overflow-visible py-2">
          <figure className="w-full max-h-60 relative aspect-[16/9]">
            <NextImage
              fill
              alt="ministryThumbnail"
              priority={false}
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              src={
                image || `${process.env.R2_ENDPOINT}/default_fellowship.jpg`
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
        </CardFooter>
      </Card>
    </Link>
  )
}