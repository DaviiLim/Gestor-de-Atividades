import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {

  @InjectRepository(Role)
  private rolesRepository: Repository<Role>;

  async create(createRoleDto: CreateRoleDto) {
    const role =  this.rolesRepository.create(createRoleDto);
    return await this.rolesRepository.save(createRoleDto);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async findOne(id: number) {
    const role = await this.rolesRepository.findOneBy({id});

    if (!role) {
      throw new NotFoundException( `Role not found! ID: ${id}` );
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
  await this.findOne(id);
  await this.rolesRepository.update(id, updateRoleDto);
  return this.rolesRepository.findOneBy({id});
  }

  async remove(id: number) {
  await this.findOne(id);
  return this.rolesRepository.delete(id);
  }
}
