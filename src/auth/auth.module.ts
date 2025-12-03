import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    
  UsuariosModule,

  JwtModule.registerAsync({

  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({

    secret: config.getOrThrow('JWT_SECRET'),
    signOptions: { 
      expiresIn: config.getOrThrow('JWT_EXPIRES_IN')
     
    },
  })

  }),
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
