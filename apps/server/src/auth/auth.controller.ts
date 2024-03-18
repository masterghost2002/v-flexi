import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('health')
  getHealth(): string {
    return this.authService.signup();
  }
}
