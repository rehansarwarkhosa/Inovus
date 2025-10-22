import { User } from '../models/index.js';
import { sendSuccess } from '../utils/response.js';
import { createNotFoundError } from '../utils/errors.js';

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

async function getUserById(req, res, next) {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id, isDeleted: false })
      .select('-password')
      .populate('role');

    if (!user) {
      throw createNotFoundError('User not found');
    }

    sendSuccess(res, { user });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { name, firstName, lastName } = req.body;

    const user = await User.findOne({ _id: id, isDeleted: false });

    if (!user) {
      throw createNotFoundError('User not found');
    }

    if (name) user.name = name;
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;

    await user.save();

    sendSuccess(res, { user }, 'User updated successfully');
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id, isDeleted: false });

    if (!user) {
      throw createNotFoundError('User not found');
    }

    user.isDeleted = true;
    await user.save();

    sendSuccess(res, null, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
}

export {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
