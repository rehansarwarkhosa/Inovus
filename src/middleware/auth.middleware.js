import { verifyAccessToken } from '../utils/jwt.js';
import { createUnauthorizedError } from '../utils/errors.js';

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createUnauthorizedError('No token provided');
    }

    const token = authHeader.substring(7);

    const decoded = verifyAccessToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.statusCode === 401) {
      next(error);
    } else {
      next(createUnauthorizedError('Invalid or expired token'));
    }
  }
}

function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      next(createUnauthorizedError('User not authenticated'));
      return;
    }

    if (allowedRoles.length && !allowedRoles.includes(req.user.role || '')) {
      next(createUnauthorizedError('Insufficient permissions'));
      return;
    }

    next();
  };
}

export {
  authenticate,
  authorize
};
