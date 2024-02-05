import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Config} from './config.interface';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}
  get awsConfig(): Config['awsConfig'] {
    return {
      region: this.configService.get<string>('AWS_REGION'),
      cognito_userPoolId: this.configService.get<string>(
        'AWS_COGNITO_USER_POOL_ID'
      ),
      cognito_clientId: this.configService.get<string>('AWS_COGNITO_CLIENT_ID'),
      cognito_issuer: this.configService.get<string>('AWS_COGNITO_ISSUER'),
    };
  }
}
