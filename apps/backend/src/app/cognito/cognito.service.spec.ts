import {Test, TestingModule} from '@nestjs/testing';
import {CognitoService} from './cognito.service';
import {AppConfigService} from '../config/config.service';
import {CognitoGroups} from '../common/types/cognito-groups.enum';
import {CognitoCreateUserError} from './error/cognito-create-user.error';
import {CognitoIdentityProvider} from '@aws-sdk/client-cognito-identity-provider';

jest.mock('../config/config.service', () => ({
  AppConfigService: jest.fn().mockImplementation(() => ({
    awsConfig: {
      cognito_userPoolId: 'mockUserPoolId',
      cognito_clientId: 'mockClientId',
      region: 'mockRegion',
    },
  })),
}));

jest.mock('@aws-sdk/client-cognito-identity-provider', () => ({
  CognitoIdentityProvider: jest.fn().mockImplementation(() => ({
    adminCreateUser: jest.fn(params => {
      if (params.Username === 'test@example.com') {
        return Promise.resolve({
          User: {Attributes: [{Name: 'sub', Value: '123456'}]},
        });
      } else {
        return Promise.reject(new Error('createUser failed'));
      }
    }),
    adminAddUserToGroup: jest.fn().mockResolvedValue('success'),
  })),
}));

describe('CognitoService', () => {
  let service: CognitoService;
  let cognitoProvider: CognitoIdentityProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        CognitoService,
        {
          provide: CognitoIdentityProvider,
          useValue: {
            adminCreateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CognitoService>(CognitoService);
    cognitoProvider = module.get<CognitoIdentityProvider>(
      CognitoIdentityProvider
    );
    (cognitoProvider.adminCreateUser as jest.Mock).mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create user and add to group successfully', async () => {
      (cognitoProvider.adminCreateUser as jest.Mock).mockResolvedValueOnce({
        User: {Attributes: [{Name: 'sub', Value: '123456'}]},
      });

      const email = 'test@example.com';
      const groupName = CognitoGroups.USERS;
      const tempPassword = 'temporarypassword';

      const userId = await service.createUser({email, groupName, tempPassword});

      expect(userId).toBe('123456');
    });

    it('should throw CognitoCreateUserError when createUser fails', async () => {
      (cognitoProvider.adminCreateUser as jest.Mock).mockRejectedValueOnce(
        new Error('createUser failed')
      );

      const email = 'wrong@example.com';
      const groupName = CognitoGroups.USERS;
      const tempPassword = 'temporarypassword';

      await expect(
        service.createUser({email, groupName, tempPassword})
      ).rejects.toThrow(CognitoCreateUserError);
    });
  });
});
