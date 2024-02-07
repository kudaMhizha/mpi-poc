import { render } from '@react-email/render';
import {handler} from './handler'

jest.mock('@react-email/render', () => ({
    render: jest.fn(),
}));

describe('Cognito Custom Message Handler', () => {
    it('should handle CustomMessage_AdminCreateUser trigger', async () => {
        const event = {
            triggerSource: 'CustomMessage_AdminCreateUser',
            request: {
                usernameParameter: 'test@example.com',
                codeParameter: '123456',
            },
        };

        const result = await handler(event);

        expect(render).toBeDefined()
        expect(result).toBeDefined();
    });
});
