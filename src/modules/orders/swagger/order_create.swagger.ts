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

  @ApiProperty({
    example: 'Dallas',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'Texas',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    example: '75001',
  })
  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @ApiProperty({
    example: 'USA',
  })
  @IsString()
  @IsNotEmpty()
  country: string;
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
      city: 'Dallas',
      state: 'Texas',
      postal_code: '75001',
      country: 'USA',
    },
  })
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shipping_address: ShippingAddressDto;
}