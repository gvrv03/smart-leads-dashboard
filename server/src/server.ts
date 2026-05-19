import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

const startServer = async (): Promise<void> => {
  // Start Express server first so port is available
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });

  // Then connect to MongoDB
  await connectDB();
};

startServer();
