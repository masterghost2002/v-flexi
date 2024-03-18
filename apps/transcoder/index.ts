import dotenv from 'dotenv';
dotenv.config();
import getConfig from './src/get-config';
import formats from './src/formats';
import convert from './src/convert';
import upload from './src/upload-s3';
import handleDeleteFolder from './src/delete-from-s3'
const config = getConfig();
async function main(){
    try {
        const processFilePromises = formats.map(format=>convert(config.inputVideoUrl, format.outputPath, format.resolution));
        const processFilePaths = await Promise.all(processFilePromises);
        const uploadFilePromises = processFilePaths.map(filePath=>upload(filePath));
        const processedUploadFilePath = await Promise.all(uploadFilePromises);
        await Promise.all([handleDeleteFolder()]);
        console.log(processedUploadFilePath);

    } catch (error) {
        console.log(error);
    }finally{
        console.log('Shutting down');
        process.exit(1);
    }
    
}
main();

//ffmpeg -i https://notreal-bucket.s3-us-west-1.amazonaws.com/video/video.mp4 -f mp4 -movflags frag_keyframe+empty_moov pipe:1 | aws s3 cp - s3://notreal-bucket/video/output.mp4