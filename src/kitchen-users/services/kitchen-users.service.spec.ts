import { Test, TestingModule } from '@nestjs/testing';
import { KitchenUsersService } from './kitchen-users.service';

describe('KitchenUsersService', () => {
  let service: KitchenUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KitchenUsersService],
    }).compile();

    service = module.get<KitchenUsersService>(KitchenUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
