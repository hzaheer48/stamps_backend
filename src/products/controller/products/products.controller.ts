import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FormDataRequest } from "nestjs-form-data";
import { ProductService } from "src/products/services/products/products.service";
import { Product } from "src/typeorm/entities/Product";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(":id")
  async getProductById(@Param("id") id: number): Promise<Product | undefined> {
    return this.productService.getProductById(id);
  }

  @Post()
  @FormDataRequest()
  @UseGuards(AuthGuard("jwt"))
  async createProduct(
    @Req() req,
    @Body() productData: Partial<Product>
  ): Promise<Product> {
    return this.productService.createProduct(productData, req.user);
  }

  @Put(":id")
  @FormDataRequest()
  @UseGuards(AuthGuard("jwt"))
  async updateProduct(
    @Req() req,
    @Param("id") id: number,
    @Body() productData: Partial<Product>
  ): Promise<Product | undefined> {
    return this.productService.updateProduct(id, productData, req.user);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  async deleteProduct(@Req() req, @Param("id") id: number): Promise<void> {
    return this.productService.deleteProduct(id, req.user);
  }
}
