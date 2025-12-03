import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async Login(@Body() loginDto: LoginDto) {
    const usuario = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.login(usuario);
  }

  @Post('signup')
  async SignUp(@Body() signupDto: SignupDto) {
    return this.authService.signIn(signupDto);
  }
}
