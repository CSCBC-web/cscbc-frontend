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
export async function filterSermonsBySpeakerCategoryIds(
  page: number,
  speakerIds: string[],
  categoryIds: string[],
) {
  const query = qs.stringify({
    filters: {
      $or: [
        {
          sermon_speaker: {
            documentId: { $in: speakerIds }
          }
        },
        {
          sermon_categories: {
            documentId: { $in: categoryIds }
          }
        }
      ]
    },
    populate: ["thumbnail", "sermon_speaker", "sermon_categories"],
    pagination: {
      page: page,
      pageSize: PAGE_LIMIT,
    },
    status: "published",
    sort: ["publishedAt:desc"],
  },{
    encodeValuesOnly: true, // prettify URL
  });
  const response = await fetch(`${API_BASE_URL}/api/sermons?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch filtered sermons meta");
  }

  return response.json();
}
// find sermons meta info by filtering speakers and tags and pagination

export async function getFilteredSermonsMeta(
  locale: string,
  page: number,
  speakers: string[],
  tagNames: string[],
) {

  let categoryFilterJson = {};

  switch (locale) {
    case "zh-Hant":
      categoryFilterJson = {
        title_zhHant: {
          $in: tagNames,
        },
      };
      break;
    case "zh":
      categoryFilterJson = {
        title_zh: {
          $in: tagNames,
        },
      };
      break;
    default:
      categoryFilterJson = {
        title_en: {
          $in: tagNames,
        },
      };
      break;
  }

  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            sermon_speaker: {
              name: {
                $in: speakers,
              },
            },
          },
          {
            sermon_categories: categoryFilterJson
          },
        ],
      },
      populate: ["thumbnail", "sermon_speaker", "sermon_categories"],
      pagination: {
        page: page,
        pageSize: PAGE_LIMIT,
      },
      status: "published",
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

export const getLocalizedTitle = (locale: string, sermon: SermonMetaType) => {
  if (locale === "zh-Hant") return sermon.title_zhHant;
  if (locale === "zh") return sermon.title_zh;

  return sermon.title_en;
};

export const getLocalizedTagNames = (locale: string, tag: SermonCatType) => {
  if (locale === "zh-Hant") return tag.title_zhHant;
  if (locale === "zh") return tag.title_zh;

  return tag.title_en;
};

// get all sermon speakers

export async function getAllSermonSpeakers() {
  const query = qs.stringify(
    {
      populate: "*",
      status: "published",
    },
    {
      encodeValuesOnly: true, // prettify URL
    },
  );
  const response = await fetch(`${API_BASE_URL}/api/sermon-speakers?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch sermon speakers");
  }

  return response.json();
}

// get all sermon categories
export async function getAllSermonCategories() {
  const query = qs.stringify(
    {
      populate: "*",
      status: "published",
    },
    {
      encodeValuesOnly: true, // prettify URL
    },
  );
  const response = await fetch(`${API_BASE_URL}/api/sermon-categories?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch sermon categories");
  }

  return response.json();
}