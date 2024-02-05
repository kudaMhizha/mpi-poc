import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from './users.service';
import {CognitoService} from '../cognito/cognito.service';
import {PrismaService} from '../prisma/prisma.service';
import {GeneratePasswordService} from '../common/services/generate-password.service';
import {AppConfigService} from '../config/config.service';
import {ConfigService} from '@nestjs/config';
import {CognitoGroups} from '../common/types/cognito-groups.enum';
import {IniviteUserinput} from './dto/invite-user.input';

const user = {
  email: 'test@example.com',
  name: 'John',
  surname: 'Doe',
  companyId: '123',
  phoneNumber: '+27 391 2012 320',
  accessLevel: 'Level_1',
  jobDescription: 'Driver',
};

const prismaClient = {
  user: {
    create: jest.fn().mockResolvedValue(user),
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let cognitoService: CognitoService;
  const cognitoServiceMock = {
    createUser: jest.fn(() => Promise.resolve()),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: CognitoService,
          useValue: cognitoServiceMock,
        },
        {
          provide: PrismaService,
          useValue: {...prismaClient},
        },
        GeneratePasswordService,
        AppConfigService,
        ConfigService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    cognitoService = module.get<CognitoService>(CognitoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should invite a user successfully', async () => {
    const input: IniviteUserinput = {
      email: 'test@example.com',
      name: 'John',
      surname: 'Doe',
      companyId: '123',
      phoneNumber: '+27 391 2012 320',
      accessLevel: 'Level_1',
      jobDescription: 'Driver',
    };

    jest.spyOn(prismaClient.user, 'create').mockResolvedValueOnce({
      ...user,
    });

    const result = await service.inviteUser(input);

    expect(cognitoService.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        email: input.email,
        groupName: CognitoGroups.USERS,
        tempPassword: expect.stringMatching(/^.{12}$/),
      })
    );
    expect(result).toEqual({successFullInvite: true});
  });
});
