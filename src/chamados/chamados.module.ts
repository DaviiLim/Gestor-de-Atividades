import { Module } from '@nestjs/common';
import { ChamadosService } from './chamados.service';
import { ChamadosController } from './chamados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chamado } from './entities/chamado.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Setor } from 'src/setor/entities/setor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chamado, Usuario, Setor])],
  controllers: [ChamadosController],
  providers: [ChamadosService],
})
export class ChamadosModule {}
