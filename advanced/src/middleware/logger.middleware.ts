import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`\n[Request]-${req.url}-${req.method}-[${new Date()}]`);
    next();
    console.log(`\n[Request end]-${req.url}-${req.method}-[${new Date()}]`);
  }
}

// 函数中间件
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`\n[Function][Request]-${req.url}-${req.method}-[${new Date()}]`);
  next();
  console.log(
    `\n[Function][Request end]-${req.url}-${req.method}-[${new Date()}]`,
  );
}
