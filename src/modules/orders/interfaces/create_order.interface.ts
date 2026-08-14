export interface IOrderItem {
  book_id: number;
  quantity: number;
}

export interface IShippingAddress {
  full_name: string;
  phone: string;
  address_line_1: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface ICreateOrder {
  items: IOrderItem[];
  shipping_address: IShippingAddress;
}