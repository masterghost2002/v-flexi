import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class VideosService {
    constructor(private prisma: PrismaService) { }
    async getUserVideos(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                videos:{
                    orderBy:{
                        updatedAt:'desc'
                    }
                }
            }
        });
        return user.videos;
    }
}