import { Test, TestingModule } from '@nestjs/testing';
import { MaximumQuantityService } from './maximum-quantity.service';

describe('MaximumQuantityService', () => {
  let service: MaximumQuantityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaximumQuantityService],
    }).compile();

    service = module.get<MaximumQuantityService>(MaximumQuantityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
