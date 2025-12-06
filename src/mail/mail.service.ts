import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Role } from 'src/roles/entities/role.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class MailService {
  private transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: this.config.get('SMTP_PORT'),
      auth: {
        user: this.config.get('SMTP_USER'),
        pass: this.config.get('SMTP_PASS'),
      },
    });
  }

  async sendWelcomeEmail(to: string, name: string) {
    const html = `
      <h2>Olá, ${name}!</h2>
      <p>Seu cadastro foi realizado com sucesso!</p>
    `;

    return this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Cadastro realizado com sucesso!',
      html,
    });
  }


 async newUser(usuario: Usuario, role: Role) {

  const html = `
    <h1>Atenção</h1>
    <h3>Um novo usuário foi cadastrado!</h3>

    <p><strong>Nome:</strong> ${usuario.fullName}</p>
    <p><strong>Email:</strong> ${usuario.email}</p>
    <p><strong>ID:</strong> ${usuario.id}</p>
    <p><strong>Data de Criação:<strong> ${usuario.createdAt}<p>
    <p><strong>Função:</strong> ${role.name}</p>

  `;

  return this.transporter.sendMail({
    from: process.env.EMAIL_FROM_NEWUSER,
    to: process.env.SMTP_USER,
    subject: 'Novo usuário cadastrado',
    html, 
  });
}
}
