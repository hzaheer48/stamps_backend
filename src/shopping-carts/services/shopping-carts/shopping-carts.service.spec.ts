import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartService } from './shopping-carts.service';

describe('ShoppingCartsService', () => {
  let service: ShoppingCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingCartService],
    }).compile();

    service = module.get<ShoppingCartService>(ShoppingCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
