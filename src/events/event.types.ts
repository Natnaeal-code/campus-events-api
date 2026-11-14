export const EVENT_CATEGORIES =[
    "technology",
    "business",
    "academic",
    "sports",
    "social",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export interface Event {
  readonly id: string;
  title: string;
  description: string;
  location: string;
  eventDate: string;
  category: EventCategory;
  isPublished: boolean;
}

export interface Session {
  readonly id: string;
  eventId: string;
  title: string;
  startsAt: string;
  endsAt: string;
  room: string;
}