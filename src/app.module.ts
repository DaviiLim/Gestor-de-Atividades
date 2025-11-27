import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChamadosModule } from './chamados/chamados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { SetorModule } from './setor/setor.module';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nest',
    password: 'nest123',
    database: 'db_api_atividades',
    autoLoadEntities: true,
    synchronize: true,
  }),
    
    ChamadosModule,
    
    UsuariosModule,
    
    AuthModule,
    
    SetorModule,
        
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
