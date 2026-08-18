import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemSwagger {
  @ApiProperty({
    example: 10,
    description: 'ID of the book being ordered',
  })
  @IsInt()
  @IsNotEmpty()
  book_id: number;

  @ApiProperty({
    example: 2,
    description: 'Quantity of the book',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class ShippingAddressDto {
  @ApiProperty({
    example: 'Muhammad Waqas',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: '123 Main Street',
  })
  @IsString()
  @IsNotEmpty()
  address_line_1: string;
}

export class CreateOrderSwagger {
  @ApiProperty({
    type: [OrderItemSwagger],
    example: [
      {
        book_id: 10,
        quantity: 2,
      },
      {
        book_id: 20,
        quantity: 1,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemSwagger)
  items: OrderItemSwagger[];

  @ApiProperty({
    type: ShippingAddressDto,
    example: {
      full_name: 'Muhammad Waqas',
      phone: '1234567890',
      address_line_1: '123 Main Street',
    },
  })
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shipping_address: ShippingAddressDto;

  @ApiProperty({
    example: 'MOCK-PAY-12345',
    description: 'Payment ID returned by the payment service',
  })
  @IsString()
  @IsNotEmpty()
  payment_id: string;
}