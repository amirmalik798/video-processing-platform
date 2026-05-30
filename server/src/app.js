import express from 'express';
import cors from 'cors';
import sseRoutes from './routes/sse.routes.js';
import videoRoutes from './routes/video.routes.js';
import errorHandler from './middleware/error.middleware.js';
import AppError from './errors/AppError.js';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'ok'
    });
});

app.get('/api/version', (req, res) => {
    res.status(200).json({
        success: true,
        version: '1.0.0'
    });
});

app.use('/api/sse', sseRoutes);
app.use('/api/video', videoRoutes);

app.use((req, res, next) => {
    return next(new AppError('Route not found', 404));
});

app.use(errorHandler);

export default app;