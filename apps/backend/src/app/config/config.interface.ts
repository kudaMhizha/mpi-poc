export interface Config {
  awsConfig: {
    region: string;
    cognito_userPoolId: string;
    cognito_clientId: string;
    cognito_issuer: string;
  };
}
