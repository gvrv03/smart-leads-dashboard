import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import { User } from '../models/User.model';
import { sendError } from '../utils/response.utils';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      sendError(res, 'Access denied. No token provided.', 401);
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      sendError(res, 'User not found.', 401);
      return;
    }

    req.user = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    sendError(res, 'Invalid or expired token.', 401);
  }
};
