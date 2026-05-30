import express from 'express';
import * as videoController from '../controllers/video.controller.js';
import upload from '../config/multer.config.js';
import validateClientId from '../middleware/validateClientId.middleware.js';
import validateFilename from '../middleware/validateFilename.middleware.js';
import validateUploadedFileExists from '../middleware/validateUploadedFileExists.middleware.js';

const router = express.Router();

const validateVideoOperation = [
    validateClientId,
    validateFilename,
    validateUploadedFileExists
];

// Upload 
router.post('/upload', 
    upload.single('video'), 
    videoController.uploadVideo);

// Operations
router.post('/compress',
    validateVideoOperation,
    videoController.compressVideo);

router.post('/thumbnail', 
    validateVideoOperation,
    videoController.generateThumbnail);

router.post('/extract-audio',
    validateVideoOperation,
    videoController.extractAudio);

router.post('/convert', 
    validateVideoOperation,
    videoController.convertFormat);

// Downloads
router.get('/download/:type/:filename', 
    videoController.downloadArtifact);

export default router;