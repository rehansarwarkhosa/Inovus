import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import { env } from '../env';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.middleware';

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));

// Root route
app.get('/', (req, res) => {
   res.send(`Server running in ${env.APP_STAGE} mode`);
});

// API Routes
app.use('/api', routes);

// Error handling (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Database connection
const connectDB = async () => {
   try {
      await mongoose.connect(env.DATABASE_URL, {
         minPoolSize: env.DATABASE_POOL_MIN,
         maxPoolSize: env.DATABASE_POOL_MAX,
      });
      console.log('MongoDB connected successfully');
   } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
   }
};

// Start server
const startServer = async () => {
   await connectDB();

   app.listen(env.PORT, env.HOST, () => {
      console.log(`Server listening at http://${env.HOST}:${env.PORT}`);
   });
};

startServer();
