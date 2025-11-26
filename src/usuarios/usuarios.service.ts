import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class UsuariosService {
  
  constructor(

    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>
  
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {

    const hash = await bcrypt.hash(createUsuarioDto.password, 10);
    const emailExiste = await this.usuariosRepository.findOneBy({ email: createUsuarioDto.email });
    
    if (emailExiste) {
      throw new ConflictException(`Email already in use! Email: ${createUsuarioDto.email}`);
    }

    const usuario = this.usuariosRepository.create(
      {
        ...createUsuarioDto,
        password: hash
      }
    )
    return await this.usuariosRepository.save(usuario);;
  }

  async findAll() {
    return await this.usuariosRepository.find();
  }

  async findOne(id: number) {
    await this.usuarioExiste(id);
    return this.usuariosRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    await this.usuarioExiste(id);
    await this.usuariosRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.usuarioExiste(id);
    await this.usuariosRepository.delete(id);
    return ;
  }

  async usuarioExiste(id: number) {
  const usuario = await this.usuariosRepository.findOneBy({ id });

  if (!usuario) {
    throw new NotFoundException(`Usuário not found! ID: ${id}`);
  }

  return usuario;
  }

  async findByEmail(email: string) {
    const usuario = await this.usuariosRepository.findOne({ 
      where: { email }, 
      select: ['id', 'email', 'fullName', 'password']
    });
    
    if (!usuario) {
      throw new NotFoundException(`Usuário not found! Email: ${email}`);
    }

    return usuario;
  }

}


