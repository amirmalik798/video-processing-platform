import AppError from '../errors/AppError.js';

const validateFilename = (req, res, next) => {
    const { filename } = req.body;

    if (!filename) {
        return next(new AppError('filename is required', 400));
    }

    next();
};

export default validateFilename;