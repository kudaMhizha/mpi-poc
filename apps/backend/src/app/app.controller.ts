// import {subject} from '@casl/ability';
// import {DatabaseAction, RbacAbility} from '@mpi-app/casl';
import {Controller, Get} from '@nestjs/common';

import {AppService} from './app.service';
// import {CheckPolicies} from './casl/types';
// import {PoliciesGuard} from './common/guards/policy-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // TODO: Add Auth guard => @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability: RbacAbility, args: Record<string, unknown>) =>
  //   ability.can(DatabaseAction.Manage, subject('User', {id: args.id}))
  // )
  getData() {
    return this.appService?.getData();
  }
}
