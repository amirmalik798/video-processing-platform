import { useState, useEffect } from "react";
import { uploadVideo, compressVideo, extractAudio, generateThumbnail, convertFormat } from "../api/api";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const buildDownloadUrl = (data) => {
    const finalName = data.filename;
    const type = data.type;
    return `${BACKEND_URL}/api/video/download/${type}/${finalName}`
};

export const STATES = {
    IDLE: 'IDLE',
    UPLOADING: 'UPLOADING',
    UPLOADED: 'UPLOADED',
    PROCESSING: 'PROCESSING',
    READY: 'READY',
    ERROR: 'ERROR'
};

export const useVideoProcessor = () => {
    const [file, setFile] = useState(null);
    const [clientId, setClientId] = useState('');
    const [filename, setFilename] = useState('');
    const [progress, setProgress] = useState(0);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadUrl, setDownloadUrl] = useState('');

    const [state, setState] = useState(STATES.IDLE);
    const [error, setError] = useState('');

    const [previewUrl, setPreviewUrl] = useState('');

    const [lastOperation, setLastOperation] = useState('');
    const [operation, setOperation] = useState('');

    const [selectedOperation, setSelectedOperation] = useState('compress');

    const [targetFormat, setTargetFormat] = useState('mov');
    const [thumbnailTime, setThumbnailTime] = useState(0);

    const clearFile = () => {
        setFile(null);
        setPreviewUrl('');
        setUploadProgress(0);
    }

    const reset = () => {
        setError('');
        setFile(null);
        setFilename('');
        setProgress(0);
        setDownloadUrl('');
        setState(STATES.IDLE);
        setPreviewUrl('');
        setUploadProgress(0);
        setOperation('');
        setLastOperation('');
    };

    useEffect(() => {
        const eventSource = new EventSource(`${BACKEND_URL}/api/sse/events`);

        eventSource.addEventListener('connected', (event) => {
            const data = JSON.parse(event.data);
            setClientId(data.clientId);
        });

        eventSource.addEventListener('progress', (event) => {
            const data = JSON.parse(event.data);
            setProgress(data.progress);
        });

        return () => {
            eventSource.close();
        }
    }, []);

    useEffect(() => {
        if (!file) {
            setPreviewUrl('');
            return;
        }

        const url = URL.createObjectURL(file);

        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        }
    }, [file]);

    const handleUploadVideo = async () => {
        try {
            setError('');
            setUploadProgress(0);
            setState(STATES.UPLOADING);
            const data = await uploadVideo(file, (progressEvent) => {
                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percent);
            });
            setFilename(data.filename);
            setState(STATES.UPLOADED);
            setUploadProgress(100);
        } catch(error) {
            setError(error.response?.data?.message || error.message || 'Something went wrong');
            setState(STATES.ERROR);
        }
        
    } 

    const processVideo = async (operation, successMsg) => {
        try {
            setError('');
            setProgress(0);
            setDownloadUrl('');
            setState(STATES.PROCESSING);

            const data = await operation();

            setDownloadUrl(buildDownloadUrl(data));
            setLastOperation(successMsg);
            setOperation('');
            setState(STATES.READY);
        } catch(error) {
            setError(error.response?.data?.message || error.message || 'Something went wrong');
            setState(STATES.ERROR);
        }
    }

    const handleCompressVideo = async () => {
        setOperation('Compressing Video...');
        setLastOperation('');
        await processVideo(() => compressVideo(clientId, filename), 'Video Compressed');
    }

    const handleExtractAudio = async () => {
        setOperation('Extracting Audio...');
        setLastOperation('');
        await processVideo(() => extractAudio(clientId, filename), 'Audio Extracted');
    }

    const handleGenerateThumbnail = async () => {
        setOperation('Generating Thumbnail...');
        setLastOperation('');
        await processVideo(() => generateThumbnail(clientId, filename, thumbnailTime), 'Thumbnail Generated');
    }

    const handleConvertFormat = async () => {
        setOperation('Converting Video...');
        setLastOperation('');
        await processVideo(() => convertFormat(clientId, filename, targetFormat),  'Format Converted');
    }

    // FLAGS
    const isFileSelected = !!file;
    const isUploading = state === STATES.UPLOADING;
    const isUploaded = state === STATES.UPLOADED;
    const isProcessing = state === STATES.PROCESSING;
    const isReady = state === STATES.READY;
    const isError = state === STATES.ERROR;
    
    const canProcess = state === STATES.UPLOADED || state === STATES.READY;
    const canUpload = isFileSelected && !isUploaded && !isUploading && !isReady && !isProcessing;

    return {
        isFileSelected,
        isUploading,
        isUploaded,
        isProcessing,
        isReady,
        isError,
        canProcess,
        canUpload,

        operation,
        lastOperation,
        state,
        error,
        file,
        setFile,
        clientId,
        progress,
        uploadProgress,
        filename,
        downloadUrl,
        handleUploadVideo,
        handleCompressVideo,
        handleExtractAudio,
        handleGenerateThumbnail,
        handleConvertFormat,
        reset,
        previewUrl,
        clearFile,

        selectedOperation,
        setSelectedOperation,

        targetFormat,
        setTargetFormat,
        thumbnailTime,
        setThumbnailTime
    };
}

