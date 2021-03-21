export interface MailModuleOptions {
  apiKey: string;
  domain: string;
  fromEmail: string;
  global: boolean;
}

export interface EmailVars {
  key: string;
  value: string;
}
