import qs from 'qs';

import BaseType from './base';

const API_BASE_URL = process.env.BACKEND_API_ENDPOINT;
const PAGE_LIMIT = process.env.DEFAULT_PAGE_SIZE;

export interface EventCategoryType extends BaseType {
    title_en: string,
    title_zh: string,
    title_zhHant: string,
}

enum EventType {
    Once = "special",
    Weekly = "weekly",
}

// 定义可辨识联合类型，将两种类型合并为一个类型
export type EventTime =
| {
    type: EventType.Once;
    start_datetime: string;
    end_datetime: string;
    }
| {
    type: EventType.Weekly;
    weekday: string;
    start_time: string;
    end_time: string;
    };

export interface EventMetaType extends BaseType {
    title_en: string,
    title_zh: string,
    title_zhHant: string,
    time: EventTime[],
    location: string,
    description_en: string,
    description_zh: string,
    description_zhHant: string,
    thumbnail_img: { url: string },
    event_tags: EventCategoryType[],
}

export async function getTop5FeaturedEvents() {
    const query = qs.stringify({
        populate: ['time', 'thumbnail_img', 'event_tags'],
        pagination: {
            page: 1,
            pageSize: 5,
        },
        sort: ['publishedAt:desc'],
        filters: {
            type: {
                $eq: 'special'
            }
        }
    },{
        encodeValuesOnly: true,
    });
    const response = await fetch(`${API_BASE_URL}/api/events?${query}`);
    if (!response.ok) {
        throw new Error('Failed to fetch featured events');
    }
    return response.json();
}

export async function getEventMetaByPage(page: number) {
    const query = qs.stringify({
        populate: ['time', 'thumbnail_img', 'event_tags'],
        pagination: {
            page: page,
            pageSize: PAGE_LIMIT,
        }
    },{
        encodeValuesOnly: true,
    });
    const response = await fetch(`${API_BASE_URL}/api/events?${query}`);
    if (!response.ok) {
        throw new Error('Failed to fetch events meta');
    }
    return response.json();
}

export async function getEventById(id: string) {
    const query = qs.stringify({
        populate: '*'
    },{
        encodeValuesOnly: true,
    });
    const response = await fetch(`${API_BASE_URL}/api/events/${id}?${query}`);
    if (!response.ok) {
        throw new Error('Failed to fetch event');
    }
    return response.json();
}

export async function getFilteredEventsMeta(page:number, tagIds: string[]) {

    const query = qs.stringify({
        filters: {
            event_tags: {
                documentId: {
                    $in: tagIds
                }
            }
        },
        populate: '*',
        pagination: {
            page: page,
            pageSize: PAGE_LIMIT,
        }
    },{
        encodeValuesOnly: true,
    });
    const response = await fetch(`${API_BASE_URL}/api/events?${query}`);
    if (!response.ok) {
        throw new Error('Failed to fetch filtered events meta');
    }
    return response.json();
}