import { validationResult } from 'express-validator';
import { createValidationError } from '../utils/errors.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => ({
      field: err.path || err.param,
      message: err.msg
    }));
    return next(createValidationError('Validation failed', errorMessages));
  }
  next();
};
