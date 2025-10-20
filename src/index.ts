import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import { env } from '../env';

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.get('/', (req, res) => {
   res.send(`Server running in ${env.APP_STAGE} mode`);
});

// Start server
app.listen(env.PORT, env.HOST, () => {
   console.log(`Server listening at http://${env.HOST}:${env.PORT}`);
});
