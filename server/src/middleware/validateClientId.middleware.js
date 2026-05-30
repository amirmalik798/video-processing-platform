import AppError from "../errors/AppError.js";

const validateClientId = (req, res, next) => {
    const { clientId } = req.body;

    if (!clientId) {
        return next(new AppError('clientId is required', 400));
    }

    next();
};

export default validateClientId;