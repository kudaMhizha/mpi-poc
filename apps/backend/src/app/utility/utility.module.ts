/*
https://docs.nestjs.com/modules
*/

import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {UtilityResolver} from './utility.resolver';
import {UtilityService} from './utility.service';

@Module({
  imports: [ConfigModule],
  providers: [UtilityResolver, UtilityService],
  exports: [UtilityService],
})
export class UtilityModule {}
