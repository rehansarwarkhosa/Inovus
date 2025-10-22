import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import env from '../env.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.middleware.js';
import { connectDB } from './config/database.js';
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

const startServer = async () => {
   try {
      await connectDB();
      await seedDatabase();

      app.listen(env.PORT, env.HOST, () => {
         console.log(`🚀 Server listening at http://${env.HOST}:${env.PORT}`);
         console.log(`📊 Environment: ${env.APP_STAGE}`);
      });
   } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
   }
};

startServer();
