import { Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(): string {
    return this.authService.signup();
  }
  
  @HttpCode(200)
  @Post('login')
  login():string{
    return this.authService.login();
  }
}
