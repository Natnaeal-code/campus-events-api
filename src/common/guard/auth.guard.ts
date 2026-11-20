
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import type { Request } from 'express';

const mockUsers = [
  {
    id: 1,
    name: 'Abebe',
    role: 'admin',
  },
  {
    id: 2,
    name: 'Hana',
    role: 'attendee',
  },
];

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    const userId = req.headers['x-user-id'];

    if (!userId) {
      throw new UnauthorizedException('User ID is required');
    }

    const user = mockUsers.find(
      (user) => user.id === Number(userId),
    );

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    (req as Request & { user: typeof mockUsers[number] }).user = user;

    return true;
  }
}
