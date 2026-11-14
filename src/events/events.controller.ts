
import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
} from '@nestjs/common';

import { EventsService } from './events.service.js';
import { FindEventsQueryDto } from './dto/find-events-query.dto.js';
import { CreateEventDto } from './dto/create-event.dto.js';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
  ) {}

  // GET /api/events
  @Get()
  findAll(@Query() query: FindEventsQueryDto) {
    return this.eventsService.findAll(query);
  }

  // GET /api/events/upcoming
  @Get('upcoming')
  findUpcoming() {
    return this.eventsService.findUpcoming();
  }

  // GET /api/events/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  // GET /api/events/:id/sessions
  @Get(':id/sessions')
  findSessions(@Param('id') id: string) {
    return this.eventsService.findSessions(id);
  }

  // GET /api/events/:id/sessions/:sessionId
  @Get(':id/sessions/:sessionId')
  findOneSession(
    @Param('id') id: string,
    @Param('sessionId') sessionId: string,
  ) {
    return this.eventsService.findOneSession(id, sessionId);
  }

  // POST /api/events
  @Post()
  create(@Body() body: CreateEventDto) {
    return this.eventsService.create(body);
  }
}
