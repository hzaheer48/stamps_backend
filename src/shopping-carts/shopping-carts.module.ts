import { Module } from "@nestjs/common";
import { ShoppingCartController } from "./constrollers/shopping-carts/shopping-carts.controller";
import { ShoppingCartService } from "./services/shopping-carts/shopping-carts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShoppingCart } from "src/typeorm/entities/ShoppingCart";
import { NestjsFormDataModule } from "nestjs-form-data";

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart]), NestjsFormDataModule],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartsModule {}
