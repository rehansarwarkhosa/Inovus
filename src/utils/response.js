const sendSuccess = (res, data, message, statusCode = 200) => {
  const response = { success: true };

  if (message) response.message = message;
  if (data !== undefined) response.data = data;

  return res.status(statusCode).json(response);
};

const sendError = (res, message, statusCode = 500, errors) => {
  const response = {
    success: false,
    message,
  };

  if (errors) response.errors = errors;

  return res.status(statusCode).json(response);
};

export {
  sendSuccess,
  sendError
};
