import { sendError } from '../utils/response.js';
import env from '../../env.js';

function errorHandler(err, req, res, next) {
  // Check if error has statusCode (operational error)
  if (err.statusCode && err.isOperational) {
    sendError(res, err.message, err.statusCode, err.errors);
    return;
  }

  console.error('Unexpected error:', err);

  const message =
    env.APP_STAGE === 'production'
      ? 'Something went wrong'
      : err.message || 'Internal server error';

  sendError(res, message, 500);
}

function notFoundHandler(req, res, next) {
  sendError(res, `Route ${req.originalUrl} not found`, 404);
}

export {
  errorHandler,
  notFoundHandler
};
