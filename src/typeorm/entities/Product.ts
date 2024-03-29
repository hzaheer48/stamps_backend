// ProductCatalog Entity

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';
import { CartItem } from './CartItem';
import { OrderItem } from './OrderItem';
  
  @Entity({ name: 'products' })
  export class Product {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    description: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
  
    @Column({ default: true })
    isAvailable: boolean;

    @OneToMany(() => CartItem, cartItem => cartItem.product)
    cartItem: CartItem;

    @OneToMany(() => OrderItem, orderItem => orderItem.product)
    orderItem: OrderItem;
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

  }
  