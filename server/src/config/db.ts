import dns from 'dns';
import mongoose from 'mongoose';
import { env } from './env';

// Force Node.js to use Google DNS (8.8.8.8) instead of the system DNS
// This fixes networks (college/corporate) that block MongoDB Atlas SRV lookups
dns.setServers(['8.8.8.8', '8.8.4.4']);

export const connectDB = async (): Promise<void> => {
  try {
    const isAtlas = env.MONGODB_URI.includes('mongodb+srv');

    const conn = await mongoose.connect(env.MONGODB_URI);

    const host = conn.connection.host;
    const dbName = conn.connection.name;
    const mode = isAtlas ? 'Atlas (Cloud)' : 'Local / Compass';

    console.log(`MongoDB connected [${mode}]: ${host} | DB: ${dbName}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`MongoDB connection error: ${error.message}`);
      if (error.message.includes('ECONNREFUSED')) {
        console.error('Hint: Make sure MongoDB is running locally or check your Atlas URI.');
      }
      if (error.message.includes('authentication') || error.message.includes('Authentication')) {
        console.error('Hint: Verify your Atlas username/password and IP whitelist.');
      }
      if (error.message.includes('getaddrinfo') || error.message.includes('ENOTFOUND')) {
        console.error('Hint: Check your internet connection or Atlas cluster hostname.');
      }
    }
    console.error('Server will continue running but database operations will fail.');
  }
};
