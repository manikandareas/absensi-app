import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '~/core/users/users.service';
import { UserJwt } from '~/lib/types';

@Injectable()
export class OwnerClassGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user: UserJwt = request['user'];

    const classId = request.params.classId;

    const isOwnerClass = await this.usersService.isOwnerClass(user.id, classId);
    if (!isOwnerClass)
      throw new ForbiddenException('You are not the owner of this class');

    return true;
  }
}
