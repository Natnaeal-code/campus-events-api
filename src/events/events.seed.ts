

import type { Event, Session } from './event.types.js';

export const EVENTS_SEED: Event[] = [
  {
    id: 'evt-101',
    title: 'Campus Technology Day',
    description: 'A day exploring modern technology and innovation.',
    location: 'Main Campus',
    eventDate: '2026-12-04T09:00:00.000Z',
    category: 'technology',
    isPublished: true,
  },
  {
    id: 'evt-102',
    title: 'Business Leadership Forum',
    description: 'Learn leadership and entrepreneurship skills.',
    location: 'Business Block',
    eventDate: '2026-12-08T10:00:00.000Z',
    category: 'business',
    isPublished: true,
  },
  {
    id: 'evt-103',
    title: 'Annual Sports Competition',
    description: 'A competition between campus departments.',
    location: 'University Stadium',
    eventDate: '2026-12-12T08:00:00.000Z',
    category: 'sports',
    isPublished: true,
  },
  {
    id: 'evt-104',
    title: 'Academic Research Exhibition',
    description: 'Students present their academic research.',
    location: 'Science Block',
    eventDate: '2026-12-15T09:00:00.000Z',
    category: 'academic',
    isPublished: false,
  },
  {
    id: 'evt-105',
    title: 'Campus Cultural Night',
    description: 'An evening celebrating campus culture.',
    location: 'Main Auditorium',
    eventDate: '2026-12-20T17:00:00.000Z',
    category: 'social',
    isPublished: true,
  },
];

export const SESSIONS_SEED: Session[] = [
  {
    id: 'ses-201',
    eventId: 'evt-101',
    title: 'Introduction to Artificial Intelligence',
    startsAt: '2026-12-04T09:00:00.000Z',
    endsAt: '2026-12-04T10:30:00.000Z',
    room: 'Engineering Room 201',
  },
  {
    id: 'ses-202',
    eventId: 'evt-101',
    title: 'Web Development Workshop',
    startsAt: '2026-12-04T11:00:00.000Z',
    endsAt: '2026-12-04T12:30:00.000Z',
    room: 'Engineering Room 202',
  },
  {
    id: 'ses-203',
    eventId: 'evt-102',
    title: 'Starting a Business',
    startsAt: '2026-12-08T10:00:00.000Z',
    endsAt: '2026-12-08T11:30:00.000Z',
    room: 'Business Room 101',
  },
  {
    id: 'ses-204',
    eventId: 'evt-102',
    title: 'Leadership and Management',
    startsAt: '2026-12-08T12:00:00.000Z',
    endsAt: '2026-12-08T13:30:00.000Z',
    room: 'Business Room 102',
  },
];