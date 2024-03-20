import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './videos/upload/upload.module';
import { WebhookModule } from './webhooks/webhook.module';
const Config = ConfigModule.forRoot({
  isGlobal:true
})
@Module({
  imports: [AuthModule, Config, PrismaModule, UploadModule, WebhookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
