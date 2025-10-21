import { User } from '../models';
import { sendSuccess } from '../utils/response';
import { NotFoundError } from '../utils/errors';

/**
 * GET /api/users
 * Get all users
 */
async function getAllUsers(req, res, next) {
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
async function getUserById(req, res, next) {
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
async function updateUser(req, res, next) {
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
async function deleteUser(req, res, next) {
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

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
