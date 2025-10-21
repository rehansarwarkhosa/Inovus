import { AppError } from '../utils/errors';
import { sendError } from '../utils/response';
import { env } from '../../env';

export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    sendError(res, err.message, err.statusCode);
    return;
  }

  // Log unexpected errors
  console.error('Unexpected error:', err);

  // Don't leak error details in production
  const message =
    env.APP_STAGE === 'production'
      ? 'Something went wrong'
      : err.message || 'Internal server error';

  sendError(res, message, 500);
}

export function notFoundHandler(req, res, next) {
  sendError(res, `Route ${req.originalUrl} not found`, 404);
}
