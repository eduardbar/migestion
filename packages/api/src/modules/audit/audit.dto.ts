/**
 * Audit DTOs.
 * Data Transfer Objects for audit log responses.
 */

import type { AuditLog, User } from '@prisma/client';

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

export interface AuditLogDto {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  oldValues: Record<string, unknown> | null;
  newValues: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

export interface AuditLogListDto {
  data: AuditLogDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ─────────────────────────────────────────
// Mappers
// ─────────────────────────────────────────

type AuditLogWithUser = AuditLog & {
  user: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'> | null;
};

/**
 * Convert AuditLog entity to DTO.
 */
export function toAuditLogDto(auditLog: AuditLogWithUser): AuditLogDto {
  return {
    id: auditLog.id,
    action: auditLog.action,
    entity: auditLog.entity,
    entityId: auditLog.entityId,
    oldValues: auditLog.oldValues as Record<string, unknown> | null,
    newValues: auditLog.newValues as Record<string, unknown> | null,
    ipAddress: auditLog.ipAddress,
    userAgent: auditLog.userAgent,
    createdAt: auditLog.createdAt.toISOString(),
    user: auditLog.user
      ? {
          id: auditLog.user.id,
          firstName: auditLog.user.firstName,
          lastName: auditLog.user.lastName,
          email: auditLog.user.email,
        }
      : null,
  };
}

/**
 * Convert audit log list to DTO with pagination.
 */
export function toAuditLogListDto(
  auditLogs: AuditLogWithUser[],
  total: number,
  page: number,
  limit: number
): AuditLogListDto {
  return {
    data: auditLogs.map(toAuditLogDto),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
