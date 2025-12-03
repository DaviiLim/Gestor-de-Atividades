import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requerente } from 'src/requerentes/entities/requerente.entity';
import { Setor } from 'src/setor/entities/setor.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ChamadosController } from './chamados.controller';
import { ChamadosService } from './chamados.service';
import { Chamado } from './entities/chamado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chamado, Usuario, Setor, Requerente])],
  controllers: [ChamadosController],
  providers: [ChamadosService],
})
export class ChamadosModule {}
