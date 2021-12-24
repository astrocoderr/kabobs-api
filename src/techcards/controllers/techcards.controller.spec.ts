import { Test, TestingModule } from '@nestjs/testing';
import { TechcardsController } from './techcards.controller';

describe('TechcardsController', () => {
  let controller: TechcardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechcardsController],
    }).compile();

    controller = module.get<TechcardsController>(TechcardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
