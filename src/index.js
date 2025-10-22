import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import env from '../env.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.middleware.js';
import seedDatabase from './seeders/seedDatabase.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));

app.get('/', (req, res) => {
   res.send(`Server running in ${env.APP_STAGE} mode`);
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

const connectDB = async () => {
   try {
      await mongoose.connect(env.DATABASE_URL, {
         minPoolSize: env.DATABASE_POOL_MIN,
         maxPoolSize: env.DATABASE_POOL_MAX,
      });
      console.log('✅ MongoDB connected successfully');

      await seedDatabase();
   } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      process.exit(1);
   }
};

const startServer = async () => {
   await connectDB();

   app.listen(env.PORT, env.HOST, () => {
      console.log(`🚀 Server listening at http://${env.HOST}:${env.PORT}`);
      console.log(`📊 Environment: ${env.APP_STAGE}`);
   });
};

startServer();
