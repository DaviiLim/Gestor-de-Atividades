import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequerenteDto } from './dto/create-requerente.dto';
import { UpdateRequerenteDto } from './dto/update-requerente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Requerente } from './entities/requerente.entity';
import { Repository } from 'typeorm';
import { Setor } from 'src/setor/entities/setor.entity';
import { SetorService } from 'src/setor/setor.service';

@Injectable()
export class RequerentesService {

  @InjectRepository(Requerente)
  private requerentesRepository: Repository<Requerente>;

  @InjectRepository(Setor)
  private setorRepository: Repository<Setor>;
  
  async create(createRequerenteDto: CreateRequerenteDto) {

    const setor = await this.setorRepository.findOneBy({ id: createRequerenteDto.setorId });

    if (!setor){
       throw new NotFoundException(`Setor not found! ID: ${createRequerenteDto.setorId}`);
    }

    const requerente = {
      ...createRequerenteDto,
      setor
    }

    this.requerentesRepository.create(requerente); 
    await this.requerentesRepository.save(requerente)
    
    return requerente;
  }

  async findAll() {
    return await this.requerentesRepository.find();
  }

  async findOne(id: number) {
    const requerente = await this.requerentesRepository.findOneBy({id});
    
    if (!requerente) {
      throw new NotFoundException(`Requerente not found! ID: ${id}`);
    }
    
    return requerente;
  }

  async update(id: number, updateRequerenteDto: UpdateRequerenteDto) {
    const requerente = await this.findOne(id);
    await this.requerentesRepository.update(id, updateRequerenteDto);

    return requerente;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.requerentesRepository.delete(id);
  }
}
