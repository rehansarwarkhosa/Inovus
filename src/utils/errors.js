const createError = (message, statusCode, isOperational = true) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = isOperational;
  return error;
};

const createValidationError = (message = 'Validation failed', errors = null) => {
  const error = createError(message, 400);
  if (errors) {
    error.errors = errors;
  }
  return error;
};

const createUnauthorizedError = (message = 'Unauthorized access') => {
  return createError(message, 401);
};

const createForbiddenError = (message = 'Forbidden access') => {
  return createError(message, 403);
};

const createNotFoundError = (message = 'Resource not found') => {
  return createError(message, 404);
};

const createConflictError = (message = 'Resource already exists') => {
  return createError(message, 409);
};

const createInternalServerError = (message = 'Internal server error') => {
  return createError(message, 500);
};

export {
  createError,
  createValidationError,
  createUnauthorizedError,
  createForbiddenError,
  createNotFoundError,
  createConflictError,
  createInternalServerError
};
