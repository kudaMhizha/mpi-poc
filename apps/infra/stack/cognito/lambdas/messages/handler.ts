import { render } from '@react-email/render'
import { UserInviteEmail } from '../../../../../../libs/email-templates/emails/UserInviteEmail'

/**
/**
 * This handler handles all cognito custom message events.
 * 
 */
export const handler = async event => {
    let email = event.request.usernameParameter;
    let code = event.request.codeParameter;
    if (event.triggerSource === 'CustomMessage_AdminCreateUser') {
        const html = render(
            UserInviteEmail({
                code: code,
                title: ' Confirm Your Email Addresss.',
                message: `Your email address (${email}) and your temporary code is below - enter it and sign in.`,
                appLink: 'https://d16lfhcygo2fb8.cloudfront.net/',
                helperText: 'Please be informed that the temporary code provided is only valid for 7 days. Use it before expiration.'
            })
        )
        event.response = {
            emailSubject: 'Welcome to MPI',
            emailMessage: html,
            smsMessage: null
        }
        return event;
    }
};
