/**
 * Audit Controller.
 * HTTP handlers for audit log endpoints.
 *
 * Access: Admin and Owner roles only.
 */

import type { Request, Response, NextFunction } from 'express';
import * as auditService from './audit.service.js';
import { listAuditLogsSchema, type AuditEntityType } from './audit.validator.js';
import { success } from '../../shared/utils/response.js';

// ─────────────────────────────────────────
// List Audit Logs
// ─────────────────────────────────────────

/**
 * GET /audit
 * List audit logs with filtering and pagination.
 */
export async function listAuditLogs(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const tenantId = req.tenantId!;
    const query = listAuditLogsSchema.parse(req.query);

    const result = await auditService.listAuditLogs(tenantId, query);

    res.json(success(result));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Get Audit Log by ID
// ─────────────────────────────────────────

/**
 * GET /audit/:id
 * Get a single audit log entry.
 */
export async function getAuditLog(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const tenantId = req.tenantId!;
    const id = req.params.id!;

    const result = await auditService.getAuditLogById(tenantId, id);

    res.json(success(result));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Get Entity History
// ─────────────────────────────────────────

/**
 * GET /audit/entity/:entity/:entityId
 * Get audit history for a specific entity.
 */
export async function getEntityHistory(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const tenantId = req.tenantId!;
    const entity = req.params.entity!;
    const entityId = req.params.entityId!;

    const result = await auditService.getEntityHistory(
      tenantId,
      entity as AuditEntityType,
      entityId
    );

    res.json(success(result));
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────
// Get Audit Stats
// ─────────────────────────────────────────

/**
 * GET /audit/stats
 * Get audit statistics.
 */
export async function getAuditStats(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const tenantId = req.tenantId!;
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

    const result = await auditService.getAuditStats(tenantId, startDate, endDate);

    res.json(success(result));
  } catch (error) {
    next(error);
  }
}
