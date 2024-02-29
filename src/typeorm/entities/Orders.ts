// Order Entity

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { User } from './User';
  import { Address } from './Address';
  
  @Entity({ name: 'orders' })
  export class Order {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @ManyToOne(() => User, user => user.orders)
    user: User;
  
    @Column()
    paymentMethod: string;
  
    @ManyToOne(() => Address, { nullable: false })
    shippingAddress: Address;
  
    @ManyToOne(() => Address, { nullable: false })
    billingAddress: Address;
  
    @Column()
    orderStatus: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;
  
    @Column()
    totalCost: number;
  }
  