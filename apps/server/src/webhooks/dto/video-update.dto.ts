type URLSDATA =
    {
        resolution: string;
        url: string | undefined;
    }

export class VideoUpdateDto {
    userId: string;
    videoId: string;
    videoUrls: URLSDATA[]
}
