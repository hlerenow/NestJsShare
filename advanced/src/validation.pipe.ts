import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CustomValidationPip implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('经过管道');
    console.log('CustomValidationPip ~ value:', value, ' metadata:', metadata);
    // 这里可以对value 进行格式转换处理，并返回，或者数据校验不通过，抛出异常就可以背异常过滤器捕获
    return value;
  }
}
