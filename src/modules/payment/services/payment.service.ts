import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {

     createPayment() {
         // Simulate payment gateway processing
        new Promise(resolve => setTimeout(resolve, 2000));
        return {
            status: true,
        }
    }
}
