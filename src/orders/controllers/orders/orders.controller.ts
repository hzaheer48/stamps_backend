import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FormDataRequest } from 'nestjs-form-data';
import { OrderService } from 'src/orders/services/orders/orders.service';
import { Order } from 'src/typeorm/entities/Orders';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @FormDataRequest()
  @UseGuards(AuthGuard("jwt"))
  async createOrder(
    @Req() req : any,
    @Body() orderData: any
  ) : Promise<Order> {
    return this.orderService.createOrder(orderData,req.user)
  }
}
