import { Test, TestingModule } from '@nestjs/testing';
import { TechcardsService } from './techcards.service';

describe('TechcardsService', () => {
  let service: TechcardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechcardsService],
    }).compile();

    service = module.get<TechcardsService>(TechcardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
