// multer.config.ts

import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    constructor(private readonly configService: ConfigService) { }

    createMulterOptions(): MulterModuleOptions {
        const s3 = new S3Client({
            region: this.configService.get('AWS_TEMP_BUCKET_REGION'),
            credentials:{
               accessKeyId:this.configService.get('AWS_BUCKET_IAM_ACCESS_KEY_ID'),
               secretAccessKey:this.configService.get('AWS_BUCKET_IAM_SECRET_KEY_ID')
           }
         })
        return {
            storage: multerS3({
                s3: s3,
                bucket: this.configService.get<string>('AWS_TEMP_BUCKET_NAME'),
                acl: 'public-read',
                contentType: multerS3.AUTO_CONTENT_TYPE,
                key: function (req, file, cb) {
                    cb(null, Date.now().toString() + '-' + file.originalname);
                },
            }),
        };
    }
}
