import { BadGatewayException, Injectable } from '@nestjs/common';
import { InboxMsg } from '../interfaces/SendEmail.interface';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { firstValueFrom, map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class InboxSmsService {
  resp!: InboxMsg;
  private readonly client: Twilio;
  private readonly apiUrl = "https://dummyjson.com/carts"

  // Initialize Twilio client with credentials from environment variables using ConfigService
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {
    this.client = new Twilio(
      this.configService.get<string>('TWILIO_ACCOUNT_SID'),
      this.configService.get<string>('TWILIO_AUTH_TOKEN'),
    );
  }

  // By Giving those parameters to this function, we can send SMS to the specific they registered on Twilio server and giving message body
  /**
   * @param to 
   * @param message3
   * @returns 
   * 
   */
  async sendSms(to: string, message: string) {
    try {
      const sms = await this.client.messages.create({
        body: message,
        from: this.configService.get<string>('TWILIO_PHONE_NUMBER'),
        to: `${to}`,
      });
      return {
        success: true,
        message: 'SMS sent successfully',
        messageId: sms.sid,
        status: 200,
      };
    } catch (error) {
      throw new BadGatewayException(error instanceof Error ? error.message : 'Failed to send SMS');
    }
  }

  // Fetch Data From Dummy JSON placeholder:
  async getData(id?: number | null) {
    // firstValueFrom converts the RxJS Observable into a standard Promise
    const url = id ? `${this.apiUrl}/${id}` : this.apiUrl
    const response$ = this.httpService.get(url).pipe(
      map(res => res.data)
    );

    return await firstValueFrom(response$);
  }
}