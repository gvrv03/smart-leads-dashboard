import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { IUser } from '../types/auth.types';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (user: IUser): string => {
  const payload: JwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  // expiresIn expects a specific StringValue type in newer @types/jsonwebtoken
  // Using the numeric equivalent (7 days in seconds) for type safety
  const expiresInSeconds = 7 * 24 * 60 * 60; // 7 days
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: expiresInSeconds });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};
