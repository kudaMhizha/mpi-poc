import {Module} from '@nestjs/common';
import {CognitoService} from './cognito.service';
import {AppConfigModule} from '../config/config.module';

@Module({
  providers: [CognitoService],
  exports: [CognitoService],
  imports: [AppConfigModule],
})
export class CognitoModule {}
