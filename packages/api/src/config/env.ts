import { z } from 'zod';

/**
 * Environment configuration schema with validation.
 * Uses Zod for runtime type safety and validation.
 *
 * @remarks
 * Following Clean Code principles:
 * - Single source of truth for environment variables
 * - Fail-fast on invalid configuration
 * - Type-safe access throughout the application
 */
const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  API_URL: z.string().url().default('http://localhost:3000'),
  WEB_URL: z.string().url().default('http://localhost:5173'),

  // Database - Default for local dev
  DATABASE_URL: z.string().default('postgresql://migestion:password@localhost:5432/migestion'),

  // Redis - Default for local dev
  REDIS_URL: z.string().default('redis://localhost:6379'),

  // JWT - Default for local dev
  JWT_ACCESS_SECRET: z.string().default('supersecretaccesskey32charsminimumlengthneeded'),
  JWT_REFRESH_SECRET: z.string().default('supersecretrefreshkey32charsminimumlengthneeded'),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),

  // Security
  BCRYPT_ROUNDS: z.coerce.number().min(10).max(15).default(10),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

type EnvConfig = z.infer<typeof envSchema>;

/**
 * Validates and loads environment variables.
 * Throws descriptive error if validation fails.
 */
function loadEnvConfig(): EnvConfig {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errors = result.error.issues
      .map(issue => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');

    throw new Error(`Invalid environment configuration:\n${errors}`);
  }

  return result.data;
}

export const env = loadEnvConfig();

export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';
export const isTest = env.NODE_ENV === 'test';
