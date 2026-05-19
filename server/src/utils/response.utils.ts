import { Response } from 'express';

interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

interface ErrorResponse {
  success: false;
  error: string;
  statusCode: number;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode = 200,
  message?: string
): void => {
  const response: SuccessResponse<T> = { success: true, data };
  if (message) response.message = message;
  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  error: string,
  statusCode = 500
): void => {
  const response: ErrorResponse = { success: false, error, statusCode };
  res.status(statusCode).json(response);
};
