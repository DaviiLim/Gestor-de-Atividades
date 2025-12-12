import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ForgotPassword } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';


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
    return this.authService.register(signupDto);
  }

  @Post('forgot-password')
  async forgotResetPassword(@Body() forgotPassword: ForgotPassword){
    const email = forgotPassword.email;
    return await this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPassword: ResetPasswordDto){
    return this.authService.resetPassword(resetPassword.newPassword, resetPassword.token);
  }
}
