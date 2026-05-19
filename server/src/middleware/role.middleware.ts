import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types/auth.types';
import { sendError } from '../utils/response.utils';

export const requireRole = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 'Authentication required.', 401);
      return;
    }

    if (!roles.includes(req.user.role)) {
      sendError(res, 'Insufficient permissions.', 403);
      return;
    }

    next();
  };
};
