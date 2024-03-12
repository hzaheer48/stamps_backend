import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "src/typeorm/entities/Address";
import { Order } from "src/typeorm/entities/Orders";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>
  ) {}

  async createOrder(orderData: any, user: any): Promise<Order> {
    if (user.role.name !== "customer") {
      throw new ForbiddenException(
        "You do not have permission to perform this action."
      );
    }
    const { paymentMethod, shippingAddressId, billingAddressId, totalCost } =
      orderData;
    const shippingAddress = await this.addressRepository.findOne(
      {where : {id : shippingAddressId}}
    );
    const billingAddress = await this.addressRepository.findOne(
        {where : {id : billingAddressId}}
    );
    if (!shippingAddress || !billingAddress) {
      throw new Error("Shipping or billing address not found");
    }
    const newOrder = this.orderRepository.create({
      user,
      paymentMethod,
      shippingAddress,
      billingAddress,
      orderStatus: "Pending",
      totalCost,
    });
    
    await this.orderRepository.save(newOrder);

    const currentDate = new Date();
    const timestamp = currentDate.toISOString().replace(/[-:]/g, '').slice(0, -5); 
    const orderNumber = `${timestamp}T${newOrder.id}`;

    newOrder.orderNumber = orderNumber;

    return await this.orderRepository.save(newOrder);;

  }
}
