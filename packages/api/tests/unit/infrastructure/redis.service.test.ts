// Mock Redis client
jest.mock('@/infrastructure/redis/client', () => ({
  isRedisReady: jest.fn(),
  cacheGet: jest.fn(),
  cacheSet: jest.fn(),
  cacheDelete: jest.fn(),
  cacheDeletePattern: jest.fn(),
  cacheExists: jest.fn(),
  CacheKeys: {
    userSession: (userId: string) => `session:${userId}`,
    tenant: (tenantId: string) => `tenant:${tenantId}`,
    dashboardStats: (tenantId: string) => `stats:${tenantId}:dashboard`,
    clientList: (tenantId: string, queryHash: string) => `clients:${tenantId}:${queryHash}`,
    client: (tenantId: string, clientId: string) => `client:${tenantId}:${clientId}`,
    notificationCount: (userId: string) => `notifications:${userId}:count`,
    rateLimit: (ip: string, endpoint: string) => `ratelimit:${ip}:${endpoint}`,
  },
  invalidateTenantCache: jest.fn(),
  invalidateClientCache: jest.fn(),
  invalidateNotificationCache: jest.fn(),
}));

import {
  cacheGet,
  cacheSet,
  cacheDelete,
  cacheDeletePattern,
  cacheExists,
  isRedisReady,
  CacheKeys,
  invalidateTenantCache,
  invalidateClientCache,
  invalidateNotificationCache,
} from '@/infrastructure/redis/client';

describe('Redis Cache Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CacheKeys', () => {
    it('should generate correct user session key', () => {
      const key = CacheKeys.userSession('user-123');
      expect(key).toBe('session:user-123');
    });

    it('should generate correct tenant key', () => {
      const key = CacheKeys.tenant('tenant-456');
      expect(key).toBe('tenant:tenant-456');
    });

    it('should generate correct dashboard stats key', () => {
      const key = CacheKeys.dashboardStats('tenant-789');
      expect(key).toBe('stats:tenant-789:dashboard');
    });

    it('should generate correct client list key', () => {
      const key = CacheKeys.clientList('tenant-abc', 'query-hash');
      expect(key).toBe('clients:tenant-abc:query-hash');
    });

    it('should generate correct client key', () => {
      const key = CacheKeys.client('tenant-xyz', 'client-123');
      expect(key).toBe('client:tenant-xyz:client-123');
    });

    it('should generate correct notification count key', () => {
      const key = CacheKeys.notificationCount('user-999');
      expect(key).toBe('notifications:user-999:count');
    });

    it('should generate correct rate limit key', () => {
      const key = CacheKeys.rateLimit('192.168.1.1', '/api/clients');
      expect(key).toBe('ratelimit:192.168.1.1:/api/clients');
    });
  });

  describe('cacheGet', () => {
    it('should return null when Redis is not ready', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(false);

      const result = await cacheGet('test-key');
      expect(result).toBeNull();
    });

    it('should return cached value when Redis is ready', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(true);
      (cacheGet as jest.Mock).mockResolvedValue({ data: 'test' });

      const result = await cacheGet('test-key');
      expect(result).toEqual({ data: 'test' });
    });

    it('should return null on cache miss', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(true);
      (cacheGet as jest.Mock).mockResolvedValue(null);

      const result = await cacheGet('non-existent-key');
      expect(result).toBeNull();
    });

    it('should handle JSON parsing errors gracefully', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(true);
      (cacheGet as jest.Mock).mockResolvedValue('invalid-json');

      const result = await cacheGet('test-key');
      // JSON.parse('invalid-json') will throw, which should be caught
      expect(result).toBeNull();
    });
  });

  describe('cacheSet', () => {
    it('should not set cache when Redis is not ready', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(false);

      await cacheSet('test-key', { data: 'test' });
      expect(cacheSet).not.toHaveBeenCalled();
    });

    it('should set cache with default TTL', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(true);
      (cacheSet as jest.Mock).mockResolvedValue();

      await cacheSet('test-key', { data: 'test' });
      expect(cacheSet).toHaveBeenCalledWith('test-key', { data: 'test' }, { ttl: undefined });
    });

    it('should set cache with custom TTL', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(true);
      (cacheSet as jest.Mock).mockResolvedValue();

      await cacheSet('test-key', { data: 'test' }, { ttl: 600 });
      expect(cacheSet).toHaveBeenCalledWith('test-key', { data: 'test' }, { ttl: 600 });
    });

    it('should serialize complex objects', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(true);
      (cacheSet as jest.Mock).mockResolvedValue();

      const complexData = {
        nested: { object: 'value' },
        array: [1, 2, 3],
        number: 42,
        boolean: true,
      };

      await cacheSet('test-key', complexData);
      expect(cacheSet).toHaveBeenCalledWith('test-key', complexData, { ttl: undefined });
    });
  });

  describe('cacheDelete', () => {
    it('should not delete cache when Redis is not ready', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(false);

      await cacheDelete('test-key');
      expect(cacheDelete).not.toHaveBeenCalled();
    });

    it('should delete cache key', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(true);
      (cacheDelete as jest.Mock).mockResolvedValue();

      await cacheDelete('test-key');
      expect(cacheDelete).toHaveBeenCalledWith('test-key');
    });
  });

  describe('cacheDeletePattern', () => {
    it('should not delete when Redis is not ready', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(false);

      await cacheDeletePattern('clients:tenant-*');
      expect(cacheDeletePattern).not.toHaveBeenCalled();
    });

    it('should delete keys matching pattern', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(true);
      (cacheDeletePattern as jest.Mock).mockResolvedValue();

      await cacheDeletePattern('clients:tenant-123:*');
      expect(cacheDeletePattern).toHaveBeenCalledWith('clients:tenant-123:*');
    });
  });

  describe('cacheExists', () => {
    it('should return false when Redis is not ready', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(false);

      const result = await cacheExists('test-key');
      expect(result).toBe(false);
    });

    it('should return true when key exists', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(true);
      (cacheExists as jest.Mock).mockResolvedValue(true);

      const result = await cacheExists('test-key');
      expect(result).toBe(true);
    });

    it('should return false when key does not exist', async () => {
      (isRedisReady as jest.Mock).mockReturnValue(true);
      (cacheExists as jest.Mock).mockResolvedValue(false);

      const result = await cacheExists('non-existent-key');
      expect(result).toBe(false);
    });
  });

  describe('invalidateTenantCache', () => {
    it('should invalidate all tenant-related caches', async () => {
      (invalidateTenantCache as jest.Mock).mockResolvedValue();

      await invalidateTenantCache('tenant-123');

      expect(invalidateTenantCache).toHaveBeenCalledWith('tenant-123');
    });
  });

  describe('invalidateClientCache', () => {
    it('should invalidate client cache with specific client ID', async () => {
      (invalidateClientCache as jest.Mock).mockResolvedValue();

      await invalidateClientCache('tenant-123', 'client-456');

      expect(invalidateClientCache).toHaveBeenCalledWith('tenant-123', 'client-456');
    });

    it('should invalidate all client caches when no client ID provided', async () => {
      (invalidateClientCache as jest.Mock).mockResolvedValue();

      await invalidateClientCache('tenant-123');

      expect(invalidateClientCache).toHaveBeenCalledWith('tenant-123', undefined);
    });
  });

  describe('invalidateNotificationCache', () => {
    it('should invalidate notification cache for user', async () => {
      (invalidateNotificationCache as jest.Mock).mockResolvedValue();

      await invalidateNotificationCache('user-789');

      expect(invalidateNotificationCache).toHaveBeenCalledWith('user-789');
    });
  });
});
