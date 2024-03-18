import * as argon from 'argon2';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { SignupDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }
  async signup(dto: SignupDto) {
    try {
      const hashPassword = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          hash: hashPassword,
        }
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') // duplicate error code in prisma
          throw new ForbiddenException('Credentials taken')
      }
      throw error;
    }
  }
  login() {
    return 'this is login'
  }
}
