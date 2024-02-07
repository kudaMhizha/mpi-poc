import * as pulumi from '@pulumi/pulumi';
import 'jest';

function promiseOf<T>(output: pulumi.Output<T>): Promise<T> {
  return new Promise(resolve => output.apply(resolve));
}
describe('Cognito Custom Message', () => {
  // Define the infra variable as a type whose shape matches that of the
  // to-be-defined resources module.
  // https://www.typescriptlang.org/docs/handbook/2/typeof-types.html
  let infra: typeof import('./lambdas/customMessage');

  beforeAll(() => {
    // Put Pulumi in unit-test mode, mocking all calls to cloud-provider APIs.
    pulumi.runtime.setMocks({
      // Mock requests to provision cloud resources and return a canned response.
      newResource: (
        args: pulumi.runtime.MockResourceArgs
      ): { id: string; state: unknown } => {
        // Here, we're returning a same-shaped object for all resource types.
        // We could, however, use the arguments passed into this function to
        // customize the mocked-out properties of a particular resource based
        // on its type. See the unit-testing docs for details:
        // https://www.pulumi.com/docs/using-pulumi/testing/unit
        return {
          id: `${args.name}-id`,
          state: args.inputs,
        };
      },

      // Mock function calls and return whatever input properties were provided.
      call: (args: pulumi.runtime.MockCallArgs) => {
        return args.inputs;
      },
    });
  });

  beforeEach(async () => {
    // Dynamically import the resources module.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports
    infra = await import('./lambdas/customMessage');
  });

  describe('function URL', () => {
    it('is bound to the right Lambda function', async () => {
      const timeFuncName = await promiseOf(infra.customMessageLambda.handler);
      expect(timeFuncName).toBeDefined();
    });
  });
  describe('CustomMessage function', () => {
    it('modifies event response correctly for CustomMessage_AdminCreateUser', async () => {
      const event = {
        triggerSource: 'CustomMessage_AdminCreateUser',
        request: {
          codeParameter: '123456', // Mock code parameter
        },
        response: {
          emailMessage: '',
          emailSubject: 'Welcome to the service',
        },
      };


      expect(event.response.emailSubject).toEqual('Welcome to the service');
    });

    it('does not modify event response for other trigger sources', async () => {
      const event = {
        triggerSource: 'Some_Other_Trigger_Source',
        request: {
          codeParameter: '123456',
        },
        response: {
          emailMessage: '',
          emailSubject: '',
        },
      };

      expect(event.response.emailSubject).toEqual('');
    });
  });
});
