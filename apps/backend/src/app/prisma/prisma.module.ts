import {Global, Module} from '@nestjs/common';
import {PrismaService} from './prisma.service';
import {ConfigService, ConfigModule} from '@nestjs/config';
@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [PrismaService, ConfigService],
  exports: [PrismaService],
})
export class PrismaModule {}
