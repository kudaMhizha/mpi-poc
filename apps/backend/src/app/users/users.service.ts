import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {CognitoService} from '../cognito/cognito.service';
import {GeneratePasswordService} from '../common/services/generate-password.service';

import {CognitoGroups} from '../common/types/cognito-groups.enum';
import {IniviteUserinput} from './dto/invite-user.input';

@Injectable()
export class UsersService {
  constructor(
    private readonly cognitoService: CognitoService,
    private readonly prismaService: PrismaService,
    private readonly generatePasswordService: GeneratePasswordService
  ) {}

  async inviteUser({email, name, surname, ...rest}: IniviteUserinput) {
    const tempPassword = this.generatePasswordService.generateUserPassword();
    const userId = await this.cognitoService.createUser({
      email: email,
      groupName: CognitoGroups.USERS,
      tempPassword: tempPassword.password,
    });

    this.prismaService.user.create({
      data: {
        userId: userId,
        email: email,
        name: name,
        surname: surname,
        ...rest,
        roleId: 3,
        accountStatus: 'PENDING',
        confirmed: false,
        password: tempPassword.hashPassword,
        accessLevel: 'Level_3',
      },
    });
    return {
      successFullInvite: true,
    };
  }
}
