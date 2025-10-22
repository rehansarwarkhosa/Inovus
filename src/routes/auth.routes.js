import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import {
  signupValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  refreshTokenValidation,
} from '../validations/auth.validation.js';

const router = Router();

router.post('/signup', signupValidation, validate, authController.signup);
router.post('/login', loginValidation, validate, authController.login);
router.post('/forgot-password', forgotPasswordValidation, validate, authController.forgotPassword);
router.post('/reset-password', resetPasswordValidation, validate, authController.resetPassword);
router.post('/refresh', refreshTokenValidation, validate, authController.refreshToken);
router.get('/me', authenticate, authController.getCurrentUser);

export default router;
