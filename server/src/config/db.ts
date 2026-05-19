import dns from 'dns';
import mongoose from 'mongoose';
import { env } from './env';

// Force Node.js to use Google DNS (8.8.8.8) instead of the system DNS
// This fixes networks (college/corporate) that block MongoDB Atlas SRV lookups
dns.setServers(['8.8.8.8', '8.8.4.4']);

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log('MongoDB already connected.');
    return;
  }

  try {
    const isAtlas = env.MONGODB_URI.includes('mongodb+srv');

    mongoose.set('bufferCommands', false);

    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
      maxPoolSize: 10,
    });

    isConnected = true;

    const host = conn.connection.host;
    const dbName = conn.connection.name;
    const mode = isAtlas ? 'Atlas (Cloud)' : 'Local / Compass';

    console.log(`MongoDB connected [${mode}]: ${host} | DB: ${dbName}`);
  } catch (error) {
    isConnected = false;
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
      if (error.message.includes('timed out')) {
        console.error('Hint: Check Atlas Network Access — add 0.0.0.0/0 to allow all IPs (required for Vercel).');
      }
    }
    throw error;
  }
};
