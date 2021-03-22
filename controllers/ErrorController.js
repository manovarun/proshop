const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;

  const message = `Duplicate field value: ${value}. Please use another value!`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;

  return new AppError(message, 400);
};

const handleJsonWebTokenError = (err) => {
  let message;

  if (err.name === 'JsonWebTokenError') {
    message = `Invalid token. Please log in again!`;
  }

  if (err.name === 'TokenExpiredError') {
    message = `Your token has expired. Please log in again!`;
  }

  return new AppError(message, 401);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  err.status = err.status || 'error';

  let error = { ...err };

  error.stack = err.stack;

  error.message = err.message;

  if (err.name === 'CastError') error = handleCastErrorDB(error);
  if (err.code === 11000) error = handleDuplicateFieldsDB(error);
  if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError')
    error = handleJsonWebTokenError(error);

  res.status(err.statusCode).json({
    status: error.status,
    error: err,
    message: error.message,
    stack: error.stack,
  });
};
