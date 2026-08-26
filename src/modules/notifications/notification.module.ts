import { Module } from '@nestjs/common';
import { NotificationEngineController } from './notification.controller';
import { EmailService } from './services/email.service';
import { InboxSmsService } from './services/inbox-sms.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
@Module({
  controllers: [NotificationEngineController],
  imports: [HttpModule, ConfigModule],
  providers: [EmailService, InboxSmsService],
  exports:[EmailService]
})
export class NotificationEngineModule { }
