import { Test, TestingModule } from '@nestjs/testing';
import { OrderDaysService } from './order-days.service';

describe('OrderDaysService', () => {
  let service: OrderDaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderDaysService],
    }).compile();

    service = module.get<OrderDaysService>(OrderDaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
