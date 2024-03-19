import { Injectable } from "@nestjs/common";
import { VIDEOSTATUS } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { ECSClient } from '@aws-sdk/client-ecs';
import { ConfigService } from "@nestjs/config";
import { FileDto } from "../dto";
Injectable({});
export class UploadService {
    constructor(private prisma: PrismaService, private configService: ConfigService) { }
    async handleUpload(file: FileDto, userId: string) {
        try {
            const video = await this.prisma.video.create({
                data: {
                    status: VIDEOSTATUS.PROCESSING,
                    user: { connect: { id: userId } }
                }
            });
            await this.createProcessingTask(userId, video.id, file.location, file.key);
            return video;
        } catch (err) {
            throw err;
        }
    }
    async createProcessingTask(userId: string, videoId: number, videoUrl: string, fileKey:string) {
        const ecs = new ECSClient({
            region: this.configService.get('AWS_ECS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ECS_IAM_ACCESS_KEY_ID='),
                secretAccessKey: this.configService.get('K9C93a/rHsui1gP5+9o1bqp8F4vEPTqyntrKnG5f')
            }
        });
        const params = {
            cluster: this.configService.get('AWS_ECS_CLUSTER_ACN'),
            taskDefinition: this.configService.get('AWS_ECS_TASK_ACN'),
            count: 1, // Number of tasks to run
            launchType: 'FARGATE', // Or 'EC2' depending on your setup
            networkConfiguration: {
                awsvpcConfiguration: {
                    subnets: ['subnet-00c9f8338003a710a'],
                    assignPublicIp: 'ENABLED'
                }
            },
            overrides: {
                containerOverrides: [
                    {
                        name: 'vflex-transcoder',
                        environment: [
                            {
                                name: 'INPUT_VIDEO_URL',
                                value: videoUrl
                            },
                            {
                                name: 'USER_ID',
                                value: userId
                            },
                            {
                                name: 'VIDEO_ID',
                                value: videoId
                            }, {
                                name: 'BUCKET_FILE_KEY',
                                value: fileKey
                            }, {
                                name: 'AWS_INPUT_BUCKET',
                                value: this.configService.get('AWS_TEMP_BUCKET_NAME')
                            }, {
                                name: 'AWS_OUTPUT_BUCKET',
                                value: this.configService.get('AWS_PEM_BUCKET_NAME')
                            }, {
                                name: 'AWS_ACCESS_KEY_ID',
                                value: this.configService.get('AWS_BUCKET_IAM_ACCESS_KEY_ID')
                            }, {
                                name: 'AWS_SECRET_KEY_ID',
                                value: this.configService.get('AWS_BUCKET_IAM_SECRET_KEY_ID')
                            },
                            {
                                name: 'AWS_REGION',
                                value: this.configService.get('AWS_TEMP_BUCKET_REGION')
                            },
                            {
                                name: 'WEBHOOK_URL',
                                value: this.configService.get('TRANSCODER_WEBHOOK')
                            },
                        ]
                    }
                ]
            }
        };


    }
}