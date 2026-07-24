import { Controller, Get, Post, Body, Req, HttpException, HttpStatus, InternalServerErrorException, Param, ParseIntPipe } from '@nestjs/common';
import { SendEmailDTO } from './dto/sendEmail.dto';
import { InboxSmsDTO } from './dto/inboxSms.dto';
import { EmailService } from './services/email.service';
import { InboxSmsService } from './services/inbox-sms.service';
import { emailTemplate } from './templates/email_temp';
import { smsTemplate } from './templates/sms_temp';
import type { Request } from 'express';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';

// @ApiExcludeController()
@ApiTags('notification controller APIs')
@Controller('notification')
export class NotificationEngineController {
  constructor(private readonly emailService: EmailService, private readonly InboxSms: InboxSmsService) { }

  // ================== Get Email Template Page for sending emails ==================
  @Get("mail-template")
  getEmailTemplate() {
    return emailTemplate("John Doe");
  }
  // ================== Get SMS Template Page for sending SMS ==================
  @Get("sms-template")
  getSmsTemplate() {
    return smsTemplate();
  }

  @Post("send-email")
  create(@Body() sendEmailBody: SendEmailDTO) {
    const { to, from, subject, description } = sendEmailBody;
    return this.emailService.sendEmail(to, from, subject, description);
  }

  @Post("send-sms")
  findAll(@Body() sendTextMsg: InboxSmsDTO) {
    const { to, message } = sendTextMsg;
    return this.InboxSms.sendSms(to, message);
  }


  // Create Seesion on Nest.js Server for Hundling Loggin User:
  // Create Session Endpoint
  @Get('create')
  createSession(@Req() request: any) {
    request.session.user = 'John Doe';
    request.session.sid = '1234567890';
    request.session.email = 'john.doe@example.com';
    request.session.userId = '43265';
    request.session.isLoggedIn = true;

    return {
      message: 'Session created successfully!',
      session: request.session,
    };
  }

  // Get Session Endpoint
  @Get('get')
  getSession(@Req() request: any) {
    const sessionData = request.session;
    delete sessionData.session; // Remove cookie information from the response
    return {
      sessionDt: sessionData
    };
  }

  // ================== Destroy Session Endpoint ==================
  @Get('destroy')
  destroySession(@Req() request: Request) {
    request.session.destroy((err) => {
      if (err) {
     
      }
    });
    return {
      message: 'Session destroyed successfully!',
    };
  }

  @Get('get-carts/:id')
  async getAllCarts(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.InboxSms.getData(id ? Number(id) : null);
      if (!data) {
        throw new HttpException(
          { success: false, message: 'No cart data found' },
          HttpStatus.NOT_FOUND
        );
      }
      return {
        success: true,
        message: 'Amazon cart data fetched successfully',
        data,
      };
    } catch (error) {
      // If it's already a NestJS HttpException, rethrow it
      if (error instanceof HttpException) throw error;
      // Catch network or database errors
      throw new HttpException(
        { success: false, message: 'Error during data fetch', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("MIS/waqas/197")
  data() {
    return {
      "id": 5,
      "uuid": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "user_id": 2,
      "name": "test",
      "status": "1",
      "created_at": "2026-07-07 04:46:04",
      "updated_at": "2026-07-07 04:46:04"
    }
  }

}