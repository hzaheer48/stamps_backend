import { Module } from '@nestjs/common';
import { OrderController } from './controllers/orders/orders.controller';
import { OrderService } from './services/orders/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/Orders';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { Address } from 'src/typeorm/entities/Address';

@Module({
  imports: [TypeOrmModule.forFeature([Order,Address]), NestjsFormDataModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrdersModule {}
