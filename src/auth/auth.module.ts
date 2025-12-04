import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    
  UsuariosModule,

  PassportModule,
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
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy]
})
export class AuthModule {}
