import {
  Args,
  InputType,
  Field,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import {UtilityService} from './utility.service';

@ObjectType()
export class UploadFileResponse {
  @Field(() => String)
  url: string;

  @Field(() => String)
  key: string;
}

@InputType()
class UserInput {
  @Field(() => String)
  fileName: string;

  @Field(() => String)
  fileType: string;

  @Field(() => String)
  buffer: string;
}

@Resolver(UploadFileResponse)
export class UtilityResolver {
  constructor(private utilityService: UtilityService) {}

  @Mutation(() => UploadFileResponse)
  async uploadFile(
    @Args('userInput') userInput: UserInput
  ): Promise<UploadFileResponse> {
    const tt = await this.utilityService.uploadFile(userInput);
    return tt;
  }
}
