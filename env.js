import dotenv from 'dotenv';

process.env.APP_STAGE = process.env.APP_STAGE || 'dev';

const isProduction = process.env.APP_STAGE === 'production';
const isDevelopment = process.env.APP_STAGE === 'dev';
const isTest = process.env.APP_STAGE === 'test';

if (isDevelopment) {
   dotenv.config({ path: '.env' });
   console.log('✓ Loaded .env (development)');
} else if (isTest) {
   dotenv.config({ path: '.env.test' });
   console.log('✓ Loaded .env.test (testing)');
} else if (isProduction) {
   console.log('✓ Using production environment variables');
}

const validateEnv = () => {
   const required = ['DATABASE_URL', 'JWT_SECRET'];
   const missing = required.filter(key => !process.env[key]);

   if (missing.length > 0) {
      console.error('❌ Missing required environment variables:', missing.join(', '));
      process.exit(1);
   }

   if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
      console.error('❌ JWT_SECRET must be at least 32 characters');
      process.exit(1);
   }

   if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('mongodb')) {
      console.error('❌ DATABASE_URL must be a MongoDB connection string');
      process.exit(1);
   }
};

validateEnv();

const env = {
   NODE_ENV: process.env.NODE_ENV || 'development',
   APP_STAGE: process.env.APP_STAGE || 'dev',

   PORT: parseInt(process.env.PORT) || 3000,
   HOST: process.env.HOST || 'localhost',

   DATABASE_URL: process.env.DATABASE_URL,
   DATABASE_POOL_MIN: parseInt(process.env.DATABASE_POOL_MIN) || 2,
   DATABASE_POOL_MAX: parseInt(process.env.DATABASE_POOL_MAX) || 10,

   JWT_SECRET: process.env.JWT_SECRET,
   JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
   REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
   REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',

   BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 12,

   CORS_ORIGIN: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
      : [],

   LOG_LEVEL: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
};

export const isProd = () => env.APP_STAGE === 'production';
export const isDev = () => env.APP_STAGE === 'dev';
export const isTestEnv = () => env.APP_STAGE === 'test';

export default env;
