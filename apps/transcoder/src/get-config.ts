const inputVideoUrl = process.env.INPUT_VIDEO_URL;
const userId = process.env.USER_ID;
const videoId = process.env.VIDEO_ID;
const videoFileKey = process.env.BUCKET_FILE_KEY;
const inputBucket = process.env.AWS_INPUT_BUCKET;
const outputBucket = process.env.AWS_OUTPUT_BUCKET;
const webhookUrl = process.env.WEBHOOK_URL;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_KEY_ID;
const region = process.env.AWS_REGION;
const getConfig = ()=>{
    if(!inputBucket || !videoFileKey || !userId || !videoId || !outputBucket || !webhookUrl || !accessKeyId || !secretAccessKey || !region || !inputVideoUrl)
    {
        console.error('Please provide all env variables');
        process.exit(1);
    }
    return {inputBucket, videoFileKey, userId, outputBucket, webhookUrl, accessKeyId, secretAccessKey,region, inputVideoUrl, videoId}
};
export default getConfig;
