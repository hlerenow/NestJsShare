import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './authorization.guard';
import { User } from './custom.decorator';
import { HttpExceptionFilter } from './exception.filter';
import { LoggingInterceptor } from './logging.interception';
import { NormalProvider } from './provider';
import { Roles } from './roles.decorator';
import { CustomValidationPip } from './validation.pipe';

// 测试请求体类型
type BodyType = {
  id: string;
};

type QueryType = BodyType;

@Controller('/app')
@UseGuards(RolesGuard)
// controller 级别使用
@UseFilters(new HttpExceptionFilter())
// 拦截器
@UseInterceptors(new LoggingInterceptor())
export class AppController {
  constructor(
    private readonly appService: AppService,
    readonly normalProvider: NormalProvider,
  ) {}

  // 访问路径 http://localhost:3000/app/
  @Get()
  @Roles('admin')
  // 方法级别使用
  @UseFilters(new HttpExceptionFilter())
  // 使用自定义管道
  findAll(@Query(CustomValidationPip) query: QueryType) {
    // 概率抛错
    if (Math.random() > 0.5) {
      throw new ForbiddenException();
    }
    console.log(this.normalProvider.whoAmI());
    return `This action query: id=${query.id}, ${this.appService.getHello()}`;
  }

  // 访问路径 http://localhost:3000/app/:id, id = 1
  @Get(':id')
  findOne(@Param('id') id: string, @User('hello') user: any) {
    console.log('user', user);
    return `This action returns a #${id} cat`;
  }

  @Post()
  // 方法级别捕获
  create(@Body() body: BodyType) {
    console.log(body);

    return `This action post id=${body.id}`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: BodyType) {
    return `This action bodyId = ${body.id} paramId=${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id}`;
  }
}
