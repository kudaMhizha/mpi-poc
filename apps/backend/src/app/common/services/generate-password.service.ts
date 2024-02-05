import * as bcrypt from 'bcryptjs';
import {Injectable} from '@nestjs/common';
import generator from 'generate-password';

@Injectable()
export class GeneratePasswordService {
  private generateUserHash(value: string): string {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(value, salt);
  }

  generateUserPassword(): {password: string; hashPassword: string} {
    const password = generator.generate({
      length: 12,
      uppercase: true,
      numbers: true,
      symbols: true,
      strict: true,
    });

    const hashPassword = this.generateUserHash(password);

    return {password, hashPassword};
  }
}
