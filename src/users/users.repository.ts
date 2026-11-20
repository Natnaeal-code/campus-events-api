import type { User } from './user.types.js';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: number): Promise<User | undefined>;
  create(user: Omit<User, 'id'>): Promise<User>;
  updateRefreshTokenHash(
    userId: number,
    hash: string | null,
  ): Promise<void>;
}

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];
  private nextId = 1;

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const user: User = {
      id: this.nextId++,
      ...data,
    };

    this.users.push(user);
    return user;
  }

  async updateRefreshTokenHash(
    userId: number,
    hash: string | null,
  ): Promise<void> {
    const user = await this.findById(userId);

    if (user) {
      user.refreshTokenHash = hash;
    }
  }
}