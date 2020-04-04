import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { IMailData } from './interfaces/mail.interface';

@Injectable()
export class MailService {
  private trasporter: Transporter;

  constructor() {
    this.trasporter = createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async send(data: IMailData) {
    try {
      const message = await this.trasporter.sendMail(data);
      return message;
    } catch (err) {
      throw new Error(err);
    }
  }
}
