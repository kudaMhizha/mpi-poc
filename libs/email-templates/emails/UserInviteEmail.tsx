import React from 'react';
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

type InviteEmailProps = {
  code?: string;
  title?: string;
  message?: string;
  helperText?: string;
  appLink?: string;
};

export function UserInviteEmail({
  code = 'A77IiY1c!k!c',
  title = 'Join Company Name',
  message = `Your email address (email@email) and your temporary code is below - enter it and sign in.`,
  helperText = '',
  appLink,
}: Readonly<InviteEmailProps>): JSX.Element {
  return (
    <Html>
      <Head />
      <Preview>Confirm your email address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{title}</Heading>
          <Text style={heroText}>{message}</Text>
          <Section style={codeBox}>
            <Text style={confirmationCodeText}>{code}</Text>
          </Section>
          <Text style={text}>{helperText}</Text>
          <Section
            style={{
              marginTop: '20px',
              marginBottom: '65px',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <Row>
              <Column>
                <Link
                  style={button}
                  href={`https://${appLink}`}
                  target="_blank"
                >
                  Sign Up
                </Link>
              </Column>
            </Row>
          </Section>
          <Text style={text}>
            If you didn't request this email, there's nothing to worry about -
            you can safely ignore it.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default UserInviteEmail;

const button = {
  backgroundColor: '#f3f3f5',
  fontSize: '17px',
  lineHeight: '17px',
  padding: '13px 17px',
  borderRadius: '24px',
  maxWidth: '120px',
  color: '#2E4A49',
};

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  maxWidth: '600px',
  margin: '0 auto',
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: 700,
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px',
};

const heroText = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px',
};

const codeBox = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '4px',
  marginRight: '50px',
  marginBottom: '30px',
  padding: '43px 23px',
};

const confirmationCodeText = {
  fontSize: '30px',
  textAlign: 'center' as const,
  verticalAlign: 'middle',
};

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px',
};
