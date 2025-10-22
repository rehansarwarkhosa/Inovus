import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import {
  getUserByIdValidation,
  updateUserValidation,
  deleteUserValidation,
} from '../validations/user.validation.js';

const router = Router();

router.get('/', authenticate, authorize('admin'), userController.getAllUsers);
router.get('/:id', getUserByIdValidation, validate, authenticate, userController.getUserById);
router.put('/:id', updateUserValidation, validate, authenticate, userController.updateUser);
router.delete('/:id', deleteUserValidation, validate, authenticate, authorize('admin'), userController.deleteUser);

export default router;
