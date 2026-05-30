import fs from 'fs/promises';
import path from 'path';
import * as videoService from '../services/video.service.js';
import { directories,
    getAudioFilePath, 
    getProcessedFilePath, 
    getThumbnailFilePath, 
    getUploadedFilePath } from '../utils/storage.util.js';
import AppError from '../errors/AppError.js';

const ALLOWED_FORMATS = [
    'mp4',
    'webm',
    'mov',
    'mkv'
];

export const uploadVideo = async (req, res, next) => {
    if (!req.file) {
        return next(new AppError('Unable to receive the uploaded video', 400));
    }
    
    return res.status(200).json({
        success: true,
        message: 'Video uploaded successfully',
        data: {
            filename: req.file.filename,
            originalname: req.file.originalname
        }
    });
};

export const compressVideo = async (req, res, next) => {
    const { clientId, filename } = req.body;

    const inputPath = getUploadedFilePath(filename);
    const outputFilename = `compressed-${filename}`;
    const outputPath = getProcessedFilePath(outputFilename);

    try {
        await videoService.compressVideo(clientId, inputPath, outputPath);
        return res.status(200).json({
            success: true,
            message: 'Video compressed successfully',
            data: {
                filename: outputFilename,
                type: 'processed'
            }
        });
    } catch(error) {
        return next(error);
    }
};

export const extractAudio = async (req, res, next) => {
    const { clientId, filename } = req.body;

    const inputPath = getUploadedFilePath(filename);
    const baseName = path.parse(filename).name;
    const outputFilename = `audio-${baseName}.mp3`;
    const outputPath = getAudioFilePath(outputFilename);

    try {
        await videoService.extractAudio(clientId, inputPath, outputPath);
        return res.status(200).json({
            success: true,
            message: 'Audio extracted successfully',
            data: {
                filename: outputFilename,
                type: 'audio'
            }
        });
    } catch(error) {
        return next(error);
    }
};


export const generateThumbnail = async (req, res, next) => {
    const { clientId, filename } = req.body;

    const inputPath = getUploadedFilePath(filename);
    const baseName = path.parse(filename).name;
    const outputFilename = `thumbnail-${baseName}.jpg`;
    const outputPath = getThumbnailFilePath(outputFilename);

    try {
        await videoService.generateThumbnail(clientId, inputPath, outputPath);
        return res.status(200).json({
            success: true,
            message: 'Thumbnail generated successfully',
            data: {
                filename: outputFilename,
                type: 'thumbnails'
            }
        });
    } catch(error) {
        return next(error);
    }
};


export const convertFormat = async (req, res, next) => {
    const { clientId, filename, format } = req.body;
    
    if (!ALLOWED_FORMATS.includes(format)) {
        return next(new AppError('Unsupported output format', 400));
    }

    const inputPath = getUploadedFilePath(filename);
    const baseName = path.parse(filename).name;
    const outputFilename = `converted-${baseName}.${format}`;
    const outputPath = getProcessedFilePath(outputFilename);

    try {
        await videoService.convertFormat(clientId, inputPath, outputPath);
        return res.status(200).json({
            success: true,
            message: 'Video format converted successfully',
            data: {
                filename: outputFilename,
                type: 'processed'
            }
        });
    } catch(error) {
        return next(error);
    }
};

export const downloadArtifact = async (req, res, next) => {
    const { type, filename } = req.params;

    const directory = directories[type];
    if (!directory) {
        return next(new AppError('Invalid artifact type', 400));
    }

    const filePath = path.join(directory, filename);

    try {
        await fs.access(filePath);
        return res.download(filePath, filename);
    } catch(error) {
        return next(new AppError('Requested file not found', 404));
    }
};