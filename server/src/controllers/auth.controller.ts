import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.model';
import { generateToken } from '../utils/jwt.utils';
import { sendSuccess, sendError } from '../utils/response.utils';
import { IRegisterDTO, ILoginDTO } from '../types/auth.types';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body as IRegisterDTO;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      sendError(res, 'User with this email already exists.', 409);
      return;
    }

    // Only sales role can be created via registration
    // Admin accounts are created via the seed script
    const user = await User.create({ name, email, password, role: 'sales' });

    const userResponse = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(userResponse);

    sendSuccess(res, { token, user: userResponse }, 201, 'User registered successfully.');
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body as ILoginDTO;

    const user = await User.findOne({ email });
    if (!user) {
      sendError(res, 'Invalid email or password.', 401);
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      sendError(res, 'Invalid email or password.', 401);
      return;
    }

    const userResponse = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(userResponse);

    sendSuccess(res, { token, user: userResponse }, 200, 'Login successful.');
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 'Not authenticated.', 401);
      return;
    }

    sendSuccess(res, req.user);
  } catch (error) {
    next(error);
  }
};
