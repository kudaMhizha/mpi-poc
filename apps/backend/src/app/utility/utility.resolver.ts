import {UploadedFile, UseInterceptors, Request} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {Mutation, Resolver} from '@nestjs/graphql';
import {UtilityService} from './utility.service';

@Resolver()
export class UtilityResolver {
  constructor(private utilityService: UtilityService) {}

  @Mutation(() => String)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Request() req) {
    return await this.utilityService.uploadFile(file, req.body);
  }
}
