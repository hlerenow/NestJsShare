import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 参数装饰器
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log('decorator parameter', data);
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
