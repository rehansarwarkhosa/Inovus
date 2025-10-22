import { body } from 'express-validator';

export const signupValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('firstName').optional().trim(),
  body('lastName').optional().trim(),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const forgotPasswordValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
];

export const resetPasswordValidation = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
];

export const refreshTokenValidation = [
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
];
