import { validationResult } from 'express-validator';
import { HTTP_STATUS } from '../config/constants.js';

/**
 * Validation Middleware
 * Handles express-validator results
 */

/**
 * Validate request based on express-validator rules
 */
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path || error.param,
        message: error.msg
      }))
    });
  }

  next();
};

export default {
  validateRequest
};
