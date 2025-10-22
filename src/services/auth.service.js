import { User, Email, Phone } from '../models/index.js';
import {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
  ValidationError,
} from '../utils/errors.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

async function signup(data) {
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

async function login(data) {
  const { email, password } = data;

  const emailRecord = await Email.findOne({
    email: email.toLowerCase(),
  }).populate('userId');

  if (!emailRecord || !emailRecord.userId) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const user = emailRecord.userId;

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

async function forgotPassword(email) {
  const emailRecord = await Email.findOne({
    email: email.toLowerCase(),
  }).populate('userId');

  if (!emailRecord || !emailRecord.userId) {
    return {
      message: 'If the email exists, a password reset link has been sent',
    };
  }

  const user = emailRecord.userId;

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

async function resetPassword(token, newPassword) {
  throw new Error('Password reset not yet implemented');
}

async function refreshAccessToken(refreshToken) {
  try {
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

export {
  signup,
  login,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
};
