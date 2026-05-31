import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/video`
});

export const uploadVideo = async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('video', file);

    const response = await api.post('/upload', formData, { onUploadProgress });
    return response.data.data;
};

export const compressVideo = async (clientId, filename) => {
    const response = await api.post('/compress', { clientId, filename });
    return response.data.data;
}

export const extractAudio = async (clientId, filename) => {
    const response = await api.post('/extract-audio', { clientId, filename });
    return response.data.data;
}

export const generateThumbnail = async (clientId, filename, timestamp) => {
    console.log('Sending Timestamp: ', timestamp);
    
    const response = await api.post('/thumbnail', { clientId, filename, timestamp });
    return response.data.data;
}

export const convertFormat = async (clientId, filename, format) => {
    const response = await api.post('/convert', { clientId, filename, format });
    return response.data.data;
}

export default api;