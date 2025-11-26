import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { log } from 'console';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async Login(@Body() loginDto: LoginDto) {
    const usuario = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.login(usuario);
  }


}
