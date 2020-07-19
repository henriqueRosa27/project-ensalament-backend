import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private service: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const token = context
      .switchToHttp()
      .getRequest()
      .headers.authorization.split(' ')[1];
    const decoded = this.service.verify(token);

    const user = await this.userService.findById(decoded.user.id);

    if (roles.includes(user.role.name)) {
      return true;
    }

    return false;
  }
}
