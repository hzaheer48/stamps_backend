// OrderItems Entity

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { Product } from './Product';
import { Order } from './Orders';
  
  @Entity({ name: 'order_items' })
  export class OrderItem {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @ManyToOne(() => Order, order => order.orderItem)
    order: Order;
  
    @ManyToOne(() => Product, product => product.orderItem)
    product: Product;
  
    @Column()
    totalQuantity: number;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    priceAtPurchase: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

  }
  