import { HttpException, Injectable, UseFilters } from '@nestjs/common';
import { ServiceExceptionFilter } from './exception.filter';

@Injectable()
export class AppService {
  // 拦截没有效果
  @UseFilters(new ServiceExceptionFilter())
  getHello(): string {
    if (Math.random() > 0.5) {
      throw new HttpException('service methods', 401);
    }
    return 'Hello World!';
  }
}
