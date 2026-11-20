
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

import type { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    const key = req.headers['x-api-key'];

    if (!key) {
      throw new UnauthorizedException('x-api-key is required');
    }

    if (key !== 'my-secret-key') {
      throw new ForbiddenException('Invalid API key');
    }

    return true;
  }
}
