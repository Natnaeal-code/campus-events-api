import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UsersRepository,
} from './users.repository.js';
import type { User } from './user.types.js';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findByEmail(email);
  }

  findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findById(id);
  }

  create(data: Omit<User, 'id'>): Promise<User> {
    return this.usersRepository.create(data);
  }

  updateRefreshTokenHash(
    userId: number,
    hash: string | null,
  ): Promise<void> {
    return this.usersRepository.updateRefreshTokenHash(userId, hash);
  }
}