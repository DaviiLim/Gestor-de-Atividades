import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import { UsuariosService } from "src/usuarios/usuarios.service";
import { SignupDto } from "./dto/signup.dto";
import * as crypto from "crypto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
 
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,

    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>
  ) {}

  async validateUser (email: string, password: string){

    const usuario = await this.usuariosService.findByEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Invalid credentials! User not found.');
    }

    const senhaCorreta = await bcrypt.compare(password, usuario.password);
    if (!senhaCorreta) {
      throw new UnauthorizedException('Invalid credentials! Password incorrect.');
    }

    return {
      id: usuario.id,
      email: usuario.email,
      fullName: usuario.fullName,
      role: usuario.role.name
    }
  }

  async register (signupDto: SignupDto) {

    const usuario = await this.usuariosService.create(signupDto);

    return this.login({
      id: usuario.id,
      email: usuario.email,
      fullName: usuario.fullName,
      role: usuario.role.name
    })

    
  }
  async login (usuario: {id:number, email:string, fullName:string, role:any}) {
    
    const payload = { sub: usuario.id, email: usuario.email, fullName: usuario.fullName, role: usuario.role };

    return {
      access_token: this.jwtService.sign(payload),
    }

  }

  async forgotPassword(email: string ){

    const usuario = await this.usuariosService.findByEmail(email);

    const token = crypto.randomBytes(32).toString('hex');

    usuario.resetPasswordToken = token;

    await this.usuariosRepository.update(usuario.id, usuario)

    return token

  }

}
