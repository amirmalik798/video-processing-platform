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
        '-y',
        '-i',
        inputPath,
        '-vf',
        'scale=1280:-2',
        '-c:v',
        'libx264',
        '-crf',
        String(COMPRESSION_CRF),
        '-pix_fmt',
        'yuv420p',
        '-threads',
        '1',
        '-preset',
        'veryfast',
        outputPath 
    ];

    await runMediaOperation(clientId, inputPath, args);
};

export const extractAudio = async (clientId, inputPath, outputPath) => {
    const args = [
        '-y',
        '-i',
        inputPath,
        '-vn',
        '-codec:a',
        'libmp3lame',
        outputPath
    ];

    await runMediaOperation(clientId, inputPath, args);
};

export const generateThumbnail = async (clientId, inputPath, outputPath, timestamp) => {
    
    const args = [
        '-y',
        '-ss',
        timestamp,
        '-i',
        inputPath,
        '-frames:v',
        '1',
        outputPath
    ];

    await runFFmpeg(args);

    sendProgress(clientId, 100);
    sendCompleted(clientId);
};

export const convertFormat = async (clientId, inputPath, outputPath) => {
    const args = [
        '-y',
        '-i',
        inputPath,
        outputPath
    ];

    await runMediaOperation(clientId, inputPath, args);
};
