import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import Logger from 'bunyan';
import sendGridMail from '@sendgrid/mail';
import {config} from '@root/config';
import { BadRequestError } from '@global/helpers/error-handler';

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html:string
}

const log : Logger = config.createLogger('mailoptions');

sendGridMail.setApiKey(config.SENDGRID_API_KEY!);


class MailTransport{

  public async sendMail(reciverEmail: string, subject: string, body : string) : Promise<void>{
    if(config.NODE_ENV == 'test' || config.NODE_ENV === 'development'){
      this.developmentEmailSender(reciverEmail,subject,body);
    }
    else{
      this.productionEmailSender(reciverEmail,subject,body);
    }
  }

  private async developmentEmailSender(reciverEmail:string, subject: string, body: string): Promise<void>{
    const transporter: Mail = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: config.SENDER_EMAIL,
        pass: config.SENDER_EMAIL_PASSWORD,
      },
    });

    const mailoptions: IMailOptions = {
      from : `SocialHub <${config.SENDER_EMAIL}>`,
      to : reciverEmail,
      subject,
      html:body
    };

    try{
      await transporter.sendMail(mailoptions);
    }catch(error){
      log.error('Error sending email',error);
      throw new BadRequestError('Error sending email');
    }
  }

  private async productionEmailSender(reciverEmail:string, subject: string, body: string): Promise<void>{

    const mailoptions: IMailOptions = {
      from : `SocialHub <${config.SENDER_EMAIL}>`,
      to : reciverEmail,
      subject,
      html:body
    };

    try{
      await sendGridMail.send(mailoptions);
      log.info('Production email send successfully');
    }catch(error){
      log.error('Error sending email',error);
      throw new BadRequestError('Error sending email');
    }
  }
}

export const mailTransport: MailTransport = new MailTransport();
