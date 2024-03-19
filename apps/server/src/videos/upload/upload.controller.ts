import { Controller, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
@UseGuards(JwtGuard)
@Controller('upload')
export class UploadController{
    constructor(){}
    @Post('file')
    uploadFile(){
        return 'this is upload'
    }
};