import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
const Config = ConfigModule.forRoot({
  isGlobal:true
})
@Module({
  imports: [AuthModule, Config, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
