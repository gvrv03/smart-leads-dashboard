import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
  } catch {
    console.error('Failed to connect to MongoDB. Server will start but DB operations will fail.');
  }

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });
};

startServer();
