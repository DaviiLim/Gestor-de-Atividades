import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChamadosModule } from './chamados/chamados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { SetorModule } from './setor/setor.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { RequerentesModule } from './requerentes/requerentes.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),
  
TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true, // Vou retirar isso em depois!
}),

    
    ChamadosModule,
    
    UsuariosModule,
    
    AuthModule,
    
    SetorModule,
    
    RolesModule,
    
    RequerentesModule,
        
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
