import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItem } from "src/typeorm/entities/CartItem";
import { Product } from "src/typeorm/entities/Product";
import { ShoppingCart } from "src/typeorm/entities/ShoppingCart";
import { Repository } from "typeorm";

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async createCartItem(
    cartData: Partial<CartItem>,
    user: any,
    productId: number
  ): Promise<CartItem> {
    const existingShoppingCart = await this.shoppingCartRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    let cartItem = await this.cartItemRepository.findOne({
      where: {
        shoppingCart: { id: existingShoppingCart.id },
        product: { id: productId },
      },
    });
    if (cartItem) {
      cartItem.totalQuantity = cartItem.totalQuantity + 1;
      cartItem.totalCost = cartItem.totalQuantity * product.price;
    } else {
      cartItem = new CartItem();
      cartItem.shoppingCart = existingShoppingCart;
      cartItem.product = product;
      cartItem.totalQuantity = 1;
      cartItem.totalCost = product.price;
    }
    return await this.cartItemRepository.save(cartItem);
  }

  async createCheckout(user: any, productInfo: any): Promise<CartItem> {
    const existingShoppingCart = await this.shoppingCartRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    await Promise.all(
      productInfo.map(async (prod : any) => {
        const product = await this.productRepository.findOne({
          where: { id: prod.productId },
        });

        if (!product) {
          throw new Error("Product not found");
        } else {
          let cartItem = await this.cartItemRepository.findOne({
            where: {
              shoppingCart: { id: existingShoppingCart.id },
              product: { id: prod.productId },
            },
          });
          if (cartItem) {
            cartItem.totalQuantity = prod.totalQuantity;
            cartItem.totalCost = prod.totalQuantity * product.price;
          } 
          await this.cartItemRepository.save(cartItem);
        }
      })
    );

    return;
  }
}
