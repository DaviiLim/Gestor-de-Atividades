import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import { UsuariosService } from "src/usuarios/usuarios.service";
import { SignupDto } from "./dto/signup.dto";
import * as crypto from "crypto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Repository } from "typeorm";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class AuthService {
 
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
    private mailService: MailService,

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
    const tokenHas = crypto.createHash('sha256').update(token).digest('hex');

    usuario.resetPasswordToken = tokenHas;

    await this.usuariosRepository.save(usuario)

    await  this.mailService.sendResetPasswordEmail(usuario, tokenHas)
  }

  async resetPassword(newPassword: string, token: string){
    const usuario = await this.usuariosRepository.findOne({
      where: { resetPasswordToken: token},
      select:['id','fullName', 'email','password', 'resetPasswordToken']
    });

    if (!usuario){
      throw new BadRequestException('Token inválido ou expirado');
    }

    const salt = await bcrypt.genSalt();
    usuario.password = await bcrypt.hash(newPassword, salt);
    usuario.resetPasswordToken = null;

    await this.usuariosRepository.save(usuario)

    await this.mailService.newPassword(usuario);

    return 'Senha redefinida com sucesso!';
  }

}
