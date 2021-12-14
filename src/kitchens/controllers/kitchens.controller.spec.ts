import { Test, TestingModule } from '@nestjs/testing';
import { KitchensController } from './kitchens.controller';

describe('KitchenController', () => {
  let controller: KitchensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KitchensController],
    }).compile();

    controller = module.get<KitchensController>(KitchensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
