import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto:SignupDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(200)
  @Post('login')
  login(@Body() dto:LoginDto){
    return this.authService.login(dto);
  }
}
