import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderInterface } from '../interfaces/create_order.interface';
import { ApiResponse } from '../../../common/helpers/api-response.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksEntity } from '../../../books/entities/books.entity';
import { In, Repository } from 'typeorm';


@Injectable()
export class OrdersService {

  private readonly texPercentage: number = 2;
  private readonly discPercentage: number = 5;

  constructor(
    @InjectRepository(BooksEntity)
    private readonly booksTableRepo: Repository<BooksEntity>
  ) { }

  async create(createOrder: CreateOrderInterface) {
    // ============================================
    // Step 1: Validate Book IDs
    // ============================================
    const bookIds = createOrder.items.map(item => item.book_id);
    const books = await this.booksTableRepo.find({
      where: {
        bk_id: In(bookIds)
      }
    })

    if (bookIds.length !== books?.length) {
      throw new BadRequestException("Some book id's do not exist")
    }

    // ============================================
    // Step 2: Check Availability
    // ============================================

    for (const item of createOrder.items) {
      const bk = books.find(book => book.bk_id === item.book_id);
      if (!bk?.is_available) {
        throw new BadRequestException(
          `Book "${bk?.title}" is currently unavaliable`
        )
      }
    }

    // ============================================
    // Step 3: Get DB Prices
    // ============================================

    // IMPORTANT:
    // Don't use price sent from Angular.
    // Always use the price from database.

    const orderItems = createOrder.items.map((item) => {
      const book = books.find(res => res.bk_id === item.book_id);
      const unitPrice = Number(book?.price);

      return {
        book_id: book!.bk_id,
        title: book!.title,
        qty: item.quantity,
        price: unitPrice,
        total_price: unitPrice * item.quantity,
      }
    });

    const subTotal = orderItems.reduce((total, item) => total + item.total_price, 0);

    const totalAmount = (subTotal + this.texPercentage) - this.discPercentage;
    // ============================================
    // Order Response
    // ============================================
    const response = {
      items: orderItems,
      subTotal,
      discount: this.discPercentage,
      tax: this.texPercentage,
      total_amount: totalAmount,
      order_status: 'pending',
      payment_status: 'pending',
    }

    // Saved this Order Creation in DB and then proceed to the Payment API Service:
    return ApiResponse.success("Order Placed SuccessFully", response)
  }

  findAll() {
    return `This action returns all orders`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
