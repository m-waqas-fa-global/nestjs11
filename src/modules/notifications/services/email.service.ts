import {
  BadGatewayException,
  Injectable,
  Logger,
} from '@nestjs/common';
import nodemailer from 'nodemailer';
import { validateEmail } from '../utils/validate-email';
import { OTPEmailTemplate } from '../templates/otp-email.temp';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly welcomeEmailContent: string = `
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
        html: this.welcomeEmailContent     // sending html content 
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

  async sendOTPEmail(to_email:string,otp:string){
    const validate = 3;
    const otpVerifyTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>Reset Password - ChapterOne</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f6f9; padding: 40px 0;">
              <tr>
                  <td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); overflow: hidden; max-width: 600px; width: 100%;">
                          <tr>
                              <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); padding: 18px 26px 18px; text-align: center;">
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                          <td align="center">
                                              <div style="display: inline-block; background: rgba(255, 255, 255, 0.1); padding: 12px 24px; border-radius: 12px; margin-bottom: 12px;">
                                                  <span style="font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: 1px;">📖 ChapterOne</span>
                                              </div>
                                              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 20px 0 0; letter-spacing: -0.5px; line-height: 1.2;">
                                                  Reset Password Request
                                              </h1>
                                              <div style="width: 60px; height: 4px; background: linear-gradient(to right, #e94560, #c23152); margin: 12px auto 0; border-radius: 2px;"></div>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 15px 30px 22px;">
                          
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                          <td>
                                              <p style="font-size: 16px; color: #1a1a2e; line-height: 1.6; margin: 0 0 8px; font-weight: 500;">
                                                  Hello,
                                              </p>
                                              <p style="font-size: 18px; color: #1a1a2e; line-height: 1.6; margin: 0 0 24px; font-weight: 600; background: #f8f9fa; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #e94560;">
                                                  ${to_email || 'user name'}
                                              </p>
                                          </td>
                                      </tr>
                                  </table>
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                          <td>
                                              <p style="font-size: 16px; color: #2d3748; line-height: 1.8; margin: 0 0 16px;">
                                                  We received a request to reset the password for your <strong>ChapterOne</strong> account. Use the verification code below to complete the password reset process.
                                              </p>
                                              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f8f9fa; border-radius: 12px; border: 2px dashed #e2e8f0; margin: 24px 0;">
                                                  <tr>
                                                      <td align="center" style="padding: 28px 20px;">
                                                          <p style="font-size: 14px; color: #718096; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                                                              Your Verification Code
                                                          </p>
                                                          <div style="font-size: 42px; font-weight: 700; color: #1a1a2e; letter-spacing: 8px; background: #ffffff; padding: 16px 32px; border-radius: 8px; display: inline-block; font-family: 'Courier New', monospace; border: 2px solid #e2e8f0;">
                                                              ${otp || 123456}
                                                          </div>
                                                          <p style="font-size: 13px; color: #718096; margin: 12px 0 0;">
                                                              Valid for ${validate} days
                                                          </p>
                                                      </td>
                                                  </tr>
                                              </table>
                                              <div style="background: #fff5f5; border-radius: 10px; padding: 16px 20px; border-left: 4px solid #e94560;">
                                                  <p style="font-size: 14px; color: #c53030; line-height: 1.6; margin: 0;">
                                                      <strong>⚠️ Please do not disclose this code to others.</strong> 
                                                  </p>
                                              </div>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 0 40px;">
                                  <hr style="border: none; border-top: 2px solid #e2e8f0; margin: 0;">
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 10px 20px 12px; background: #f8f9fa;">
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <!-- Social Icons -->
                                      <tr>
                                          <td align="center" style="padding-bottom: 16px;">
                                              <table cellpadding="0" cellspacing="0" border="0">
                                                  <tr>
                                                      <td style="padding: 0 6px;">
                                                          <a href="#" style="display: inline-block; width: 36px; height: 36px; background: #e2e8f0; border-radius: 50%; text-align: center; line-height: 36px; color: #1a1a2e; text-decoration: none; font-size: 16px; transition: all 0.3s ease;">
                                                              📱
                                                          </a>
                                                      </td>
                                                      
                                                      <td style="padding: 0 6px;">
                                                          <a href="#" style="display: inline-block; width: 36px; height: 36px; background: #e2e8f0; border-radius: 50%; text-align: center; line-height: 36px; color: #1a1a2e; text-decoration: none; font-size: 16px; transition: all 0.3s ease;">
                                                              💼
                                                          </a>
                                                      </td>
                                                    
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td align="center">
                                              <p style="font-size: 13px; color: #4a5568; margin: 0 0 8px; font-weight: 500; line-height: 1.6;">
                                                  © 2026 <span style="color: #1a1a2e; font-weight: 600;">ChapterOne</span>. All Rights Reserved.
                                              </p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 20px;">
                          <tr>
                              <td align="center">
                                  <p style="font-size: 12px; color: #a0aec0; margin: 0; line-height: 1.6;">
                                      This is an automated message from ChapterOne. Please do not reply to this email.
                                  </p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `;

    try {
      const info = await this.transporter.sendMail({
        from : 'm.waqas.fam.mis@gmail.com',
        to: to_email,
        subject : 'Reset Password Request - ChapterOne',
        // text: description,
        html: otpVerifyTemplate     // sending html content 
      });

      return {
        success: true,
        message: 'OTP verification email sent successfully',
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
}