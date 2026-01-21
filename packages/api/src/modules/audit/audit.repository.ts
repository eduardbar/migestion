/**
 * Audit Repository.
 * Handles all database operations for audit logs.
 * All queries are scoped by tenantId for multi-tenant isolation.
 */

import { prisma } from '../../infrastructure/prisma/client.js';
import type { AuditLog, Prisma, User } from '@prisma/client';
import type { AuditActionType, AuditEntityType } from './audit.validator.js';

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

export interface CreateAuditLogData {
  tenantId: string;
  userId?: string;
  action: AuditActionType;
  entity: AuditEntityType;
  entityId?: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export interface ListAuditLogsOptions {
  tenantId: string;
  page: number;
  limit: number;
  action?: AuditActionType;
  entity?: AuditEntityType;
  userId?: string;
  entityId?: string;
  startDate?: Date;
  endDate?: Date;
  sortOrder: 'asc' | 'desc';
}

type AuditLogWithUser = AuditLog & {
  user: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'> | null;
};

// ─────────────────────────────────────────
// Repository Functions
// ─────────────────────────────────────────

/**
 * Create a new audit log entry.
 */
export async function createAuditLog(data: CreateAuditLogData): Promise<AuditLog> {
  return prisma.auditLog.create({
    data: {
      tenantId: data.tenantId,
      userId: data.userId,
      action: data.action,
      entity: data.entity,
      entityId: data.entityId,
      oldValues: data.oldValues as Prisma.InputJsonValue,
      newValues: data.newValues as Prisma.InputJsonValue,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
    },
  });
}

/**
 * List audit logs with filtering and pagination.
 */
export async function listAuditLogs(
  options: ListAuditLogsOptions
): Promise<{ auditLogs: AuditLogWithUser[]; total: number }> {
  const { tenantId, page, limit, action, entity, userId, entityId, startDate, endDate, sortOrder } =
    options;

  const where: Prisma.AuditLogWhereInput = {
    tenantId,
    ...(action && { action }),
    ...(entity && { entity }),
    ...(userId && { userId }),
    ...(entityId && { entityId }),
    ...(startDate || endDate
      ? {
          createdAt: {
            ...(startDate && { gte: startDate }),
            ...(endDate && { lte: endDate }),
          },
        }
      : {}),
  };

  const [auditLogs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return { auditLogs, total };
}

/**
 * Find audit log by ID within tenant scope.
 */
export async function findAuditLogById(
  tenantId: string,
  id: string
): Promise<AuditLogWithUser | null> {
  return prisma.auditLog.findFirst({
    where: {
      id,
      tenantId,
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
}

/**
 * Get audit logs for a specific entity.
 */
export async function getEntityAuditHistory(
  tenantId: string,
  entity: AuditEntityType,
  entityId: string,
  limit: number = 50
): Promise<AuditLogWithUser[]> {
  return prisma.auditLog.findMany({
    where: {
      tenantId,
      entity,
      entityId,
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Get audit summary statistics.
 */
export async function getAuditStats(
  tenantId: string,
  startDate?: Date,
  endDate?: Date
): Promise<{ action: string; count: number }[]> {
  const where: Prisma.AuditLogWhereInput = {
    tenantId,
    ...(startDate || endDate
      ? {
          createdAt: {
            ...(startDate && { gte: startDate }),
            ...(endDate && { lte: endDate }),
          },
        }
      : {}),
  };

  const result = await prisma.auditLog.groupBy({
    by: ['action'],
    where,
    _count: { action: true },
  });

  return result.map(r => ({
    action: r.action,
    count: r._count.action,
  }));
}

/**
 * Delete old audit logs (retention policy).
 */
export async function deleteOldAuditLogs(
  tenantId: string,
  daysOld: number
): Promise<{ count: number }> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  return prisma.auditLog.deleteMany({
    where: {
      tenantId,
      createdAt: { lt: cutoffDate },
    },
  });
}
