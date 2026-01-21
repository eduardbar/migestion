import rateLimit from 'express-rate-limit';
import RateLimitRedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { env } from '../../config/index.js';
import { TooManyRequestsError } from '../errors/index.js';
import { logger } from '../../shared/utils/logger.js';

interface RedisRateLimitOptions {
  windowMs: number;
  max: number;
  prefix?: string;
  skipSuccessfulRequests?: boolean;
}

let redisClient: Redis | null = null;

function getRedisClient(): Redis | null {
  if (env.NODE_ENV === 'test') {
    return null;
  }

  if (!redisClient) {
    try {
      const redisUrl = process.env.REDIS_URL;
      redisClient = redisUrl
        ? new Redis(redisUrl)
        : new Redis({
            host: process.env.REDIS_HOST ?? 'localhost',
            port: parseInt(process.env.REDIS_PORT ?? '6379'),
            lazyConnect: true,
          });

      redisClient.on('error', err => {
        logger.error('Redis rate limiter error:', err);
      });

      redisClient.on('connect', () => {
        logger.info('Redis rate limiter connected');
      });
    } catch (error) {
      logger.error('Failed to create Redis client for rate limiting:', error);
      return null;
    }
  }

  return redisClient;
}

function createRedisStore(prefix: string) {
  const client = getRedisClient();
  if (!client) {
    return undefined;
  }

  return new RateLimitRedisStore({
    sendCommand: (command: string, ...args: any[]) => client.call(command, ...args) as any,
    prefix,
  } as any);
}

export function createRedisRateLimiter(options: RedisRateLimitOptions) {
  const { windowMs, max, prefix = 'rl', skipSuccessfulRequests = false } = options;

  const store = createRedisStore(prefix);

  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    store,
    handler: () => {
      throw new TooManyRequestsError();
    },
    keyGenerator: req => {
      return req.user?.userId ?? req.ip ?? 'unknown';
    },
    skipSuccessfulRequests,
    skip: (_req, res) => {
      return !store && env.NODE_ENV === 'production';
    },
  });
}

export const defaultRateLimiter = createRedisRateLimiter({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  prefix: 'rl:default',
});

export const authRateLimiter = createRedisRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  prefix: 'rl:auth',
  skipSuccessfulRequests: true,
});

export const passwordResetRateLimiter = createRedisRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 5,
  prefix: 'rl:reset',
});

export const apiRateLimiter = createRedisRateLimiter({
  windowMs: 60 * 1000,
  max: 200,
  prefix: 'rl:api',
});

export const webhookRateLimiter = createRedisRateLimiter({
  windowMs: 60 * 1000,
  max: 100,
  prefix: 'rl:webhook',
});

export async function disconnectRateLimiter(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
  }
}
