import { Injectable } from '@nestjs/common';
import { ICreateOrder } from '../interfaces/create_order.interface';


@Injectable()
export class OrdersService {
  create(createOrderDto:any) {
    return {
      msg: 'Order Placed SuccessFully',
      data:createOrderDto
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
