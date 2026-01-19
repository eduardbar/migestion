import { prisma } from '../prisma/client.js';
import { redis } from '../redis/client.js';
import { logger } from '../../shared/utils/logger.js';

interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  checks: {
    database: HealthStatus;
    redis: HealthStatus;
    memory: HealthStatus;
  };
}

interface HealthStatus {
  status: 'up' | 'down';
  latencyMs?: number;
  message?: string;
  details?: Record<string, unknown>;
}

export class HealthService {
  private readonly version = process.env.npm_package_version ?? '1.0.0';

  async getHealth(): Promise<HealthCheck> {
    const [dbStatus, redisStatus, memoryStatus] = await Promise.all([
      this.checkDatabase(),
      this.checkRedis(),
      this.checkMemory(),
    ]);

    const allHealthy = dbStatus.status === 'up' && redisStatus.status === 'up';
    const anyUnhealthy = dbStatus.status === 'down' || redisStatus.status === 'down';

    return {
      status: anyUnhealthy ? 'unhealthy' : allHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: this.version,
      checks: {
        database: dbStatus,
        redis: redisStatus,
        memory: memoryStatus,
      },
    };
  }

  async getLiveness(): Promise<{ status: string; timestamp: string }> {
    return {
      status: 'alive',
      timestamp: new Date().toISOString(),
    };
  }

  async getReadiness(): Promise<HealthCheck> {
    const [dbStatus, redisStatus] = await Promise.all([this.checkDatabase(), this.checkRedis()]);

    const isReady = dbStatus.status === 'up' && redisStatus.status === 'up';

    return {
      status: isReady ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: this.version,
      checks: {
        database: dbStatus,
        redis: redisStatus,
        memory: this.checkMemory(),
      },
    };
  }

  private async checkDatabase(): Promise<HealthStatus> {
    const start = Date.now();
    try {
      await prisma.$queryRaw`SELECT 1`;
      return {
        status: 'up',
        latencyMs: Date.now() - start,
        message: 'Database connection active',
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Database health check failed: ${message}`);
      return {
        status: 'down',
        latencyMs: Date.now() - start,
        message: `Database connection failed: ${message}`,
      };
    }
  }

  private async checkRedis(): Promise<HealthStatus> {
    const start = Date.now();
    try {
      if (!redis) {
        return {
          status: 'down',
          message: 'Redis client not initialized',
        };
      }
      await redis.ping();
      return {
        status: 'up',
        latencyMs: Date.now() - start,
        message: 'Redis connection active',
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Redis health check failed: ${message}`);
      return {
        status: 'down',
        latencyMs: Date.now() - start,
        message: `Redis connection failed: ${message}`,
      };
    }
  }

  private checkMemory(): HealthStatus {
    const used = process.memoryUsage();
    const limit = 1024 * 1024 * 1024;
    const usagePercent = (used.heapUsed / limit) * 100;

    const isHealthy = usagePercent < 90;

    return {
      status: isHealthy ? 'up' : 'down',
      message: `Memory usage: ${Math.round(usagePercent)}%`,
      details: {
        heapUsed: this.formatBytes(used.heapUsed),
        heapTotal: this.formatBytes(used.heapTotal),
        external: this.formatBytes(used.external),
        usagePercent: Math.round(usagePercent * 100) / 100,
        limit: this.formatBytes(limit),
      },
    };
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const healthService = new HealthService();
