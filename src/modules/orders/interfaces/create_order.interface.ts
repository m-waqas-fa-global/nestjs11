export interface IOrderItem {
  book_id: number;
  quantity: number;
}

export interface IShippingAddress {
  full_name: string;
  phone: string;
  address_line_1: string;
}

export interface CreateOrderInterface {
  items: IOrderItem[];
  shipping_address: IShippingAddress;
  payment_id:string;
}