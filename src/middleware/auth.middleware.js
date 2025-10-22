import { verifyAccessToken } from '../utils/jwt';
import { UnauthorizedError } from '../utils/errors';

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.substring(7);

    const decoded = verifyAccessToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      next(error);
    } else {
      next(new UnauthorizedError('Invalid or expired token'));
    }
  }
}

function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      next(new UnauthorizedError('User not authenticated'));
      return;
    }

    if (allowedRoles.length && !allowedRoles.includes(req.user.role || '')) {
      next(new UnauthorizedError('Insufficient permissions'));
      return;
    }

    next();
  };
}

export {
  authenticate,
  authorize
};
