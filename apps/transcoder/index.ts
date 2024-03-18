import ffmpeg from 'fluent-ffmpeg';
import 'dotenv';
const filePath = process.env.FILE_PATH!;
const formats = [{
    format: '1080p',
    resolution: '1920x1080',
    outputPath: 'output_1080p.mp4'
},
{
    format: '720p',
    resolution: '1280x720',
    outputPath: 'output_720p.mp4'
},
{
    format: '480p',
    resolution: '854x480',
    outputPath: 'output_480p.mp4'
}

]
function convert(inputFile: string, outputFile: string, resolution: string) {
    ffmpeg(inputFile)
        .output(outputFile)
        .size(resolution)
        .on('end', () => {
            console.log(`Conversion to ${resolution} complete`);
        })
        .on('error', (err) => {
            console.error('Error during conversion:', err);
        })
        .run();
}

function main(){
    for(const format of formats)
        convert(filePath, format.outputPath, format.resolution);
}
main();

//ffmpeg -i https://notreal-bucket.s3-us-west-1.amazonaws.com/video/video.mp4 -f mp4 -movflags frag_keyframe+empty_moov pipe:1 | aws s3 cp - s3://notreal-bucket/video/output.mp4