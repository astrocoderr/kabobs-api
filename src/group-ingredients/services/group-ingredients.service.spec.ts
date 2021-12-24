import { Test, TestingModule } from '@nestjs/testing';
import { GroupIngredientsService } from './group-ingredients.service';

describe('GroupIngredientService', () => {
  let service: GroupIngredientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupIngredientsService],
    }).compile();

    service = module.get<GroupIngredientsService>(GroupIngredientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
