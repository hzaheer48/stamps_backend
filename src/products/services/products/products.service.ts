import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/typeorm/entities/Product";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.productRepository.findOne({ where: { id: id } });
  }

  async createProduct(
    productData: Partial<Product>,
    user: any
  ): Promise<Product> {
    if (user.role.name !== "admin") {
      throw new ForbiddenException(
        "You do not have permission to perform this action."
      );
    }
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async updateProduct(
    id: number,
    productData: Partial<Product>,
    user: any
  ): Promise<Product | undefined> {
    if (user.role.name !== "admin") {
      throw new ForbiddenException(
        "You do not have permission to perform this action."
      );
    }
    await this.productRepository.update(id, productData);
    return this.productRepository.findOne({ where: { id: id } });
  }

  async deleteProduct(id: number, user: any): Promise<void> {
    if (user.role.name !== "admin") {
      throw new ForbiddenException(
        "You do not have permission to perform this action."
      );
    }
    await this.productRepository.delete(id);
  }
}
