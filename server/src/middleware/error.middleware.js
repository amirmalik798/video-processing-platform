import multer from 'multer';

const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;

    if (error instanceof multer.MulterError) {
        console.log('Multer Error Encountered');
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(statusCode).json({
                success: false,
                message: error.message || 'Internal Server Error'
            });
        }
    }

    return res.status(statusCode).json({
        success: false,
        message: error.message || 'Internal Server Error'
    });
};

export default errorHandler;