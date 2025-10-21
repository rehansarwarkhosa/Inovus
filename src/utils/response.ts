import { Response } from 'express';

interface SuccessResponse {
  success: true;
  message?: string;
  data?: any;
}

interface ErrorResponse {
  success: false;
  message: string;
  errors?: any;
}

export const sendSuccess = (
  res: Response,
  data?: any,
  message?: string,
  statusCode: number = 200
): Response => {
  const response: SuccessResponse = {
    success: true,
  };

  if (message) response.message = message;
  if (data !== undefined) response.data = data;

  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  errors?: any
): Response => {
  const response: ErrorResponse = {
    success: false,
    message,
  };

  if (errors) response.errors = errors;

  return res.status(statusCode).json(response);
};
