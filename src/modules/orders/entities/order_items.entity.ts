import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('order_items')
export class OrderItemEntity {

  @PrimaryGeneratedColumn()
  order_item_id: number;

  @Column()
  order_id: number;

  @Column()
  book_id: number;

  @Column()
  book_title: string;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unit_price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;
}