// shopping-cart.service.ts

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ShoppingCart } from "src/typeorm/entities/ShoppingCart";
import { Repository } from "typeorm";

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>
  ) {}

  async getAllShoppingCarts(): Promise<ShoppingCart[]> {
    return this.shoppingCartRepository.find();
  }

  async getShoppingCartById(id: number): Promise<ShoppingCart> {
    const shoppingCart = await this.shoppingCartRepository.findOne({
      where: { id },
    });

    if (!shoppingCart) {
      throw new NotFoundException("ShoppingCart not found");
    }

    return shoppingCart;
  }

  async createShoppingCart(
    shoppingCart: ShoppingCart,
    user: any
  ): Promise<ShoppingCart> {
    if (user.role.name !== "customer") {
      throw new ForbiddenException(
        "You do not have permission to perform this action."
      );
    }
    const existingCart = await this.shoppingCartRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (existingCart) {
      return existingCart;
    } else {
      const newCart = this.shoppingCartRepository.create({ user });
      await this.shoppingCartRepository.save(newCart);
      const recentlyAddedShoppingCart =
        await this.shoppingCartRepository.findOne({
          where: { id: newCart.id },
        });
      return recentlyAddedShoppingCart;
    }
  }
  async updateShoppingCart(
    id: number,
    updatedData: Partial<ShoppingCart>
  ): Promise<ShoppingCart> {
    await this.getShoppingCartById(id);

    await this.shoppingCartRepository.update(id, updatedData);

    return this.getShoppingCartById(id);
  }

  async deleteShoppingCart(id: number): Promise<void> {
    const result = await this.shoppingCartRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException("ShoppingCart not found");
    }
  }
}
