import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserRole } from '~/core/db/db.schema';
import { UserJwt } from '~/lib/types';

@Injectable()
export class LecturerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: UserJwt = request['user'];
    console.log(user);
    if (user.sub?.role !== UserRole.LECTURER) throw new ForbiddenException();
    return true;
  }
}
