// ShoppingCart Entity

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { CartItem } from "./CartItem";

@Entity({ name: "shopping_cart" })
export class ShoppingCart {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @ManyToOne(() => User, (user) => user.shoppingCart)
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.shoppingCart)
  cartItem: CartItem;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
