import { Module } from '@nestjs/common';

import { EventsController } from './events.controller.js';
import { EventsService } from './events.service.js';

import {
  EVENT_REPOSITORY,
  InMemoryEventRepository,
} from './events.repository.js';

import { RolesGuard } from '../common/guard/roles.guard.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';

@Module({
  controllers: [EventsController],
  providers: [
    EventsService,
    JwtAuthGuard,
    RolesGuard,
    {
      provide: EVENT_REPOSITORY,
      useClass: InMemoryEventRepository,
    },
  ],
})
export class EventsModule {}