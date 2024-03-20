import { Injectable } from "@nestjs/common";
import { VIDEOSTATUS } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
type URLSDATA =
    {
        resolution: string;
        url: string | undefined;
    }
type DATA = {
    userId: string;
    videoId: string;
    videoUrls: URLSDATA[]
}
@Injectable()
export class WebhookService {
    constructor(private prisma: PrismaService) { }
    async handleUpdateVideoResolutionsUrls(videoData: DATA) {
        const _1080P_url = videoData.videoUrls.filter(obj=>obj.resolution === '1080p')[0].url;
        const _720P_url = videoData.videoUrls.filter(obj=>obj.resolution === '720p')[0].url;
        const _480P_url = videoData.videoUrls.filter(obj=>obj.resolution === '480p')[0].url;
        await this.prisma.video.update({
            where: {
                id: parseInt(videoData.videoId)
            },
            data: {
                status:VIDEOSTATUS.AVAILABLE,
                video_1080_mp4: _1080P_url,
                video_720_mp4: _720P_url,
                video_480_mp4: _480P_url
            }

        });
        return 'Updated video resolutions'
    }
}