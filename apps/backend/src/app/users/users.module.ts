import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersResolver} from './users.resolver';
import {CognitoService} from '../cognito/cognito.service';
import {AppConfigService} from '../config/config.service';
import {GeneratePasswordService} from '../common/services/generate-password.service';

@Module({
  imports: [],
  providers: [
    AppConfigService,
    UsersResolver,
    UsersService,
    CognitoService,
    GeneratePasswordService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
