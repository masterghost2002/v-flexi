import ffmpeg from "fluent-ffmpeg";
async function convert(inputFile: string, outputFile: string, resolution: string):Promise<{outputFile:string, resolution:string}> {
    return new Promise((resolve, _)=>{
        console.log('Converting to: ' + resolution);
        ffmpeg(inputFile).output(outputFile).size(resolution)
        .on('end', ()=>resolve({outputFile, resolution}))
        .on('error', (err)=>{
            console.error('Error while converting file', err);
            process.exit(1);
        })
        .run();
    });
};
export default convert;