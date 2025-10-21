import { User, IUser, Email, Phone } from '../models';
import {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
  ValidationError,
} from '../utils/errors';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
  };
  accessToken: string;
  refreshToken: string;
}

/**
 * Register a new user with email and phone
 */
async function signup(data: SignupData): Promise<AuthResponse> {
  const { name, email, phone, password, firstName, lastName } = data;

  // Check if email already exists
  const existingEmail = await Email.findOne({ email: email.toLowerCase() });
  if (existingEmail) {
    throw new ConflictError('Email already registered');
  }

  // Check if phone already exists
  const existingPhone = await Phone.findOne({ phone });
  if (existingPhone) {
    throw new ConflictError('Phone number already registered');
  }

  // Create user
  const user = await User.create({
    name,
    firstName,
    lastName,
    password, // Will be hashed by pre-save hook
  });

  // Create email record
  await Email.create({
    userId: user._id,
    email: email.toLowerCase(),
    isPrimary: true,
    isVerified: false,
  });

  // Create phone record
  await Phone.create({
    userId: user._id,
    phone,
    isPrimary: true,
    isVerified: false,
  });

  // Generate tokens
  const tokenPayload = {
    userId: user._id.toString(),
    email: email.toLowerCase(),
    role: user.role?.toString(),
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: email.toLowerCase(),
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role?.toString(),
    },
    accessToken,
    refreshToken,
  };
}

/**
 * Login user with email and password
 */
async function login(data: LoginData): Promise<AuthResponse> {
  const { email, password } = data;

  // Find email record
  const emailRecord = await Email.findOne({
    email: email.toLowerCase(),
  }).populate<{ userId: IUser }>('userId');

  if (!emailRecord || !emailRecord.userId) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const user = emailRecord.userId as IUser;

  // Check if user is deleted
  if (user.isDeleted) {
    throw new UnauthorizedError('Account has been deactivated');
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid email or password');
  }

  // Generate tokens
  const tokenPayload = {
    userId: user._id.toString(),
    email: email.toLowerCase(),
    role: user.role?.toString(),
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: email.toLowerCase(),
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role?.toString(),
    },
    accessToken,
    refreshToken,
  };
}

/**
 * Request password reset
 * TODO: Integrate with Twilio/SendGrid to send reset token via email/SMS
 */
async function forgotPassword(email: string): Promise<{ message: string }> {
  // Find email record
  const emailRecord = await Email.findOne({
    email: email.toLowerCase(),
  }).populate<{ userId: IUser }>('userId');

  // Don't reveal if email exists or not (security best practice)
  if (!emailRecord || !emailRecord.userId) {
    return {
      message: 'If the email exists, a password reset link has been sent',
    };
  }

  const user = emailRecord.userId as IUser;

  if (user.isDeleted) {
    return {
      message: 'If the email exists, a password reset link has been sent',
    };
  }

  // TODO: Generate password reset token and send via email/SMS
  console.log(`Password reset requested for user: ${user._id}`);

  return {
    message: 'If the email exists, a password reset link has been sent',
  };
}

/**
 * Reset password with token
 * TODO: Implement after Twilio/SendGrid integration
 */
async function resetPassword(
  token: string,
  newPassword: string
): Promise<{ message: string }> {
  // TODO: Verify reset token and update password
  throw new Error('Password reset not yet implemented');
}

/**
 * Refresh access token using refresh token
 */
async function refreshAccessToken(refreshToken: string): Promise<{
  accessToken: string;
}> {
  try {
    const { verifyRefreshToken } = require('../utils/jwt');
    const decoded = verifyRefreshToken(refreshToken);

    // Verify user still exists and is active
    const user = await User.findById(decoded.userId);
    if (!user || user.isDeleted) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    // Generate new access token
    const tokenPayload = {
      userId: user._id.toString(),
      email: decoded.email,
      role: user.role?.toString(),
    };

    const accessToken = generateAccessToken(tokenPayload);

    return { accessToken };
  } catch (error) {
    throw new UnauthorizedError('Invalid or expired refresh token');
  }
}

export default {
  signup,
  login,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
};
