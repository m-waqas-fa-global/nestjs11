import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderInterface } from '../interfaces/create_order.interface';
import { ApiResponse } from '../../../common/helpers/api-response.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BooksEntity } from '../../books/entities/books.entity';
import { GeneratorHelper } from '../../../common/helpers/generator.helper';
import { PaymentService } from '../../payment/services/payment.service';
import { OrderEntity } from '../entities/orders.entity';
import { OrderItemEntity } from '../entities/order_items.entity';
import { PaymentStatusEnum } from '../../payment/enums/enum';
import { OrderStatusEnum } from '../enums/enums';
import { AwsInstance } from 'twilio/lib/rest/accounts/v1/credential/aws';


@Injectable()
export class OrdersService {

  private readonly texPercentage: number = 2;
  private readonly discPercentage: number = 5;

  constructor(
    @InjectRepository(BooksEntity)
    private readonly booksTableRepo: Repository<BooksEntity>,
    // Order Entity
    @InjectRepository(OrderEntity)
    private readonly orderTableRepo: Repository<OrderEntity>,
    // Order Entity
    @InjectRepository(OrderItemEntity)
    private readonly orderItemsTableRepo: Repository<OrderItemEntity>,

    private readonly paymentService: PaymentService
  ) { }

  async create(createOrder: CreateOrderInterface, userId: number) {
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
    // Step 2: Check Availability   (Inventry Module Operation For Hundling Stocks Related Task)
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

    // Check Payment Methods Validation
    if (createOrder.payment_id !== "MOCK-PAY-12345") {
      throw new BadRequestException("Bad Request: Payment ID Invalid")
    }
    const saveOrder = this.orderTableRepo.create({
      user_id: userId,
      order_number: GeneratorHelper.generateOrderNumber(),
      subtotal: subTotal,
      discount_pct: this.discPercentage,
      tax_pct: this.texPercentage,
      total_amount: totalAmount,
      shipping_address: createOrder.shipping_address
    })

    console.log("Before creating into DB:", saveOrder)

    try {
      // Save Orders and Order Item Entity
      const isOrderSaved = await this.orderTableRepo.save(saveOrder);

      const saveOrderItems = this.orderItemsTableRepo.create(
        orderItems.map((item) => ({
          order_id: isOrderSaved.order_id,
          book_id: item.book_id,
          book_title: item.title,
          quantity: item.qty,
          unit_price: item.price,
          total_price: item.total_price,
        })),
      );
      await this.orderItemsTableRepo.save(saveOrderItems);

      if (this.paymentService.createPayment().status) {
        await this.markPaymentSuccessfull(isOrderSaved.order_id);
      }

    } catch (error) {
      // Hundle Their Exceptions
      throw new BadRequestException(
        "Server Error: Unable to place order"
      )
    }

    // Saved this Order Creation in DB and then proceed to the Payment API Service:
    return ApiResponse.success("Order Placed SuccessFully", saveOrder)
  }

  async findAll() {
    return {
      orders: await this.orderTableRepo.find(),
      orderItems: await this.orderItemsTableRepo.find(),
      msg:"List of order placed by single user"
    };
  }

  async markPaymentSuccessfull(orderId: number) {
    await this.orderTableRepo.update(
      { order_id: orderId },
      {
        payment_status: PaymentStatusEnum.PAID,
        order_status: OrderStatusEnum.CONFIRMED
      }
    )
  }
}
