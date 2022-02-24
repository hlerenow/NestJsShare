import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request & { content: any }, res: Response, next: NextFunction) {
    console.log(`\n[Request]-${req.url}-${req.method}-[${new Date()}]`);
    req.content = {
      a: 1,
    };
    next();
    console.log(`\n[Request end]-${req.url}-${req.method}-[${new Date()}]`);
  }
}

// 函数中间件
export async function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`\n[Function][Request]-${req.url}-${req.method}-[${new Date()}]`);
  await next();
  console.log(
    `\n[Function 222][Request end]-${req.url}-${req.method}-[${new Date()}]`,
  );
}
