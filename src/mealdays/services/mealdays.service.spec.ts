import { Test, TestingModule } from '@nestjs/testing';
import { MealdaysService } from './mealdays.service';

describe('MealdaysService', () => {
  let service: MealdaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealdaysService],
    }).compile();

    service = module.get<MealdaysService>(MealdaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
