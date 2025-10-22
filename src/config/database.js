import mongoose from 'mongoose';
import env from '../../env.js';

const connectDB = async () => {
   try {
      await mongoose.connect(env.DATABASE_URL, {
         minPoolSize: env.DATABASE_POOL_MIN,
         maxPoolSize: env.DATABASE_POOL_MAX,
      });
      console.log(' MongoDB connected successfully');
      return true;
   } catch (error) {
      console.error(' MongoDB connection error:', error);
      throw error;
   }
};

const disconnectDB = async () => {
   try {
      await mongoose.disconnect();
      console.log(' MongoDB disconnected successfully');
   } catch (error) {
      console.error(' MongoDB disconnect error:', error);
      throw error;
   }
};

export { connectDB, disconnectDB };
