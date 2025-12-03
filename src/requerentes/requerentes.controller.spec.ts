import { Test, TestingModule } from '@nestjs/testing';
import { RequerentesController } from './requerentes.controller';
import { RequerentesService } from './requerentes.service';

describe('RequerentesController', () => {
  let controller: RequerentesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequerentesController],
      providers: [RequerentesService],
    }).compile();

    controller = module.get<RequerentesController>(RequerentesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
