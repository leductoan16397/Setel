import {
  Injectable,
  // CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
// import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserDocument } from 'user/schemas/user.schema';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(
    err,
    user: UserDocument,
    info: Error,
    context: ExecutionContext,
  ): any {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const hasRole = () => user.roles.some((role) => roles.includes(role));
    if (!user) {
      throw new UnauthorizedException(info.message);
    }
    if (!(user.roles && hasRole())) {
      throw new ForbiddenException('Forbidden');
    }
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      roles: user.roles,
    };
  }
}
