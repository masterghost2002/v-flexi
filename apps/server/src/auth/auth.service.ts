import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup(): string {
    return 'this is signup';
  }
}
