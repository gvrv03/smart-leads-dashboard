import dns from 'dns';
import mongoose from 'mongoose';
import { User } from '../models/User.model';
import { env } from '../config/env';

// Force Google DNS for Atlas connectivity on restricted networks
dns.setServers(['8.8.8.8', '8.8.4.4']);

const ADMIN_USER = {
  name: 'Admin',
  email: 'admin@smartleads.com',
  password: 'admin123',
  role: 'admin' as const,
};

const createAdmin = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB.');

    const existingAdmin = await User.findOne({ email: ADMIN_USER.email });

    if (existingAdmin) {
      console.log('Admin user already exists:');
      console.log(`  Email: ${ADMIN_USER.email}`);
      console.log(`  Password: ${ADMIN_USER.password}`);
      console.log(`  Role: admin`);
    } else {
      await User.create(ADMIN_USER);
      console.log('Admin user created successfully:');
      console.log(`  Name: ${ADMIN_USER.name}`);
      console.log(`  Email: ${ADMIN_USER.email}`);
      console.log(`  Password: ${ADMIN_USER.password}`);
      console.log(`  Role: admin`);
    }

    console.log('\nYou can now login with these credentials.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating admin:', error.message);
    }
    process.exit(1);
  }
};

createAdmin();
