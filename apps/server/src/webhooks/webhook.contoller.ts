import { Body, Controller, Post } from "@nestjs/common";
import { WebhookService } from "./webhoook.service";

@Controller('webhooks')
export class WebhooksController{
    constructor(private webhookService:WebhookService){};
    @Post('video/update-resolutions')
    updateVideoResolutions (@Body() videoData:any){
        this.webhookService.handleUpdateVideoResolutionsUrls(videoData);
    }
}