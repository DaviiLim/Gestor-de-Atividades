import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setor } from 'src/setor/entities/setor.entity';
import { Requerente } from './entities/requerente.entity';
import { RequerentesController } from './requerentes.controller';
import { RequerentesService } from './requerentes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Requerente, Setor])],
  controllers: [RequerentesController],
  providers: [RequerentesService],
})
export class RequerentesModule {}
