import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import { sendSuccess } from '../utils/response';
import { NotFoundError } from '../utils/errors';

export class UserController {
  /**
   * GET /api/users
   * Get all users (example protected route)
   */
  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await User.find({ isDeleted: false })
        .select('-password')
        .populate('role');

      sendSuccess(res, { users, count: users.length });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/users/:id
   * Get user by ID
   */
  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const user = await User.findOne({ _id: id, isDeleted: false })
        .select('-password')
        .populate('role');

      if (!user) {
        throw new NotFoundError('User not found');
      }

      sendSuccess(res, { user });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/users/:id
   * Update user profile
   */
  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { name, firstName, lastName } = req.body;

      const user = await User.findOne({ _id: id, isDeleted: false });

      if (!user) {
        throw new NotFoundError('User not found');
      }

      // Update fields
      if (name) user.name = name;
      if (firstName !== undefined) user.firstName = firstName;
      if (lastName !== undefined) user.lastName = lastName;

      await user.save();

      sendSuccess(res, { user }, 'User updated successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/users/:id
   * Soft delete user
   */
  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const user = await User.findOne({ _id: id, isDeleted: false });

      if (!user) {
        throw new NotFoundError('User not found');
      }

      user.isDeleted = true;
      await user.save();

      sendSuccess(res, null, 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
