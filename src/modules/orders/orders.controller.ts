import { Controller, Get, Post, Body, Req, UseGuards} from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { OrdersService } from './services/orders.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateOrderSwagger } from './swagger/order_create.swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  

  @UseGuards(JwtAuthGuard)    // this is protected API End Point
  @ApiBearerAuth()
  @ApiBody({type:CreateOrderSwagger})
  @Post('place_order')
  create(@Body() createOrderDto: CreateOrderDTO,@Req() req:any) {
    return this.ordersService.create(createOrderDto,req.user.user_id);
  }

  @Get('get_order_history')
  findAll() {
    return this.ordersService.findAll();
  }
}
