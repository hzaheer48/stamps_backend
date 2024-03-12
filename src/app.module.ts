import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./typeorm/entities/User";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { Product } from "./typeorm/entities/Product";
import { ShoppingCart } from "./typeorm/entities/ShoppingCart";
import { CartItem } from "./typeorm/entities/CartItem";
import { ProductsModule } from "./products/products.module";
import { UserRole } from "./typeorm/entities/UserRole";
import { ShoppingCartsModule } from "./shopping-carts/shopping-carts.module";
import { CartItemsModule } from './cart-items/cart-items.module';
import { Address } from "./typeorm/entities/Address";
import { AddressesModule } from './addresses/addresses.module';
import { OrdersModule } from './orders/orders.module';
import { Order } from "./typeorm/entities/Orders";
import { OrderItemsModule } from './order-items/order-items.module';
import { OrderItem } from "./typeorm/entities/OrderItem";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "stamps",
      entities: [User, UserRole, Address,Product, ShoppingCart, CartItem,Order,OrderItem],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    ShoppingCartsModule,
    CartItemsModule,
    AddressesModule,
    OrdersModule,
    OrderItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
