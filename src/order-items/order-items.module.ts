import { Module } from '@nestjs/common';
import { OrderItemsController } from './controllers/order-items/order-items.controller';
import { OrderItemsService } from './services/order-items/order-items.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItem } from 'src/typeorm/entities/OrderItem';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ShoppingCart } from 'src/typeorm/entities/ShoppingCart';
import { Order } from 'src/typeorm/entities/Orders';
import { CartItem } from 'src/typeorm/entities/CartItem';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem,ShoppingCart,Order,CartItem]),
    NestjsFormDataModule,
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService]
})
export class OrderItemsModule {}
