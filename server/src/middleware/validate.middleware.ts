import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendError } from '../utils/response.utils';

type ValidationTarget = 'body' | 'query' | 'params';

export const validate = (schema: ZodSchema, target: ValidationTarget = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = schema.parse(req[target]);
      req[target] = data;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.errors.map((e) => e.message).join(', ');
        sendError(res, messages, 400);
        return;
      }
      next(error);
    }
  };
};
