import { Router } from 'express';
import { z } from 'zod';
import userController from '../controllers/user.controller';
import { validateParams, validateBody } from '../middleware/validation.middleware';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// Validation schemas
const mongoIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID'),
});

const updateUserSchema = z.object({
  name: z.string().trim().min(1, 'Name cannot be empty').optional(),
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});

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
router.get('/:id', validateParams(mongoIdSchema), authenticate, userController.getUserById);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user profile
 * @access  Protected
 */
router.put(
  '/:id',
  validateParams(mongoIdSchema),
  validateBody(updateUserSchema),
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
  validateParams(mongoIdSchema),
  authenticate,
  authorize('admin'),
  userController.deleteUser
);

export default router;
