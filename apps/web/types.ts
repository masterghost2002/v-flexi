export enum Status{
    UPLOADING= "UPLOADING",
    PROCESSING = "PROCESSING",
    AVAILABLE = "AVAILABLE",
    FAILED  = "FAILED"
}
export type Video = {
    id: number;
    status: Status;
    userId: string;
    video_1080_mp4: string;
    video_720_mp4: string;
    video_480_mp4: string;
    createdAt: string;
    updatedAt: string
}