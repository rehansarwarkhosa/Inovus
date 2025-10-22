import { body, param } from 'express-validator';

export const getUserByIdValidation = [
  param('id').isMongoId().withMessage('Invalid user ID'),
];

export const updateUserValidation = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('firstName').optional().trim(),
  body('lastName').optional().trim(),
];

export const deleteUserValidation = [
  param('id').isMongoId().withMessage('Invalid user ID'),
];
