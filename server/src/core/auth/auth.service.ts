import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { compare } from 'bcrypt';
import { config } from '~/config';
import { CheckAvailabilityQueries } from '~/lib/types';

const EXPIRE_TIME = 1000 * 60 * 60 * 5;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(signInDto: SignInDto) {
    const user = await this.usersService.findByEmail(signInDto.email);

    if (user && (await compare(signInDto.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.validateUser(signInDto);

    const payload = {
      id: user.id,
      sub: {
        ...user,
      },
    };
    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '5h',
          secret: config.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: config.jwtRefreshKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async refreshToken(user: any) {
    const payload = {
      id: user.id,
      sub: {
        ...user.sub,
      },
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '5h',
        secret: config.jwtSecretKey,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: config.jwtRefreshKey,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  async checkAvailability(queries: CheckAvailabilityQueries) {
    const email = queries['email'] as string;
    const universityId = queries['universityId'] as string;
    const result = [];
    if (email) {
      const user = await this.usersService.queryUserByEmail(email);
      result.push({
        field: 'email',
        status: !!user ? 'Already used' : 'Available',
      });
    }
    if (universityId) {
      const user = await this.usersService.queryByUniversityId(universityId);
      result.push({
        field: 'university-id',
        status: !!user ? 'Already used' : 'Available',
      });
    }

    return result;
  }
}
