import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    console.log('全局守卫：auth token', request.headers.authorization);
    // 返回 true 表示验证通过
    return true;
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 通过反射获取到 controller 或者 method 中定义的元信息
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('局部守卫：roles', roles);
    if (!roles) {
      return true;
    }
    return true;
  }
}
