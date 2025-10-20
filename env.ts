import dotenv from 'dotenv';
import { z } from 'zod';

process.env.APP_STAGE = process.env.APP_STAGE || 'dev';

const isProduction = process.env.APP_STAGE === 'production';
const isDevelopment = process.env.APP_STAGE === 'dev';
const isTest = process.env.APP_STAGE === 'test';

if (isDevelopment) {
   dotenv.config({ path: '.env' });
   console.log(' Loaded .env (development)');
} else if (isTest) {
   dotenv.config({ path: '.env.test' });
   console.log(' Loaded .env.test (testing)');
} else if (isProduction) {
   console.log(' Using production environment variables');
}

const envSchema = z.object({
   NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
   APP_STAGE: z.enum(['dev', 'production', 'test']).default('dev'),

   PORT: z.coerce.number().positive().default(3000),
   HOST: z.string().default('localhost'),

   DATABASE_URL: z.string().startsWith('postgresql://'),
   DATABASE_POOL_MIN: z.coerce.number().min(0).default(2),
   DATABASE_POOL_MAX: z.coerce.number().positive().default(10),

   JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
   JWT_EXPIRES_IN: z.string().default('7d'),
   REFRESH_TOKEN_SECRET: z.string().min(32).optional(),
   REFRESH_TOKEN_EXPIRES_IN: z.string().default('30d'),

   BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),

   CORS_ORIGIN: z
      .string()
      .or(z.array(z.string()))
      .transform((val) =>
         typeof val === 'string'
            ? val.split(',').map((origin) => origin.trim())
            : val
      )
      .default([]),

   LOG_LEVEL: z
      .enum(['error', 'warn', 'info', 'debug', 'trace'])
      .default(isProduction ? 'info' : 'debug'),
});

let env: z.infer<typeof envSchema>;

try {
   env = envSchema.parse(process.env);
} catch (error) {
   if (error instanceof z.ZodError) {
      console.error('Invalid environment variables:');
      console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
      process.exit(1);
   }
   throw error;
}

export const isProd = () => env.APP_STAGE === 'production';
export const isDev = () => env.APP_STAGE === 'dev';
export const isTestEnv = () => env.APP_STAGE === 'test';

export { env };
export default env;
