
import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EVENT_REPOSITORY } from './events.repository.js';
import type { EventRepository } from './events.repository.js';
import type { Event, Session } from './event.types.js';
import type { FindEventsQueryDto } from './dto/find-events-query.dto.js';
import type { CreateEventDto } from './dto/create-event.dto.js';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventsRepo: EventRepository,
  ) {}

  // Get, filter, sort, and paginate events
  findAll(query: FindEventsQueryDto = {}) {
    let events = this.eventsRepo.all();

    // Filter by category
    if (query.category) {
      events = events.filter(
        (event) => event.category === query.category,
      );
    }

    // Filter by location
    if (query.location) {
      events = events.filter(
        (event) =>
          event.location.toLowerCase().includes(
            query.location!.toLowerCase(),
          ),
      );
    }

    // Filter by publication status
    if (query.isPublished !== undefined) {
      events = events.filter(
        (event) => event.isPublished === query.isPublished,
      );
    }

    // Sort events
    if (query.sortBy) {
      const direction = query.order === 'desc' ? -1 : 1;

      events = [...events].sort((a, b) => {
        let comparison: number;

        if (query.sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        } else {
          comparison =
            new Date(a.eventDate).getTime() -
            new Date(b.eventDate).getTime();
        }

        return comparison * direction;
      });
    }

    // Paginate events
    const page = query.page ?? 1;
    const limit = query.limit ?? 5;

    const total = events.length;
    const offset = (page - 1) * limit;

    const items = events.slice(offset, offset + limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Get events happening today or in the future
  findUpcoming(): Event[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.eventsRepo.all().filter(
      (event) => new Date(event.eventDate) >= today,
    );
  }

  // Get one event by ID
  findOne(id: string): Event {
    const event = this.eventsRepo.byId(id);

    if (!event) {
      throw new NotFoundException(
        `Event with ID ${id} not found`,
      );
    }

    return event;
  }

  // Get all sessions belonging to an event
  findSessions(eventId: string): Session[] {
    this.findOne(eventId);

    return this.eventsRepo.sessionsByEvent(eventId);
  }

  // Get one session belonging to an event
  findOneSession(
    eventId: string,
    sessionId: string,
  ): Session {
    this.findOne(eventId);

    const session = this.eventsRepo.sessionById(
      eventId,
      sessionId,
    );

    if (!session) {
      throw new NotFoundException(
        `Session with ID ${sessionId} not found in event ${eventId}`,
      );
    }

    return session;
  }

  // Create a new event
  create(dto: CreateEventDto): Event {
    const event: Event = {
      id: `evt-${Date.now()}`,
      title: dto.title,
      description: dto.description,
      location: dto.location,
      eventDate: dto.eventDate,
      category: dto.category,
      isPublished: dto.isPublished,
    };

    return this.eventsRepo.save(event);
  }
}
