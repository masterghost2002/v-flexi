export class FileDto {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    bucket: string;
    key: string;
    acl: string;
    contentType: string;
    contentDisposition?: any;
    contentEncoding?: any;
    storageClass: string;
    serverSideEncryption?: any;
    location: string;
    etag: string;
}