import { Injectable } from '@nestjs/common';
import { EVENTS_SEED,SESSIONS_SEED} from './events.seed.js';
import type { Event, Session } from './event.types.js';

export const EVENT_REPOSITORY = 'EVENT_REPOSITORY';

export interface EventRepository {
  all(): Event[];
  byId(id: string): Event | undefined;
  save(event: Event): Event;
  sessionsByEvent(eventId: string): Session[];
  sessionById(eventId: string, sessionId: string): Session | undefined;
}

@Injectable()
export class InMemoryEventRepository implements EventRepository {
  private readonly events = new Map<string, Event>(
    EVENTS_SEED.map((event) => [event.id, event]),
  );

  private readonly sessions = new Map<string, Session>(
    SESSIONS_SEED.map((session) => [session.id, session]),
  );

  all(): Event[] {
    return [...this.events.values()];
  }

  byId(id: string): Event | undefined {
    return this.events.get(id);
  }

  save(event: Event): Event {
    this.events.set(event.id, event);
    return event;
  }

  sessionsByEvent(eventId: string): Session[] {
    return [...this.sessions.values()].filter(
      (session) => session.eventId === eventId,
    );
  }

  sessionById(eventId: string, sessionId: string): Session | undefined {
    const session = this.sessions.get(sessionId);

    if (!session || session.eventId !== eventId) {
      return undefined;
    }

    return session;
  }
}