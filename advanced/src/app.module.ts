import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { logger, LoggerMiddleware } from './middleware/logger.middleware';
import { NormalProvider } from './provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, NormalProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, logger)
      // 制定特定路由（支持url通配符）使用该中间件
      // .forRoutes('/app/:id');
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
