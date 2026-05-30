import { spawn } from 'child_process';

export const getVideoDuration = async (filePath) => {
    return new Promise((resolve, reject) => {
        
        const args = [
            '-v',
            'error',
            '-show_entries',
            'format=duration',
            '-of',
            'default=noprint_wrappers=1:nokey=1',
            filePath
        ];

        const ffprobe = spawn('ffprobe', args);
        
        let stdout = '';
        let stderr = '';

        ffprobe.stdout.on('data', (chunk) => {
            stdout += chunk.toString();
        });

        ffprobe.stderr.on('data', (chunk) => {
            stderr += chunk.toString();
        });

        ffprobe.on('error', (error) => {
            reject(new Error(`FFprobe execution failed: ${error.message}`));
        });

        ffprobe.on('close', (code) => {
            if (code === 0) {
                return resolve(Number(stdout.trim()));
            }
            reject(new Error(`FFprobe failed with code: ${code}\n${stderr}`));
        });
    });
};