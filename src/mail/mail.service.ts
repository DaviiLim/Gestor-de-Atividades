import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Chamado } from 'src/chamados/entities/chamado.entity';
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
      <p>Seu cadastro foi realizado!</p>
    `;

    return this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Cadastro realizado com sucesso',
      html,
    });
  }


 async newUser(usuario: Usuario, role: Role) {

  const html = `
    <h1>Atenção</h1>
    <h3>Um novo usuário foi cadastrado.</h3>

    <p><strong>Nome:</strong> ${usuario.fullName}</p>
    <p><strong>Email:</strong> ${usuario.email}</p>
    <p><strong>ID:</strong> ${usuario.id}</p>
    <p><strong>Data de Criação:<strong> ${usuario.createdAt}<p>
    <p><strong>Função:</strong> ${role.name}</p>

  `;

  return this.transporter.sendMail({
    from: process.env.EMAIL_FROM_NEWUSER,
    to: process.env.SMTP_USER,
    subject: 'Novo usuário cadastrado.',
    html, 
  });
  }

  async roleUpdated(to: string, name: string) {

  const html = `
    <h2>Olá, ${name}!</h2>
    <p>Seu cargo foi atualizado.</p>
  `;

  return this.transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Cargo realizado com sucesso.',
    html,
    });
  }

    async newtask(to: string, name: string) {
    const html = `
      <h2>Olá, ${name}!</h2>
      <p>Novo chamado registrado!</p>
    `;

    return this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Um novo chamado foi registrado com sucesso',
      html,
    });
  }

  async notifyCreatorOnTicket(to: string, name: string, tecnico_finalizador: string, chamado: Chamado) {

  const html = `
    <h2>Olá, ${name}!</h2>
    <p>Seu chamado foi concluído!!</p>

    <p>Id:</strong> ${chamado.id}</p>
    <p>Título:</strong> ${chamado.title}</p>
    <p>Descrição:</strong> ${chamado.description}</p>
    <p>Requerente:<strong> ${chamado.requerente.name}<p>
    <p>Setor:</strong> ${chamado.setor.name}</p>
    <p>Status:</strong> ${chamado.status}</p>
    <p>Data de Início:</strong> ${chamado.startDate}</p>
    <p>Data de Fim:</strong> ${chamado.endDate}</p>

    <p>Finalizado por:<strong> ${tecnico_finalizador}<p>
  `;

  return this.transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Seu chamado',
    html,
    });

  }

  async notifyCloserOnTicket(to: string, name: string, tecnico_finalizador: string, chamado: Chamado) {

  const html = `
    <h2>Olá, ${name}!</h2>
    <p>Chamado concluído</p>

    <p>Id:</strong> ${chamado.id}</p>
    <p>Título:</strong> ${chamado.title}</p>
    <p>Descrição:</strong> ${chamado.description}</p>
    <p>Requerente:<strong> ${chamado.requerente.name}<p>
    <p>Setor:</strong> ${chamado.setor.name}</p>
    <p>Status:</strong> ${chamado.status}</p>
    <p>Data de Início:</strong> ${chamado.startDate}</p>
    <p>Data de Fim:</strong> ${chamado.endDate}</p>

    <p>Finalizado por:<strong> ${tecnico_finalizador}<p>
  `;

  return this.transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Seu chamado',
    html,
    });
  }

}
