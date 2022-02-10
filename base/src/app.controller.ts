import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

// 测试请求体类型
type BodyType = {
  id: string;
};

type QueryType = BodyType;

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post()
  create(@Body() body: BodyType) {
    console.log(body);
    return `This action post id=${body.id}`;
  }
  // 访问路径 http://localhost:3000/app/
  @Get()
  findAll(@Query() query: QueryType) {
    return `This action query: id=${query.id}, ${this.appService.getHello()}`;
  }
  // 访问路径 http://localhost:3000/app/:id, id = 1
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
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
