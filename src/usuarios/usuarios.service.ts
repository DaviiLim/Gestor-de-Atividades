import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'node_modules/bcryptjs';
import { Role } from 'src/roles/entities/role.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsuariosService {
  
  constructor(

    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    private mailService: MailService
  
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {

    const hash = await bcrypt.hash(createUsuarioDto.password, 10);
    const emailExiste = await this.usuariosRepository.findOneBy({ email: createUsuarioDto.email });

    const role = await this.roleRepository.findOne({
      where: {id: createUsuarioDto.roleId}
    })

    if (!role) {
      throw new NotFoundException(`Role not found! ID: ${createUsuarioDto.roleId}`);
    }
    
    if (emailExiste) {
      throw new ConflictException(`Email already in use! Email: ${createUsuarioDto.email}`);
    }

    const usuario = this.usuariosRepository.create(
      {
        ...createUsuarioDto,
        role,
        password: hash
      }
    )

    await this.usuariosRepository.save(usuario)
    await this.mailService.newUser(usuario, role)
    await this.mailService.sendWelcomeEmail(usuario.email, usuario.fullName)

    return usuario;
  }

  async findAll() {
    return await this.usuariosRepository.find({relations: ['role']});
  }

  async findOne(id: number) {
    const usuario = await this.usuariosRepository.findOne({
      where: {id},
      relations: ['role']
    });

    if (!usuario) {
      throw new NotFoundException( `Usuário not found! ID: ${id}` );
    } 

    return usuario;
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    await this.findOne(id);
    await this.usuariosRepository.update(id, dto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.usuariosRepository.delete(id);
    return ;
  }


  async findByEmail(email: string) {
    const usuario = await this.usuariosRepository.findOne({ 
      where: { email }, 
      select: ['id', 'email', 'fullName','password'],
      relations: ['role']
    });
    
    if (!usuario) {
      throw new NotFoundException(`Usuário not found! Email: ${email}`);
    }

    return usuario;
  }

}


