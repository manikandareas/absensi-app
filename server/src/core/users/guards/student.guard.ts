import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserRole } from '~/core/db/db.schema';
import { UserJwt } from '~/lib/types';

@Injectable()
export class StudentGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: UserJwt = request['user'];
    if (user.sub?.role !== UserRole.STUDENT) throw new ForbiddenException();
    return true;
  }
}
