import {Injectable} from '@nestjs/common';
import {
  AdminCreateUserCommandInput,
  CognitoIdentityProvider,
  UserType,
  AdminAddUserToGroupCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import {CognitoUserIdMissingError} from './error/cognito-user-id-missing.error';
import {AppConfigService} from '../config/config.service';
import {CognitoGroups} from '../common/types/cognito-groups.enum';
import {CognitoCreateUserError} from './error/cognito-create-user.error';

@Injectable()
export class CognitoService {
  private readonly userPoolId: string;
  private readonly clientId: string;
  private cognitoClient: CognitoIdentityProvider;

  constructor(private readonly configService: AppConfigService) {
    this.userPoolId = this.configService.awsConfig.cognito_userPoolId;
    this.clientId = this.configService.awsConfig.cognito_clientId;
    this.cognitoClient = new CognitoIdentityProvider({
      region: this.configService.awsConfig.region,
    });
    this.userPoolId = this.configService.awsConfig.cognito_userPoolId;
  }

  async createUser({
    email,
    groupName,
    tempPassword,
  }: {
    email: string;
    groupName: CognitoGroups.USERS;
    tempPassword: string;
  }) {
    const adminCreateUserCommandInput: AdminCreateUserCommandInput = {
      UserPoolId: this.userPoolId,
      Username: email,
      TemporaryPassword: tempPassword,
      DesiredDeliveryMediums: ['EMAIL'],
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
      ],
    };

    try {
      const reponse = await this.cognitoClient.adminCreateUser(
        adminCreateUserCommandInput
      );

      await this.addUserToGroup(email, groupName);
      return this.getCognitoUserId(reponse.User);
    } catch (error) {
      throw new CognitoCreateUserError(error);
    }
  }

  private addUserToGroup(username: string, groupname: CognitoGroups) {
    const adminAddUserToGroupCommandInput: AdminAddUserToGroupCommandInput = {
      UserPoolId: this.userPoolId,
      Username: username,
      GroupName: groupname,
    };

    return this.cognitoClient.adminAddUserToGroup(
      adminAddUserToGroupCommandInput
    );
  }

  private getCognitoUserId(user: UserType): string {
    const userId = user.Attributes.find(attr => attr.Name === 'sub').Value;

    if (!userId) {
      throw new CognitoUserIdMissingError();
    }

    return userId;
  }
}
