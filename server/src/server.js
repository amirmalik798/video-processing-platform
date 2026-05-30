import app from './app.js';
import 'dotenv/config';
import { initializeStorage } from './utils/storage.util.js';

import { exec } from 'child_process';

exec('ffmpeg -version', (error, stdout, stderr) => {
    console.log('========== FFMPEG TEST ==========');

    if (error) {
        console.error('FFmpeg NOT FOUND');
        console.error(error);
        return;
    }

    console.log('FFmpeg FOUND');
    console.log(stdout);
});

const PORT = process.env.PORT || 3000;

try {
    console.log('Server initializing storage');
    await initializeStorage();
    console.log('Server storage initialized successfully');

    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch(error) {
    console.error('Error encountered while initializing storage');
    console.error(error);
    console.error('Unable to start server');
    process.exit(1);
}
