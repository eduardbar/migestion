/**
 * Audit Retention Service.
 * Handles automated cleanup of old audit logs based on retention policy.
 */

import { prisma } from '../../infrastructure/prisma/client.js';
import { logger } from '../../shared/utils/logger.js';

interface RetentionResult {
  success: boolean;
  tenantId: string;
  deletedCount: number;
  retentionDays: number;
  error?: string;
}

export class AuditRetentionService {
  private readonly defaultRetentionDays = 365;

  constructor() {
    this.defaultRetentionDays = 365;
  }

  async cleanupAllTenants(retentionDays?: number): Promise<RetentionResult[]> {
    const days = retentionDays ?? this.defaultRetentionDays;
    const results: RetentionResult[] = [];

    try {
      const tenants = await prisma.tenant.findMany({
        select: { id: true },
      });

      await Promise.all(
        tenants.map(async tenant => {
          const result = await this.cleanupTenantLogs(tenant.id, days);
          results.push(result);
        })
      );

      logger.info(`Audit retention cleanup completed for ${tenants.length} tenants`);
      return results;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Audit retention cleanup failed: ${message}`);
      throw error;
    }
  }

  async cleanupTenantLogs(tenantId: string, retentionDays?: number): Promise<RetentionResult> {
    const days = retentionDays ?? this.defaultRetentionDays;

    try {
      const result = await prisma.auditLog.deleteMany({
        where: {
          tenantId,
          createdAt: {
            lt: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
          },
        },
      });

      logger.info(`Audit retention: deleted ${result.count} logs for tenant ${tenantId}`);

      return {
        success: true,
        tenantId,
        deletedCount: result.count,
        retentionDays: days,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Audit retention failed for tenant ${tenantId}: ${message}`);

      return {
        success: false,
        tenantId,
        deletedCount: 0,
        retentionDays: days,
        error: message,
      };
    }
  }

  async getRetentionStats(): Promise<{
    totalLogs: number;
    tenantsWithLogs: number;
    oldestLog: Date | null;
    newestLog: Date | null;
  }> {
    const [total, tenantsWithLogs, oldest, newest] = await Promise.all([
      prisma.auditLog.count(),
      prisma.auditLog.groupBy({ by: ['tenantId'] }),
      prisma.auditLog.findFirst({ orderBy: { createdAt: 'asc' }, select: { createdAt: true } }),
      prisma.auditLog.findFirst({ orderBy: { createdAt: 'desc' }, select: { createdAt: true } }),
    ]);

    return {
      totalLogs: total,
      tenantsWithLogs: tenantsWithLogs.length,
      oldestLog: oldest?.createdAt ?? null,
      newestLog: newest?.createdAt ?? null,
    };
  }

  async runRetentionPolicy(retentionDays?: number): Promise<{
    success: boolean;
    totalDeleted: number;
    tenantResults: RetentionResult[];
    timestamp: Date;
    error?: string;
  }> {
    const days = retentionDays ?? this.defaultRetentionDays;

    try {
      const results = await this.cleanupAllTenants(days);

      const totalDeleted = results.reduce((sum, r) => sum + r.deletedCount, 0);

      const failed = results.filter(r => !r.success);

      return {
        success: failed.length === 0,
        totalDeleted,
        tenantResults: results,
        timestamp: new Date(),
        error: failed.length > 0 ? `${failed.length} tenants failed cleanup` : undefined,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Retention policy execution failed: ${message}`);

      return {
        success: false,
        totalDeleted: 0,
        tenantResults: [],
        timestamp: new Date(),
        error: message,
      };
    }
  }
}

export const auditRetentionService = new AuditRetentionService();
