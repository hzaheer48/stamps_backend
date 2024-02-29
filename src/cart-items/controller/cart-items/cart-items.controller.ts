import { Body, Controller, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FormDataRequest } from "nestjs-form-data";
import { CartItemsService } from "src/cart-items/services/cart-items/cart-items.service";
import { CartItem } from "src/typeorm/entities/CartItem";

@Controller("cart-items")
export class CartItemsController {
  constructor(private readonly cartItemService: CartItemsService) {}

  @Post()
  @FormDataRequest()
  @UseGuards(AuthGuard("jwt"))
  async createCartItem(
    @Req() req,
    @Body() cartItemData: Partial<CartItem>,
    @Query("productId") productId: number
  ): Promise<CartItem> {
    return this.cartItemService.createCartItem(
      cartItemData,
      req.user,
      productId
    );
  }

  @Post('checkout')
  @FormDataRequest()
  @UseGuards(AuthGuard("jwt"))
  async createCheckout(
    @Req() req,
    @Body() productsInfoData: any
  ): Promise<CartItem> {
    // Parse the stringified JSON into a JavaScript object
    const productsInfo = JSON.parse(productsInfoData.cartItemDataStringified);
    return this.cartItemService.createCheckout(
      req.user,
      productsInfo
    )
  }
}
