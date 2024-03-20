import AWS from 'aws-sdk';
import fs from 'fs';
import getConfig from './get-config';
const config = getConfig();
AWS.config.update({
    accessKeyId:config.accessKeyId,
    secretAccessKey:config.secretAccessKey,
    region:config.region
});
const s3 = new AWS.S3;
const upload= async (filePath:string, resolution:string):Promise<{url:string, resolution:string}>  => {
    const fileName = config.userId + '/' + config.videoId + '/' + filePath;
    return new Promise((resolve, _)=>{
        const fileStream = fs.readFileSync(filePath);
        const uploadParams = {
            Bucket: config.outputBucket,
            Key: fileName,
            Body: fileStream
        };
        s3.upload(uploadParams, (err:any, data:any)=>{
            if(err){
                console.log('Error wile uploading', err);
                process.exit(1);
            }
            resolve({url:data.Location as string, resolution})
        })
    })
};
export default upload;