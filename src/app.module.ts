
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EventsModule } from './events/events.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'node:crypto';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    EventsModule,
    UsersModule,
    AuthModule,

    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? 'info',

        genReqId: (req, res) => {
          const id =
            (req.headers['x-request-id'] as string) ?? randomUUID();

          res.setHeader('x-request-id', id);

          return id;
        },

        redact: {
          paths: [
            'req.headers.authorization',
            'req.headers.x-api-key',
            'req.body.password',
            'req.body.phone',
          ],
          censor: '[redacted]',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
