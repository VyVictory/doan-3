import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class SmsService {
  private client: Twilio.Twilio;

  constructor() {
    this.client = Twilio(
      process.env.ACCOUTSID,
      process.env.AUTHTOKEN,
    );
  }

  async sendSms(to: string, message: string): Promise<void> {
    try {
      const result = await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_NUMBER_PHONE,
        to,
      });
      console.log('SMS sent successfully:', result.sid);
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new HttpException(
        'Failed to send SMS',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
