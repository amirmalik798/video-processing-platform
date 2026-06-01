import { spawn } from 'child_process';

const parseTimeToSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':');

    return (
        Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
    );
};

export const runFFmpeg = async (args, onProgress) => {
    return new Promise((resolve, reject) => {

        const ffmpeg = spawn('ffmpeg', args);

        let stderr = '';

        ffmpeg.stderr.on('data', (chunk) => {
            const msg = chunk.toString();
            const match = msg.match(/time=(\d{2}:\d{2}:\d{2}\.\d{2})/);
            if (match && onProgress) {
                const currentTime = parseTimeToSeconds(match[1]);
                onProgress(currentTime);
            }
            stderr += msg;
        });

        ffmpeg.on('error', (error) => {
            reject(new Error(`Failed to start FFmpeg: ${error.message}`));
        });

        ffmpeg.on('close', (code, signal) => {
            console.log('FFmpeg closed: ', { code, signal });
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`FFmpeg exited with code ${code}\n${stderr}`));
            }
        });
    });
};
