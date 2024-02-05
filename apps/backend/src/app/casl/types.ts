import {SetMetadata} from '@nestjs/common';
// import {RbacAbility} from '@mpi-app/casl';

interface IPolicyHandler {
  handle(ability: unknown, args: Record<string, unknown>): boolean;
}

type PolicyHandlerCallback = (
  ability: unknown,
  args: Record<string, unknown>
) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
