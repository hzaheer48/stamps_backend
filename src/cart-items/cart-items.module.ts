import { Module } from "@nestjs/common";
import { CartItemsService } from "./services/cart-items/cart-items.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItem } from "src/typeorm/entities/CartItem";
import { NestjsFormDataModule } from "nestjs-form-data";
import { ShoppingCart } from "src/typeorm/entities/ShoppingCart";
import { Product } from "src/typeorm/entities/Product";
import { CartItemsController } from "./controllers/cart-items/cart-items.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem, ShoppingCart, Product]),
    NestjsFormDataModule,
  ],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
