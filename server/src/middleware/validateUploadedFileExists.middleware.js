import fs from 'fs/promises';
import AppError from '../errors/AppError.js';
import { getUploadedFilePath } from '../utils/storage.util.js';

const validateUploadedFileExists = async (req, res, next) => {
    const { filename } = req.body;

    try {
        await fs.access(getUploadedFilePath(filename));
        return next();
    } catch {
        return next(new AppError('Uploaded video not found', 404));
    }
};

export default validateUploadedFileExists;
