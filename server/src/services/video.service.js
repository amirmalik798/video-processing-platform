import { runFFmpeg } from '../utils/ffmpeg.util.js';
import { getVideoDuration } from '../utils/media.util.js';
import { sendProgress, sendCompleted } from '../utils/sse.util.js';

const COMPRESSION_CRF = 28;

const runMediaOperation = async (clientId, inputPath, args) => {
    const duration = await getVideoDuration(inputPath);

    let lastProgress = -1;

    await runFFmpeg(args, (currentTime) => {
        const progress = Math.floor(currentTime / duration * 100);

        if (progress !== lastProgress) {
            sendProgress(clientId, progress);
            lastProgress = progress;
        }
    });

    sendProgress(clientId, 100);
    sendCompleted(clientId);
};

export const compressVideo = async (clientId, inputPath, outputPath) => {
    const args = [
        '-i',
        inputPath,
        '-crf',
        COMPRESSION_CRF,
        outputPath 
    ];

    await runMediaOperation(clientId, inputPath, args);
};

export const extractAudio = async (clientId, inputPath, outputPath) => {
    const args = [
        '-i',
        inputPath,
        '-vn',
        '-codec:a',
        'libmp3lame',
        outputPath
    ];

    await runMediaOperation(clientId, inputPath, args);
};

export const generateThumbnail = async (clientId, inputPath, outputPath) => {
    
    const args = [
        '-i', // input source
        inputPath,
        '-ss', // seek to 1 second
        '00:00:01',
        '-frames:v', //capture one frame
        '1',
        outputPath 
    ];

    await runFFmpeg(args);

    sendProgress(clientId, 100);
    sendCompleted(clientId);
};

export const convertFormat = async (clientId, inputPath, outputPath) => {
    const args = [
        '-i',
        inputPath,
        outputPath
    ];

    await runMediaOperation(clientId, inputPath, args);
};