import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksEntity } from '../books/entities/books.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BooksEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
