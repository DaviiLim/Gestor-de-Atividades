import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setor } from 'src/setor/entities/setor.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateChamadoDto, StatusChamado } from './dto/create-chamado.dto';
import { UpdateChamadoDto } from './dto/update-chamado.dto';
import { Chamado } from './entities/chamado.entity';
import { Requerente } from 'src/requerentes/entities/requerente.entity';
import { time24h } from 'src/utils/date.util';

@Injectable()
export class ChamadosService {

  constructor(

    @InjectRepository(Chamado)
    private chamadosRepository: Repository<Chamado>,

    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,

    @InjectRepository(Requerente)
    private requerenteRepository: Repository<Requerente>,

    @InjectRepository(Setor)
    private setorRepository: Repository<Setor>

  ) {}

 async create(createChamadoDto: CreateChamadoDto) {

  const tecnico = await this.usuariosRepository.findOne({
    where: {id: createChamadoDto.tecnicoId},
    relations: ['role']
  })
  if (!tecnico || tecnico.role.name.toUpperCase() !== 'TÉCNICO') {
    throw new NotFoundException(`Técnico not found! ID: ${createChamadoDto.tecnicoId}`);
  }

  const requerente = await this.requerenteRepository.findOne({
    where: {id: createChamadoDto.requerenteId},
  })
  if (!requerente) {
    throw new NotFoundException(`Requerente not found! ID: ${createChamadoDto.requerenteId}`);
  }

  const setor = await this.setorRepository.findOne({
    where: { id: createChamadoDto.setorId }
  });
  if (!setor) {
    throw new NotFoundException(`Setor not found! ID: ${createChamadoDto.setorId}`);
  }

  const chamado = this.chamadosRepository.create({
    ...createChamadoDto,
    tecnico,
    requerente,
    setor,
    startDate: createChamadoDto.startDate
      ? new Date(createChamadoDto.startDate)
      : new Date()
      ,
    endDate: createChamadoDto.endDate
      ? new Date(createChamadoDto.endDate)
      : time24h()
    
  });

  return this.chamadosRepository.save(chamado);
}

  async findAll() {
    return this.chamadosRepository.find();
  }
  
  async findOne(id: number) {
   const chamado = await this.chamadosRepository.findOneBy({id});
   
   if (!chamado) {
    throw new NotFoundException( `Chamado not found! ID: ${id}` );
   }

    return chamado;
  }

  async update(id: number, dto: UpdateChamadoDto) {

    await this.findOne(id);
    await this.chamadosRepository.update(id, dto);

    return await this.findOne(id);
  }

  async remove(id: number) {
     this.chamadosRepository.delete(id);
     return ;
  }


async fecharChamado(id: number) {
  await this.findOne(id);
  return this.update(id, { status: StatusChamado.CONCLUIDO });
}
}
