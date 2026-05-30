import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { directories } from '../utils/storage.util.js';
import AppError from '../errors/AppError.js';

const MAX_FILE_SIZE = 500 * 1024 * 1024;

const ALLOWED_MIME_TYPES = [
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'video/x-matroska'
];

const fileFilter = (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(null, true);
    }
    
    return cb(new AppError(`Unsupported file type: ${file.mimetype}`, 400));
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, directories.uploads);
    },

    filename: (req, file, cb) => {
        // Preserve original file extension
        const uniqueName = `${crypto.randomUUID()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE
    }
});

export default upload;