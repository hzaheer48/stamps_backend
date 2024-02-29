// User Entity

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ShoppingCart } from './ShoppingCart';
import { UserRole } from './UserRole';
import { Address } from './Address';
import { Order } from './Orders';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => ShoppingCart, shoppingCart => shoppingCart.user)
  shoppingCart: ShoppingCart;

  @OneToMany(() => Address, address => address.user)
  addresses: Address[]; 

  @ManyToOne(() => UserRole, { eager: true, cascade: true })
  role: UserRole;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @Column({ nullable: true })
  lastLogin: Date;
}
