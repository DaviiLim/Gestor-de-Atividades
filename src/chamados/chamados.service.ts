import { ConflictException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setor } from 'src/setor/entities/setor.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateChamadoDto, StatusChamado } from './dto/create-chamado.dto';
import { UpdateChamadoDto } from './dto/update-chamado.dto';
import { Chamado } from './entities/chamado.entity';
import { Requerente } from 'src/requerentes/entities/requerente.entity';
import { time24h } from 'src/utils/date.util';
import { MailService } from 'src/mail/mail.service';
import { RoleUsuarios } from 'src/roles/dto/create-role.dto';

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
    private setorRepository: Repository<Setor>,

    private mailService: MailService

  ) {}

 async create(createChamadoDto: CreateChamadoDto) {
  
  const tecnico_criador = await this.usuariosRepository.findOne({
    where: {id: createChamadoDto.openedById},
    relations: ['role']
  })

  if (
  !tecnico_criador ||
  (
    tecnico_criador.role.name.toUpperCase() !== RoleUsuarios.TECNICO &&
    tecnico_criador.role.name.toUpperCase() !== RoleUsuarios.TECNICO_ACENTUADO
  )
) {
  throw new NotFoundException(`Técnico not found! ID: ${createChamadoDto.openedById}`);
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
    openedBy: tecnico_criador,
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
  await this.chamadosRepository.save(chamado)
  await this.mailService.newtask(tecnico_criador.fullName, tecnico_criador.email)

  return chamado;
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


async fecharChamado(id: number , tecnicoId: number) {
  let chamado = await this.findOne(id);

  const tecnico_finalizador = await this.usuariosRepository.findOne({
    where: { id: tecnicoId },
    select: ['id','email', 'fullName']
  });

  if (!tecnico_finalizador) {
    throw new NotFoundException(`Técnico ${tecnicoId} não encontrado.`);
  }


  if (chamado.status === StatusChamado.CONCLUIDO) {
    throw new ConflictException('Chamado is already CONCLUÍDO')
  }

  chamado.status = StatusChamado.CONCLUIDO
  chamado.closedBy = tecnico_finalizador
  
  await this.chamadosRepository.save(chamado)

  chamado.closedBy = tecnico_finalizador

  this.mailService.notifyCloserOnTicket(tecnico_finalizador.email, tecnico_finalizador.fullName, tecnico_finalizador.fullName, chamado)
  this.mailService.notifyCreatorOnTicket(chamado.openedBy.email, chamado.openedBy.fullName, chamado.closedBy.fullName, chamado)

  return this.findOne(id);
}
}
