import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDTO {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  book_id: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}

export class ShippingAddressDTO {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address_line_1: string;
}

export class CreateOrderDTO {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShippingAddressDTO)
  shipping_address: ShippingAddressDTO;

  @IsString()
  @IsNotEmpty()
  payment_id: string;

}