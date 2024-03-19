import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { FileDto } from '../dto';
@UseGuards(JwtGuard)
@Controller('upload')
export class UploadController {
  constructor(private uploadService:UploadService){}
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: FileDto, @GetUser('id') userId:string) {
    return this.uploadService.handleUpload(file, userId);
  }
}