import { Controller, Get, UseGuards } from '@nestjs/common';
import { VideosService } from './videos.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
@UseGuards(JwtGuard)
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService:VideosService) {}

  @Get()
  getVideos( @GetUser('id') userId:string) {
    return this.videosService.getUserVideos(userId);
  }
}
