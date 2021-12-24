import { Test, TestingModule } from '@nestjs/testing';
import { GroupIngredientsController } from './group-ingredients.controller';

describe('GroupIngredientController', () => {
  let controller: GroupIngredientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupIngredientsController],
    }).compile();

    controller = module.get<GroupIngredientsController>(GroupIngredientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
