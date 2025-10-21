import { Router } from 'express';
import { body, param } from 'express-validator';
import userController from '../controllers/user.controller';
import { validate } from '../middleware/validation.middleware';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

/**
 * All routes in this file are protected
 * They require authentication middleware
 */

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Protected (Admin only)
 */
router.get('/', authenticate, authorize('admin'), userController.getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Protected
 */
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid user ID'), validate],
  authenticate,
  userController.getUserById
);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user profile
 * @access  Protected
 */
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('firstName').optional().trim(),
    body('lastName').optional().trim(),
    validate,
  ],
  authenticate,
  userController.updateUser
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Soft delete user
 * @access  Protected (Admin only)
 */
router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid user ID'), validate],
  authenticate,
  authorize('admin'),
  userController.deleteUser
);

export default router;
