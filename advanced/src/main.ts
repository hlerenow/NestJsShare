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
  await app.listen(3000);
  console.log('\n server start at: http://localhost:3000 ');
}
bootstrap();
