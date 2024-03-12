import { Body, Controller, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FormDataRequest } from "nestjs-form-data";
import { OrderItemsService } from "src/order-items/services/order-items/order-items.service";
import { OrderItem } from "src/typeorm/entities/OrderItem";

@Controller("order-items")
export class OrderItemsController {
  constructor(private readonly orderItemService: OrderItemsService) {}

  @Post()
  @FormDataRequest()
  @UseGuards(AuthGuard("jwt"))
  async createOrderItem(
    @Req() req,
    @Query("orderId") orderId: number
  ): Promise<OrderItem> {
    this.orderItemService.createOrderItem(req.user, orderId);
    return;
  }
}
