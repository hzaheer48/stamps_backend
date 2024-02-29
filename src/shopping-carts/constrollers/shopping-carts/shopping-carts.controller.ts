// shopping-cart.controller.ts

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FormDataRequest } from "nestjs-form-data";
import { ShoppingCartService } from "src/shopping-carts/services/shopping-carts/shopping-carts.service";
import { ShoppingCart } from "src/typeorm/entities/ShoppingCart";

@Controller("shopping-cart")
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Get()
  async getAllShoppingCarts(): Promise<ShoppingCart[]> {
    return this.shoppingCartService.getAllShoppingCarts();
  }

  @Get(":id")
  async getShoppingCartById(@Param("id") id: number): Promise<ShoppingCart> {
    return this.shoppingCartService.getShoppingCartById(id);
  }

  @Post()
  @FormDataRequest()
  @UseGuards(AuthGuard("jwt"))
  async createShoppingCart(
    @Req() req,
    @Body() shoppingCart: ShoppingCart
  ): Promise<ShoppingCart> {
    return this.shoppingCartService.createShoppingCart(shoppingCart, req.user);
  }

  @Put(":id")
  async updateShoppingCart(
    @Param("id") id: number,
    @Body() updatedData: Partial<ShoppingCart>
  ): Promise<ShoppingCart> {
    return this.shoppingCartService.updateShoppingCart(id, updatedData);
  }

  @Delete(":id")
  async deleteShoppingCart(@Param("id") id: number): Promise<void> {
    return this.shoppingCartService.deleteShoppingCart(id);
  }
}
