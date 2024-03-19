import dotenv from 'dotenv';
dotenv.config();
import getConfig from './src/get-config';
import formats from './src/formats';
import convert from './src/convert';
import upload from './src/upload-s3';
import handleDeleteTempVideo from './src/delete-from-s3'
const config = getConfig();
async function main(){
    try {
        console.log('Video conversion started');
        const processFilePromises = formats.map(format=>convert(config.inputVideoUrl, format.outputPath, format.resolution));
        const processFilePaths = await Promise.all(processFilePromises);
        console.log('Uploading to S3');
        const uploadFilePromises = processFilePaths.map(filePath=>upload(filePath));
        await Promise.all(uploadFilePromises);
        console.log('Deleting raw video file bucket');
        await Promise.all([handleDeleteTempVideo()]);
        console.log('File conversion completed');
    } catch (error) {
        console.log(error);
    }finally{
        console.log('Shutting down');
        process.exit(1);
    }
    
}
main();

//ffmpeg -i https://notreal-bucket.s3-us-west-1.amazonaws.com/video/video.mp4 -f mp4 -movflags frag_keyframe+empty_moov pipe:1 | aws s3 cp - s3://notreal-bucket/video/output.mp4