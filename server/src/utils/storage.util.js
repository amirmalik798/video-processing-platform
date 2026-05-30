import fs from 'fs/promises';
import path from 'path';

export const directories = {
    storage: path.resolve(
        process.env.STORAGE_DIR || 'storage'
    ),

    uploads: path.resolve(
        process.env.UPLOADS_DIR || 'storage/uploads'
    ),

    processed: path.resolve(
        process.env.PROCESSED_DIR || 'storage/processed'
    ),

    thumbnails: path.resolve(
        process.env.THUMBNAILS_DIR || 'storage/thumbnails'
    ),

    audio: path.resolve(
        process.env.AUDIO_DIR || 'storage/audio'
    ),
};

export const initializeStorage = async () => {    
    for (const directory of Object.values(directories)) {
        await fs.mkdir(directory, { recursive: true });
    }
};

export const getUploadedFilePath = (filename) => {
    return path.join(directories.uploads, filename);
};

export const getProcessedFilePath = (filename) => {
    return path.join(directories.processed, filename);
};

export const getAudioFilePath = (filename) => {
    return path.join(directories.audio, filename);
};

export const getThumbnailFilePath = (filename) => {
    return path.join(directories.thumbnails, filename);
};