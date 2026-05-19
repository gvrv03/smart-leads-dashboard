import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import { errorHandler } from './middleware/error.middleware';
import { generalLimiter, authLimiter } from './middleware/rateLimit.middleware';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use('/api/auth', authLimiter);
app.use('/api', generalLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ success: true, data: { status: 'OK' } });
});

// Centralized error handler
app.use(errorHandler);

export default app;
