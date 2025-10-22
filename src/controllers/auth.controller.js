import * as authService from '../services/auth.service.js';
import { sendSuccess } from '../utils/response.js';

async function signup(req, res, next) {
  try {
    const { name, email, phone, password, firstName, lastName } = req.body;

    const result = await authService.signup({
      name,
      email,
      phone,
      password,
      firstName,
      lastName,
    });

    sendSuccess(res, result, 'User registered successfully', 201);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await authService.login({ email, password });

    sendSuccess(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
}

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;

    const result = await authService.forgotPassword(email);

    sendSuccess(res, null, result.message);
  } catch (error) {
    next(error);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { token, newPassword } = req.body;

    const result = await authService.resetPassword(token, newPassword);

    sendSuccess(res, null, result.message);
  } catch (error) {
    next(error);
  }
}

async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;

    const result = await authService.refreshAccessToken(refreshToken);

    sendSuccess(res, result, 'Token refreshed successfully');
  } catch (error) {
    next(error);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    sendSuccess(res, { user: req.user }, 'User retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export {
  signup,
  login,
  forgotPassword,
  resetPassword,
  refreshToken,
  getCurrentUser,
};
