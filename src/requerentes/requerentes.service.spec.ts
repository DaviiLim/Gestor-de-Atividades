import { Test, TestingModule } from '@nestjs/testing';
import { RequerentesService } from './requerentes.service';

describe('RequerentesService', () => {
  let service: RequerentesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequerentesService],
    }).compile();

    service = module.get<RequerentesService>(RequerentesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
