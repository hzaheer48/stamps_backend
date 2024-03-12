import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItem } from "src/typeorm/entities/CartItem";
import { OrderItem } from "src/typeorm/entities/OrderItem";
import { Order } from "src/typeorm/entities/Orders";
import { ShoppingCart } from "src/typeorm/entities/ShoppingCart";
import { Repository } from "typeorm";

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>
  ) {}

  async createOrderItem(user: any, orderId: number) {
    const existingShoppingCart = await this.shoppingCartRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    const existingOrder = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });

    const existingCartItems = await this.cartItemRepository.find({
      where: {
        shoppingCart: {
          id: existingShoppingCart.id,
        },
      },
      relations: ["product"],
    });
    const orderItemPromises = existingCartItems.map(async (cartItem) => {
      const orderItem = new OrderItem();
      orderItem.order = existingOrder;
      orderItem.product = cartItem.product;
      orderItem.totalQuantity = cartItem.totalQuantity;
      orderItem.priceAtPurchase = cartItem.product.price;

      return this.orderItemRepository.save(orderItem);
    });

    await Promise.all(orderItemPromises);
  }
}
