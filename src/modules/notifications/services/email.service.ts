import {
  BadGatewayException,
  Injectable,
  Logger,
} from '@nestjs/common';
import nodemailer from 'nodemailer';
import { validateEmail } from '../utils/validate-email';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly htmlContent: string = `
  <html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome Email</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" 
          style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td align="center" 
              style="background: #3d3336; padding: 14px 8px;">       
              <!-- NestJS Logo -->
              <img 
                src="https://nestjs.com/img/logo-small.svg" 
                alt="NestJS Logo" 
                width="80"
                style="display:block; margin-bottom:15px;"
              />
              <h1 style="color:#ffffff; margin:0; font-size:28px;">
                Welcome to Our Platform Nest.js
              </h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:40px 30px; color:#333333;">

              <h2 style="margin-top:0; color:#222222;">
                Hello Adnan Ali,
              </h2>
              <p style="font-size:16px; line-height:1.7;">
                Thank you for subscribing to our platform 🎉
              </p>
              <p style="font-size:16px; line-height:1.7;">
                We’re excited to have you onboard. Our NestJS-powered platform is ready to help you build, scale, and manage your experience efficiently.
              </p>
              <p style="font-size:16px; line-height:1.7;">
                Stay tuned for updates, new features, and helpful resources.
              </p>
              <!-- Button -->
              <table cellpadding="0" cellspacing="0" style="margin-top:30px;">
                <tr>
                  <td align="center" bgcolor="#ea2845" style="border-radius:6px;">
                    <a href="https://nestjs.com" 
                      target="_blank"
                      style="display:inline-block; padding:14px 28px; color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold;">
                      Get Started
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" 
              style="background:#f8f8f8; padding:20px; font-size:13px; color:#777777;">
             All rights reserved.
              <br /><br />
              Built with ❤️ using NestJS
              <p>Muhammad Waqas Riaz - Software Engineer</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  transporter!: nodemailer.Transporter<nodemailer.SentMessageInfo>;

  constructor() {
    const port = Number(process.env.SMTP_PORT) || 587;
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  /**
   * @param to recipient address
   * @param from sender address (should match or be allowed for SMTP_USER)
   * @param subject email subject
   * @param description plain-text body
   */
  async sendEmail(
    to: string,
    from: string,
    subject: string,
    description: string,
  ) {
    try {
      const info = await this.transporter.sendMail({
        from,
        to,
        subject,
        // text: description,
        html: this.htmlContent     // sending html content 
      });

      return {
        success: true,
        message: 'Email sent successfully',
        messageId: info.messageId,
      };
    } catch (err) {
      this.logger.error(
        'Failed to send email',
        err instanceof Error ? err.stack : err,
      );
      throw new BadGatewayException(
        err instanceof Error ? err.message : 'Failed to send email',
      );
    }
  }


  send(){
    return {
      msg:"send email for OPT"
    }
  }
}