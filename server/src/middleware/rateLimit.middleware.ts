import rateLimit from 'express-rate-limit';

// General API rate limit: 100 requests per 15 minutes
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    error: 'Too many requests. Please try again later.',
    statusCode: 429,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth rate limit: 10 attempts per 15 minutes (stricter for login/register)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    error: 'Too many authentication attempts. Please try again after 15 minutes.',
    statusCode: 429,
  },
  standardHeaders: true,
  legacyHeaders: false,
});
