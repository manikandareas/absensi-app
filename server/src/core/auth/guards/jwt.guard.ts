import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { config } from '~/config';
import { UserJwt } from '~/lib/types';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const token = this.extractTokenFromHeader(request);
      const payload: UserJwt = await this.jwtService.verifyAsync(token, {
        secret: config.jwtSecretKey,
      });

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // return type === 'Bearer' ? token : undefined;
    if (type !== 'Bearer') throw new UnauthorizedException();
    return token;
  }
}
