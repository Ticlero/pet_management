import got from 'got';
import * as FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constant';
import { EmailVars, MailModuleOptions } from './mail.interface';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}
  private async sendEmail(
    subject: string,
    template: string,
    emailVars: EmailVars[],
    to: string,
  ) {
    console.log(subject, template, emailVars, to);
    const form = new FormData();
    form.append('from', `SH LVU PET <mailgun@${this.options.domain}>`);
    form.append('subject', subject);
    form.append('template', template);
    form.append('to', 'test-to3hu4b8f@srv1.mail-tester.com');
    emailVars.forEach((eVar) => {
      form.append(`v:${eVar.key}`, eVar.value);
    });

    try {
      const res = await got(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
      console.log(res.body);
    } catch (e) {
      console.log(e);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    console.log(email, code);
    this.sendEmail(
      `SH I LOVE PET`,
      `verify-email`,
      [
        { key: 'code', value: code },
        { key: 'username', value: email },
      ],
      email,
    );
  }
}
