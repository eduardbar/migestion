import Redis from 'ioredis';
import { env, isTest } from '../../config/index.js';
import { logger } from '../../shared/utils/logger.js';

/**
 * Redis client singleton.
 * Provides caching and pub/sub functionality for the application.
 *
 * @remarks
 * - Singleton pattern ensures single connection pool
 * - Handles reconnection automatically
 * - Graceful degradation when Redis is unavailable
 */

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

interface CacheOptions {
  /** Time to live in seconds */
  ttl?: number;
}

const DEFAULT_TTL = 300; // 5 minutes

// ─────────────────────────────────────────
// Singleton Instance
// ─────────────────────────────────────────

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

let connectionReady = false;

function createRedisClient(): Redis {
  const client = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) {
        logger.warn('Redis connection failed after 3 retries');
        return null; // Stop retrying
      }
      const delay = Math.min(times * 200, 2000);
      return delay;
    },
    lazyConnect: true,
  });

  client.on('connect', () => {
    logger.info('Redis client connecting...');
  });

  client.on('ready', () => {
    connectionReady = true;
    logger.info('Redis client connected and ready');
  });

  client.on('error', (error) => {
    connectionReady = false;
    logger.error('Redis client error', { error: error.message });
  });

  client.on('close', () => {
    connectionReady = false;
    logger.info('Redis connection closed');
  });

  return client;
}

/**
 * Redis client instance.
 * Reuses existing connection in development to prevent hot-reload issues.
 */
export const redis: Redis = globalForRedis.redis ?? createRedisClient();

if (!isTest) {
  globalForRedis.redis = redis;
}

// ─────────────────────────────────────────
// Connection Management
// ─────────────────────────────────────────

/**
 * Connect to Redis server.
 * Safe to call multiple times - will only connect if not already connected.
 */
export async function connectRedis(): Promise<void> {
  if (isTest) {
    logger.info('Skipping Redis connection in test environment');
    return;
  }

  try {
    if (redis.status === 'ready') {
      logger.info('Redis already connected');
      return;
    }

    await redis.connect();
  } catch (error) {
    logger.warn('Failed to connect to Redis, caching will be disabled', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Disconnect from Redis server.
 */
export async function disconnectRedis(): Promise<void> {
  if (redis.status === 'ready' || redis.status === 'connecting') {
    await redis.quit();
    logger.info('Redis client disconnected');
  }
}

/**
 * Check if Redis is connected and ready.
 */
export function isRedisReady(): boolean {
  return connectionReady && redis.status === 'ready';
}

// ─────────────────────────────────────────
// Cache Operations
// ─────────────────────────────────────────

/**
 * Get a value from cache.
 * Returns null if key doesn't exist or Redis is unavailable.
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  if (!isRedisReady()) return null;

  try {
    const value = await redis.get(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch (error) {
    logger.warn('Cache get failed', { key, error: error instanceof Error ? error.message : 'Unknown' });
    return null;
  }
}

/**
 * Set a value in cache.
 * Silently fails if Redis is unavailable.
 */
export async function cacheSet<T>(
  key: string,
  value: T,
  options: CacheOptions = {}
): Promise<void> {
  if (!isRedisReady()) return;

  try {
    const ttl = options.ttl ?? DEFAULT_TTL;
    await redis.setex(key, ttl, JSON.stringify(value));
  } catch (error) {
    logger.warn('Cache set failed', { key, error: error instanceof Error ? error.message : 'Unknown' });
  }
}

/**
 * Delete a key from cache.
 */
export async function cacheDelete(key: string): Promise<void> {
  if (!isRedisReady()) return;

  try {
    await redis.del(key);
  } catch (error) {
    logger.warn('Cache delete failed', { key, error: error instanceof Error ? error.message : 'Unknown' });
  }
}

/**
 * Delete multiple keys matching a pattern.
 * Use with caution in production - SCAN is used for safety.
 */
export async function cacheDeletePattern(pattern: string): Promise<void> {
  if (!isRedisReady()) return;

  try {
    let cursor = '0';
    do {
      const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
      cursor = nextCursor;
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } while (cursor !== '0');
  } catch (error) {
    logger.warn('Cache delete pattern failed', { pattern, error: error instanceof Error ? error.message : 'Unknown' });
  }
}

/**
 * Check if a key exists in cache.
 */
export async function cacheExists(key: string): Promise<boolean> {
  if (!isRedisReady()) return false;

  try {
    return (await redis.exists(key)) === 1;
  } catch (error) {
    logger.warn('Cache exists check failed', { key, error: error instanceof Error ? error.message : 'Unknown' });
    return false;
  }
}

// ─────────────────────────────────────────
// Cache Key Builders
// ─────────────────────────────────────────

export const CacheKeys = {
  /** User session data */
  userSession: (userId: string) => `session:${userId}`,
  
  /** Tenant data */
  tenant: (tenantId: string) => `tenant:${tenantId}`,
  
  /** User profile */
  userProfile: (userId: string) => `user:${userId}:profile`,
  
  /** Dashboard stats for a tenant */
  dashboardStats: (tenantId: string) => `stats:${tenantId}:dashboard`,
  
  /** Client list for a tenant (with hash of query params) */
  clientList: (tenantId: string, queryHash: string) => `clients:${tenantId}:${queryHash}`,
  
  /** Single client */
  client: (tenantId: string, clientId: string) => `client:${tenantId}:${clientId}`,
  
  /** Notification count for a user */
  notificationCount: (userId: string) => `notifications:${userId}:count`,
  
  /** Rate limit counter */
  rateLimit: (ip: string, endpoint: string) => `ratelimit:${ip}:${endpoint}`,
} as const;

// ─────────────────────────────────────────
// Cache Invalidation Helpers
// ─────────────────────────────────────────

/**
 * Invalidate all cached data for a tenant.
 * Call this after bulk operations that affect many records.
 */
export async function invalidateTenantCache(tenantId: string): Promise<void> {
  await Promise.all([
    cacheDeletePattern(`clients:${tenantId}:*`),
    cacheDeletePattern(`stats:${tenantId}:*`),
    cacheDelete(CacheKeys.tenant(tenantId)),
  ]);
}

/**
 * Invalidate client-related cache for a tenant.
 * Call this after client create/update/delete operations.
 */
export async function invalidateClientCache(tenantId: string, clientId?: string): Promise<void> {
  const promises: Promise<void>[] = [
    cacheDeletePattern(`clients:${tenantId}:*`),
    cacheDelete(CacheKeys.dashboardStats(tenantId)),
  ];
  
  if (clientId) {
    promises.push(cacheDelete(CacheKeys.client(tenantId, clientId)));
  }
  
  await Promise.all(promises);
}

/**
 * Invalidate notification count cache for a user.
 */
export async function invalidateNotificationCache(userId: string): Promise<void> {
  await cacheDelete(CacheKeys.notificationCount(userId));
}
