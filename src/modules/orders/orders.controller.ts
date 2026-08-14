import { Controller, Get, Post, Body} from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { OrdersService } from './services/orders.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateOrderSwagger } from './swagger/order_create.swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  
  @ApiBody({type:CreateOrderSwagger})
  @Post('create')
  create(@Body() createOrderDto: CreateOrderDTO) {
    return this.ordersService.create(createOrderDto);
  }

  @Get('get_all_order')
  findAll() {
    return this.ordersService.findAll();
  }
}
