import {Resolver, Mutation, Args, Query} from '@nestjs/graphql';
import {UsersService} from './users.service';
import {IniviteUserinput} from './dto/invite-user.input';
import {invitedUser} from './models/invited-user.model';

@Resolver(invitedUser)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(invitedUser)
  inviteUser(@Args('inviteUser') inviteUserInput: IniviteUserinput) {
    return this.usersService.inviteUser(inviteUserInput);
  }
}
