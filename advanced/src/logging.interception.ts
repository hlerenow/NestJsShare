import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    console.log('LoggingInterceptor Before...');
    const now = Date.now();
    const result = await lastValueFrom(
      next
        .handle()
        .pipe(
          tap(() =>
            console.log(`LoggingInterceptor After... ${Date.now() - now}ms`),
          ),
        ),
    );
    console.log(' LoggingInterceptor ~ result', result);
    // 修改具体的返回结果
    return result + ' [拦截器添加：LoggingInterceptor]';
  }
}
