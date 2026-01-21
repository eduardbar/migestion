/**
 * Audit Service.
 * Business logic for audit logging.
 *
 * Design principles:
 * - Fire-and-forget: Audit logging should never block main operations
 * - Fail silently: Audit errors should not affect business operations
 * - Minimal overhead: Async operations with error suppression
 */

import * as auditRepository from './audit.repository.js';
import {
  toAuditLogDto,
  toAuditLogListDto,
  type AuditLogDto,
  type AuditLogListDto,
} from './audit.dto.js';
import { NotFoundError } from '../../shared/errors/index.js';
import type { AuditActionType, AuditEntityType, ListAuditLogsQuery } from './audit.validator.js';
import { AUDIT } from '../../config/constants.js';

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

export interface AuditContext {
  tenantId: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditLogInput {
  action: AuditActionType;
  entity: AuditEntityType;
  entityId?: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
}

// ─────────────────────────────────────────
// Core Audit Functions
// ─────────────────────────────────────────

/**
 * Log an audit event (fire and forget).
 * This function never throws - errors are logged but suppressed.
 */
export function log(context: AuditContext, input: AuditLogInput): void {
  // Fire and forget - don't await
  auditRepository
    .createAuditLog({
      tenantId: context.tenantId,
      userId: context.userId,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId,
      oldValues: input.oldValues,
      newValues: input.newValues,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
    })
    .catch(error => {
      // Log error but don't throw - audit should never break main flow
      console.error('Audit log failed:', error);
    });
}

/**
 * Log an audit event and wait for completion.
 * Use this when you need to ensure the audit log is written.
 */
export async function logAsync(context: AuditContext, input: AuditLogInput): Promise<void> {
  try {
    await auditRepository.createAuditLog({
      tenantId: context.tenantId,
      userId: context.userId,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId,
      oldValues: input.oldValues,
      newValues: input.newValues,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
    });
  } catch (error) {
    console.error('Audit log failed:', error);
    // Still don't throw in async version for consistency
  }
}

// ─────────────────────────────────────────
// Convenience Audit Functions
// ─────────────────────────────────────────

/**
 * Log a create action.
 */
export function logCreate(
  context: AuditContext,
  entity: AuditEntityType,
  entityId: string,
  newValues: Record<string, unknown>
): void {
  log(context, {
    action: 'create',
    entity,
    entityId,
    newValues: sanitizeValues(newValues),
  });
}

/**
 * Log an update action.
 */
export function logUpdate(
  context: AuditContext,
  entity: AuditEntityType,
  entityId: string,
  oldValues: Record<string, unknown>,
  newValues: Record<string, unknown>
): void {
  log(context, {
    action: 'update',
    entity,
    entityId,
    oldValues: sanitizeValues(oldValues),
    newValues: sanitizeValues(newValues),
  });
}

/**
 * Log a delete action.
 */
export function logDelete(
  context: AuditContext,
  entity: AuditEntityType,
  entityId: string,
  oldValues?: Record<string, unknown>
): void {
  log(context, {
    action: 'delete',
    entity,
    entityId,
    oldValues: oldValues ? sanitizeValues(oldValues) : undefined,
  });
}

/**
 * Log a login action.
 */
export function logLogin(context: AuditContext): void {
  log(context, {
    action: 'login',
    entity: 'session',
  });
}

/**
 * Log a logout action.
 */
export function logLogout(context: AuditContext): void {
  log(context, {
    action: 'logout',
    entity: 'session',
  });
}

// ─────────────────────────────────────────
// Query Functions
// ─────────────────────────────────────────

/**
 * List audit logs with filtering and pagination.
 */
export async function listAuditLogs(
  tenantId: string,
  query: ListAuditLogsQuery
): Promise<AuditLogListDto> {
  const { page, limit, action, entity, userId, entityId, startDate, endDate, sortOrder } = query;

  const { auditLogs, total } = await auditRepository.listAuditLogs({
    tenantId,
    page,
    limit,
    action: action as AuditActionType | undefined,
    entity: entity as AuditEntityType | undefined,
    userId,
    entityId,
    startDate,
    endDate,
    sortOrder,
  });

  return toAuditLogListDto(auditLogs, total, page, limit);
}

/**
 * Get a single audit log by ID.
 */
export async function getAuditLogById(tenantId: string, id: string): Promise<AuditLogDto> {
  const auditLog = await auditRepository.findAuditLogById(tenantId, id);

  if (!auditLog) {
    throw new NotFoundError('Audit log not found');
  }

  return toAuditLogDto(auditLog);
}

/**
 * Get audit history for a specific entity.
 */
export async function getEntityHistory(
  tenantId: string,
  entity: AuditEntityType,
  entityId: string
): Promise<AuditLogDto[]> {
  const auditLogs = await auditRepository.getEntityAuditHistory(tenantId, entity, entityId);

  return auditLogs.map(toAuditLogDto);
}

/**
 * Get audit statistics.
 */
export async function getAuditStats(
  tenantId: string,
  startDate?: Date,
  endDate?: Date
): Promise<{ action: string; count: number }[]> {
  return auditRepository.getAuditStats(tenantId, startDate, endDate);
}

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────

/**
 * Remove sensitive fields from audit values.
 * Uses AUDIT.SENSITIVE_FIELDS from constants for consistency.
 */
function sanitizeValues(values: Record<string, unknown>): Record<string, unknown> {
  const sanitized = { ...values };

  for (const field of AUDIT.SENSITIVE_FIELDS) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  }

  return sanitized;
}
