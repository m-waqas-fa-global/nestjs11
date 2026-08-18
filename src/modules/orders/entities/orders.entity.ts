import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('orders')
export class OrderEntity {

  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  user_id: number;

  @Column({ unique: true })
  order_number: string;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  discount_pct: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  tax_pct: number;
  
  @Column('decimal', { precision: 10, scale: 2 })
  total_amount: number;

  @Column('json')
  shipping_address: object;

  @Column({
    default: 'pending',
  })
  order_status: string;

  @Column({
    default: 'pending',
  })
  payment_status: string;

  @CreateDateColumn()
  created_at: Date;
}