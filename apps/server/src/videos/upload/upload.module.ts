import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfigService } from "src/mutler/mutler.config";
@Module({
    imports:[
        MulterModule.registerAsync({
            useClass:MulterConfigService
        })
    ],
    controllers:[UploadController],
    providers:[UploadService]
})
export class UploadModule{};