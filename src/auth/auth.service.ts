import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

import { UsersService } from '../users/users.service.js';
import type { User } from '../users/user.types.js';
import type { RegisterDto } from './dto/register.dto.js';
import type { LoginDto } from './dto/login.dto.js';
import type { RefreshDto } from './dto/refresh.dto.js';
import type { TokenPairDto } from './dto/token-pair.dto.js';

interface RefreshPayload {
  sub: number;
  type: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.users.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await argon2.hash(dto.password);

    const user = await this.users.create({
      email: dto.email.toLowerCase(),
      passwordHash,
      roles: ['attendee'],
      refreshTokenHash: null,
    });

    return {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
  }

  async login(dto: LoginDto): Promise<TokenPairDto> {
    const user = await this.users.findByEmail(dto.email);

    const validPassword =
      user && await argon2.verify(user.passwordHash, dto.password);

    if (!validPassword || !user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokens(user);
  }

  async refresh(dto: RefreshDto): Promise<TokenPairDto> {
    let payload: RefreshPayload;

    try {
      payload = await this.jwt.verifyAsync<RefreshPayload>(
        dto.refreshToken,
        {
          secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
          algorithms: ['HS256'],
        },
      );
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.users.findById(payload.sub);

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const validToken = await argon2.verify(
      user.refreshTokenHash,
      dto.refreshToken,
    );

    if (!validToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.issueTokens(user);
  }

  private async issueTokens(user: User): Promise<TokenPairDto> {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    const accessToken = await this.jwt.signAsync(payload);

    const refreshToken = await this.jwt.signAsync(
      { sub: user.id, type: 'refresh' },
      {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
        algorithm: 'HS256',
      },
    );

    const refreshTokenHash = await argon2.hash(refreshToken);

    await this.users.updateRefreshTokenHash(user.id, refreshTokenHash);

    return { accessToken, refreshToken };
  }
}