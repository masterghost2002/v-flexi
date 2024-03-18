import * as argon from 'argon2';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { LoginDto, SignupDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }
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
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const isPasswordCorrect = await argon.verify(user.hash, dto.password);
    if (!isPasswordCorrect) throw new ForbiddenException('Incorrect password');

    delete user.hash;
    const access_token = await this.signToken(user.id, user.email);
    const data = {...user, access_token};
    return data;
  }
  async signToken(userId: string, email: string): Promise<string> {
    const token = await this.jwt.signAsync({ userId, email }, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET')
    });
    return token;
  }
}
