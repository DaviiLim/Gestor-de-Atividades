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
      <h1>Olá, ${name}!</h1>
      <p>Seu cadastro foi realizado.</p>

      <p style="margin-top:20px; font-size:13px; color:#555;">
      Sistema de Notificações<br>
      <em>Departamento de TI</em>
      </p>
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
    <h2>Um novo usuário foi cadastrado.</h2>

    <h3>Usuário:<h3>
    <p><strong>Nome: ${usuario.fullName}</p>
    <p><strong>Email: ${usuario.email}</p>
    <p><strong>ID: ${usuario.id}</p>
    <p><strong>Data de Criação: ${usuario.createdAt}<p>
    <p><strong>Função: ${role.name}</p>
    
    <p style="margin-top:20px; font-size:13px; color:#555;">
    Sistema de Notificações<br>
    <em>Departamento de TI</em>
    </p>
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
    <h1>Olá, ${name}.</h1>
    <p>Seu cargo foi atualizado.</p>

    <p style="margin-top:20px; font-size:13px; color:#555;">
    Sistema de Notificações<br>
    <em>Departamento de TI</em>
    </p>
  `;

  return this.transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Cargo realizado com sucesso.',
    html,
    });
  }

    async newtask(chamado: Chamado) {
    const html = `
    <h1>Olá, ${chamado.openedBy.fullName}.</h2>
    <p>Novo chamado registrado!</p>

    <p style="margin-top:20px; font-size:13px; color:#555;">
    Sistema de Notificações<br>
    <em>Departamento de TI</em>
    </p>
    `;

    return this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: chamado.openedBy.email,
      subject: 'Um novo chamado foi registrado com sucesso',
      html,
    });
  }

  async notifyCreatorOnTicket(chamado: Chamado) {

  const html = `
    <h1>Olá, ${chamado.openedBy.fullName}!</h2>
    <h2>Seu chamado foi concluído por ${chamado.closedBy.fullName}</h2>

    <h3>Chamado:<h3>
    <p>ID: ${chamado.id}</p>
    <p>Título: ${chamado.title}</p>
    <p>Descrição: ${chamado.description}</p>
    <p>Requerente: ${chamado.requerente.fullName}<p>
    <p>Setor: ${chamado.setor.name}</p>
    <p>Status: ${chamado.status}</p>
    <p>Data de Início: ${chamado.startDate}</p>
    <p>Data de Fim: ${chamado.endDate}</p>

    <p>Concluído por: ${chamado.closedBy.fullName}<p>

    <p style="margin-top:20px; font-size:13px; color:#555;">
    Sistema de Notificações<br>
    <em>Departamento de TI</em>
    </p>
  `;

  return this.transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: chamado.openedBy.email,
    subject: 'Conclusão de chamado.',
    html,
    });

  }

  async notifyCloserOnTicket(chamado: Chamado) {

  const html = `
    <h1>Olá, ${chamado.closedBy.fullName}!</h1>
    <h2>Você concluiu o chamado de ${chamado.openedBy.fullName}</h2>

    <h3>Chamado:</h3>
    <p>ID: ${chamado.id}</p>
    <p>Título: ${chamado.title}</p>
    <p>Descrição: ${chamado.description}</p>
    <p>Requerente: ${chamado.requerente.fullName}<p>
    <p>Setor: ${chamado.setor.name}</p>
    <p>Status: ${chamado.status}</p>
    <p>Data de Início: ${chamado.startDate}</p>
    <p>Data de Fim: ${chamado.endDate}</p>

    <p style="margin-top:20px; font-size:13px; color:#555;">
    Sistema de Notificações<br>
    <em>Departamento de TI</em>
    </p>
  `;

  return this.transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: chamado.closedBy.email,
    subject: 'Conclusão de chamado.',
    html,
    });
  }

}
