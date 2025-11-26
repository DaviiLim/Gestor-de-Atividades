import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import { UsuariosService } from "src/usuarios/usuarios.service";


@Injectable()
export class AuthService {
 
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService
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
      fullName: usuario.fullName
    }
  }

  async login (usuario: {id:number, email:string, fullName:string}) {
    
    const payload = { sub: usuario.id, email: usuario.email, fullName: usuario.fullName };

    return {
      access_token: this.jwtService.sign(payload),
    }

  }

}
