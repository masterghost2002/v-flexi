import { Module } from "@nestjs/common";
import { WebhooksController } from "./webhook.contoller";
import { WebhookService } from "./webhoook.service";

@Module({
    controllers:[WebhooksController],
    providers:[WebhookService]
})
export class WebhookModule{
    constructor(){}
}