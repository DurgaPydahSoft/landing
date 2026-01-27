import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants.js';

/**
 * Error Handling Middleware
 * Centralized error handling for the application
 */

/**
 * Global error handler
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let status = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || ERROR_MESSAGES.INTERNAL_ERROR;

  // Handle specific error types
  if (err.name === 'ValidationError') {
    status = HTTP_STATUS.BAD_REQUEST;
    message = 'Validation error';
  } else if (err.name === 'JsonWebTokenError') {
    status = HTTP_STATUS.UNAUTHORIZED;
    message = ERROR_MESSAGES.INVALID_TOKEN;
  } else if (err.name === 'TokenExpiredError') {
    status = HTTP_STATUS.UNAUTHORIZED;
    message = 'Token has expired';
  } else if (err.name === 'CastError') {
    status = HTTP_STATUS.BAD_REQUEST;
    message = 'Invalid ID format';
  }

  // Send error response
  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Async error wrapper
 * Wraps async route handlers to catch errors
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default {
  errorHandler,
  asyncHandler
};
