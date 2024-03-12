import { Module } from "@nestjs/common";
import { ProductService } from "./services/products/products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NestjsFormDataModule } from "nestjs-form-data";
import { Product } from "src/typeorm/entities/Product";
import { ProductController } from "./controllers/products/products.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), NestjsFormDataModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}
