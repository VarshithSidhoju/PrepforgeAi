const logger = require('../config/logger');
const env = require('../config/env');

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

function globalErrorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Something went wrong';

  logger.error(err.message, {
    statusCode,
    path: req.originalUrl,
    method: req.method,
    stack: env.nodeEnv === 'development' ? err.stack : undefined,
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.nodeEnv === 'development' && { stack: err.stack }),
  });
}

module.exports = { AppError, globalErrorHandler };