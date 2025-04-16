// lib/sermons.ts
import qs from "qs";

import BaseType from "./base";

const API_BASE_URL = process.env.BACKEND_API_ENDPOINT;
const PAGE_LIMIT = process.env.DEFAULT_PAGE_SIZE;

export interface SermonCatType extends BaseType {
  title_en: string;
  title_zh: string;
  title_zhHant: string;
}

export interface SermonSpeakerType extends BaseType {
  bio: object;
  name: string;
}

export interface SermonThumbnailType extends BaseType {
  url: string;
}

export interface SermonMetaType extends BaseType {
  date: string;
  description: object;
  sermon_categories: SermonCatType[];
  sermon_speaker: SermonSpeakerType;
  title_en: string;
  title_zh: string;
  title_zhHant: string;

  thumbnail: SermonThumbnailType;
}

export async function getMostRecentSermon() {
  const query = qs.stringify(
    {
      populate: ["thumbnail", "sermon_speaker", "sermon_categories"],
      pagination: {
        page: 1,
        pageSize: 1,
      },
      sort: ["publishedAt:desc"],
    },
    {
      encodeValuesOnly: true,
    },
  );
  const response = await fetch(`${API_BASE_URL}/api/sermons?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recent sermon");
  }

  return response.json();
}

// find all sermons meta info by pagination
export async function getSermonsMetaByPage(page: number) {
  const query = qs.stringify(
    {
      populate: ["thumbnail", "sermon_speaker", "sermon_categories"],
      pagination: {
        page: page,
        pageSize: PAGE_LIMIT,
      },
      sort: ["publishedAt:desc"],
    },
    {
      encodeValuesOnly: true, // prettify URL
    },
  );
  const response = await fetch(`${API_BASE_URL}/api/sermons?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch sermons meta");
  }

  return response.json();
}

// find single sermon by id
export async function getSermonById(id: string) {
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true, // prettify URL
    },
  );
  const response = await fetch(`${API_BASE_URL}/api/sermons/${id}?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch sermon");
  }

  return response.json();
}

// find sermons meta info by filtering speakers and tags and pagination

export async function getFilteredSermonsMeta(
  page: number,
  speakers: string[],
  tagIds: string[],
) {
  const query = qs.stringify(
    {
      filters: {
        $and: [
          {
            sermon_speaker: {
              name: {
                $in: speakers,
              },
            },
          },
          {
            sermon_categories: {
              documentId: {
                $in: tagIds,
              },
            },
          },
        ],
      },
      populate: ["thumbnail", "sermon_speaker", "sermon_categories"],
      pagination: {
        page: page,
        pageSize: PAGE_LIMIT,
      },
      sort: ["publishedAt:desc"],
    },
    {
      encodeValuesOnly: true, // prettify URL
    },
  );
  const response = await fetch(`${API_BASE_URL}/api/sermons?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch filtered sermons meta");
  }

  return response.json();
}
