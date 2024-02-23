// CartItems Entity

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { ShoppingCart } from './ShoppingCart';
  import { Product } from './Product';
  
  @Entity({ name: 'cart_items' })
  export class CartItem {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @ManyToOne(() => ShoppingCart, cart => cart.cartItem)
    shoppingCart: ShoppingCart;
  
    @ManyToOne(() => Product, product => product.cartItem)
    product: Product;
  
    @Column()
    totalQuantity: number;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalCost: number;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  }
  