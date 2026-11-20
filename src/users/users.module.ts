import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import {
  USER_REPOSITORY,
  InMemoryUsersRepository,
} from './users.repository.js';

@Module({
  providers: [
    UsersService,
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUsersRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}