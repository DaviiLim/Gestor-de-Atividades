import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChamadoDto, StatusChamado } from './dto/create-chamado.dto';
import { UpdateChamadoDto } from './dto/update-chamado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chamado } from './entities/chamado.entity';
import { In, Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class ChamadosService {

  constructor(

    @InjectRepository(Chamado)
    private chamadosRepository: Repository<Chamado>,

    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>

  ) {}

 async create(createChamadoDto: CreateChamadoDto) {
  const usuario = await this.usuariosRepository.findOne({ 
    
    where: { id: createChamadoDto.usuarioId },
    select: ['id', 'fullName', 'email']

  });
  
  if (!usuario) {
    throw new NotFoundException(`Usuário not found! ID: ${createChamadoDto.usuarioId}`);
  }

  const chamado = this.chamadosRepository.create({
    title: createChamadoDto.title,
    description: createChamadoDto.description,
    status: createChamadoDto.status || StatusChamado.ABERTO, 
    usuario
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
    
    const chamado = await this.findOne(id);

    if (!chamado) {
      throw new NotFoundException( `Chamado not found! ID: ${id}` );
    }
    
    await this.chamadosRepository.update(id, dto);
    return this.findOne(id);
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
