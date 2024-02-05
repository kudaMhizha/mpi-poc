import {Test, TestingModule} from '@nestjs/testing';
import {UsersResolver} from './users.resolver';
import {UsersService} from './users.service';
import {CognitoService} from '../cognito/cognito.service';
import {PrismaService} from '../prisma/prisma.service';
import {AppConfigService} from '../config/config.service';
import {GeneratePasswordService} from '../common/services/generate-password.service';
import {ConfigService} from '@nestjs/config';
import {IniviteUserinput} from './dto/invite-user.input';
import {InvitedUser} from './models/invited-user.model';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            inviteUser: jest.fn(),
          },
        },
        CognitoService,
        PrismaService,
        AppConfigService,
        GeneratePasswordService,
        ConfigService,
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('inviteUser', () => {
    it('should call usersService.inviteUser with correct argument', () => {
      const input: IniviteUserinput = {
        email: 'test@example.com',
        name: 'John',
        surname: 'Doe',
        companyId: '123',
        phoneNumber: '+27 391 2012 320',
        accessLevel: 'Level_1',
        jobDescription: 'Driver',
      };
      const expectedResult: InvitedUser = {successFullInvite: true};

      (usersService.inviteUser as jest.Mock).mockResolvedValueOnce(
        expectedResult
      );

      expect(resolver.inviteUser(input)).resolves.toEqual(expectedResult);
      expect(usersService.inviteUser).toHaveBeenCalledWith(input);
    });
  });
});
