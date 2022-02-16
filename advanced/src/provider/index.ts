import { Injectable } from '@nestjs/common';

@Injectable()
export class NormalProvider {
  whoAmI() {
    console.log(`'I'm NormalProvider`);
  }
}
