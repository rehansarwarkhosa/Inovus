import { Router } from 'express';
import { param, body } from 'express-validator';
import * as userController from '../controllers/user.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, authorize('admin'), userController.getAllUsers);

router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid user ID'),
  validate
], authenticate, userController.getUserById);

router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('firstName').optional().trim(),
  body('lastName').optional().trim(),
  validate
], authenticate, userController.updateUser);

router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid user ID'),
  validate
], authenticate, authorize('admin'), userController.deleteUser);

export default router;
