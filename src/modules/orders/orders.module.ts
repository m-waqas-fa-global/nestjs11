import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksEntity } from '../books/entities/books.entity';
import { PaymentService } from '../payment/services/payment.service';
import { OrderItemEntity } from './entities/order_items.entity';
import { OrderEntity } from './entities/orders.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([BooksEntity,OrderEntity,OrderItemEntity])
  ],
  controllers: [OrdersController],
  providers: [OrdersService,PaymentService],
  exports: [
    OrdersService
  ]
})
export class OrdersModule {}
