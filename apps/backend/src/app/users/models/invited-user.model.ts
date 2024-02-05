import {ObjectType, Field} from '@nestjs/graphql';

@ObjectType()
export class InvitedUser {
  @Field({
    description: 'Flag to determine if invite was successful or not',
  })
  successFullInvite: boolean;
}

export const invitedUser = () => InvitedUser;
