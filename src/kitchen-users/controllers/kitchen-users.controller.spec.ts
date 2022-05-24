import { Test, TestingModule } from '@nestjs/testing';
import { KitchenUsersController } from './kitchen-users.controller';

describe('KitchenUsersController', () => {
  let controller: KitchenUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KitchenUsersController],
    }).compile();

    controller = module.get<KitchenUsersController>(KitchenUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
