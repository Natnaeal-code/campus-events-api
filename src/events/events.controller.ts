import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { EventsService } from './events.service.js';
import { FindEventsQueryDto } from './dto/find-events-query.dto.js';
import { CreateEventDto } from './dto/create-event.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { RolesGuard } from '../common/guard/roles.guard.js';
import { Roles } from '../common/decorator/roles.decorator.js';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
  ) {}

  @ApiOperation({
    summary: 'List all events with filtering, sorting, and pagination',
  })
  @Get()
  findAll(@Query() query: FindEventsQueryDto) {
    return this.eventsService.findAll(query);
  }

  @ApiOperation({
    summary: 'List upcoming events',
  })
  @Get('upcoming')
  findUpcoming() {
    return this.eventsService.findUpcoming();
  }

  @ApiOperation({
    summary: 'Get an event by ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @ApiOperation({
    summary: 'List sessions for an event',
  })
  @Get(':id/sessions')
  findSessions(@Param('id') id: string) {
    return this.eventsService.findSessions(id);
  }

  @ApiOperation({
    summary: 'Get a specific session for an event',
  })
  @Get(':id/sessions/:sessionId')
  findOneSession(
    @Param('id') id: string,
    @Param('sessionId') sessionId: string,
  ) {
    return this.eventsService.findOneSession(id, sessionId);
  }

  @ApiOperation({
    summary: 'Create a new event (admin only)',
  })
  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() body: CreateEventDto) {
    return this.eventsService.create(body);
  }
}