import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './authorization.guard';
import { AllExceptionFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  // 全局使用异常过滤器
  app.useGlobalFilters(new AllExceptionFilter(httpAdapterHost));
  // 全局守卫
  app.useGlobalGuards(new AuthGuard());
  const port = 3012;
  await app.listen(port);
  console.log(`\n server start at: http://localhost:${port} `);
}
bootstrap();
