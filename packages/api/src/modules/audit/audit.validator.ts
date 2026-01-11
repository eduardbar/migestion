/**
 * Audit Validator.
 * Zod schemas for audit log validation.
 */

import { z } from 'zod';

// ─────────────────────────────────────────
// Audit Actions
// ─────────────────────────────────────────

export const AuditAction = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LOGIN: 'login',
  LOGOUT: 'logout',
  EXPORT: 'export',
  IMPORT: 'import',
  ASSIGN: 'assign',
  UNASSIGN: 'unassign',
} as const;

export type AuditActionType = typeof AuditAction[keyof typeof AuditAction];

// ─────────────────────────────────────────
// Audit Entities
// ─────────────────────────────────────────

export const AuditEntity = {
  USER: 'user',
  CLIENT: 'client',
  INTERACTION: 'interaction',
  SEGMENT: 'segment',
  NOTIFICATION: 'notification',
  TENANT: 'tenant',
  SESSION: 'session',
} as const;

export type AuditEntityType = typeof AuditEntity[keyof typeof AuditEntity];

// ─────────────────────────────────────────
// Query Schema
// ─────────────────────────────────────────

export const listAuditLogsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  action: z.enum([
    'create', 'update', 'delete', 'login', 'logout', 
    'export', 'import', 'assign', 'unassign'
  ]).optional(),
  entity: z.enum([
    'user', 'client', 'interaction', 'segment', 
    'notification', 'tenant', 'session'
  ]).optional(),
  userId: z.string().uuid().optional(),
  entityId: z.string().uuid().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type ListAuditLogsQuery = z.infer<typeof listAuditLogsSchema>;

// ─────────────────────────────────────────
// Create Schema (Internal use)
// ─────────────────────────────────────────

export const createAuditLogSchema = z.object({
  action: z.enum([
    'create', 'update', 'delete', 'login', 'logout',
    'export', 'import', 'assign', 'unassign'
  ]),
  entity: z.enum([
    'user', 'client', 'interaction', 'segment',
    'notification', 'tenant', 'session'
  ]),
  entityId: z.string().uuid().optional(),
  oldValues: z.record(z.unknown()).optional(),
  newValues: z.record(z.unknown()).optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().max(500).optional(),
});

export type CreateAuditLogInput = z.infer<typeof createAuditLogSchema>;
