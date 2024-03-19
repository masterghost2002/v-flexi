import AWS from 'aws-sdk';
import getConfig from './get-config';
const config = getConfig();
AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region
});
const s3 = new AWS.S3;
const handleDeleteTempVideo = async (): Promise<string> => {
    const params = {
        Bucket: config.inputBucket,
        Key: config.videoFileKey
    };

    return new Promise((resolve) => {
        s3.deleteObject(params, (err) => {
            if (err) {
                console.error('Error deleting object:', err);
                process.exit(1);
            } 
            resolve('Succesfully deleted');
        });
    }
    )
};
export default handleDeleteTempVideo;