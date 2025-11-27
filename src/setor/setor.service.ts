import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSetorDto } from './dto/create-setor.dto';
import { UpdateSetorDto } from './dto/update-setor.dto';
import { Setor } from './entities/setor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SetorService {

  constructor(
    @InjectRepository(Setor)
      private chamadosRepository: Repository<Setor>,
  ) {}

  async create(createSetorDto: CreateSetorDto) {
    const setor = await this.chamadosRepository.create(createSetorDto);
    return await this.chamadosRepository.save(setor);
  }

  async findAll() {
    return await this.chamadosRepository.find();
  }

  async findOne(id: number) {
    const setor = await this.chamadosRepository.findOneBy({id});

    if (!setor) {
      throw new NotFoundException( `Setor not found! ID: ${id}` );
    }

    return setor;
  }

  async update(id: number, updateSetorDto: UpdateSetorDto) {
    await this.findOne(id);
    await this.chamadosRepository.update(id, updateSetorDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.chamadosRepository.delete(id);
    return ;
  }
}
