import AWS from 'aws-sdk';
import getConfig from './get-config';
const config = getConfig();
AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region
});
const s3 = new AWS.S3;
const handleDeleteFolder = async (): Promise<string> => {
    const params = {
        Bucket: config.inputBucket,
        Prefix: config.videoFolderPath
    };

    return new Promise((resolve) => {
        s3.listObjectsV2(params, (err, data: AWS.S3.ListObjectsV2Output) => {
            if (err) {
                console.error('Error listing objects:', err);
                process.exit(1);

            }

            if (!data || !data.Contents || data.Contents.length === 0) {
                console.log('No objects found in the folder.');
                process.exit(1);
            }

            const deleteParams = {
                Bucket: config.inputBucket,
                Delete: { Objects: [] as Array<{ Key: string }> }
            };
            data.Contents.forEach(obj => {
                if (obj.Key)
                    deleteParams.Delete.Objects.push({ Key: obj.Key });
            });

            s3.deleteObjects(deleteParams, (err, data: AWS.S3.DeleteObjectsOutput) => {
                if (err) {
                    console.error('Error deleting objects:', err);
                    process.exit(1);
                }
                console.log('Objects deleted successfully:', data?.Deleted?.length);
                // Once objects are deleted, delete the "folder" itself
                s3.deleteObject({ Bucket: config.inputBucket, Key: config.videoFolderPath }, (err) => {
                    if (err) {
                        console.error('Error deleting folder:', err);
                        process.exit(1);
                    }
                    console.log('Folder deleted successfully:', config.videoFolderPath);
                    resolve('Successfully deleted');
                });
            });
        });

    }
    )



};
export default handleDeleteFolder;