/**
 * Client controller - HTTP request handlers.
 * Handles request/response transformation only, no business logic.
 * 
 * @remarks
 * Controllers are thin - they extract data from requests, call services,
 * and format responses. All business logic lives in the service layer.
 */

import type { Request, Response } from 'express';
import * as clientsService from './clients.service.js';
import * as auditService from '../audit/audit.service.js';
import { sendSuccess, sendCreated, sendNoContent } from '../../shared/utils/response.js';
import { getAuditContext } from '../../shared/middlewares/index.js';
import type { CreateClientInput, UpdateClientInput, ListClientsQuery } from './clients.validator.js';

// ─────────────────────────────────────────
// Read Operations
// ─────────────────────────────────────────

/**
 * GET /clients
 * List clients with filtering and pagination.
 */
export async function list(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;
  const query = req.query as unknown as ListClientsQuery;

  const result = await clientsService.list(tenantId, query);

  return sendSuccess(res, result.clients, 200, result.meta);
}

/**
 * GET /clients/:id
 * Get a single client by ID.
 */
export async function getById(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;
  const { id } = req.params;

  const client = await clientsService.getById(tenantId, id!);

  return sendSuccess(res, client);
}

/**
 * GET /clients/segments
 * Get all distinct segments for the tenant.
 */
export async function getSegments(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;

  const segments = await clientsService.getSegments(tenantId);

  return sendSuccess(res, { segments });
}

/**
 * GET /clients/stats
 * Get client statistics by status.
 */
export async function getStats(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;

  const stats = await clientsService.getStatsByStatus(tenantId);

  return sendSuccess(res, { stats });
}

// ─────────────────────────────────────────
// Write Operations
// ─────────────────────────────────────────

/**
 * POST /clients
 * Create a new client.
 */
export async function create(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;
  const input = req.body as CreateClientInput;

  const client = await clientsService.create(tenantId, input);

  // Audit log (fire and forget)
  auditService.logCreate(getAuditContext(req), 'client', client.id, {
    companyName: client.companyName,
    contactName: client.contactName,
    status: client.status,
  });

  return sendCreated(res, client);
}

/**
 * PATCH /clients/:id
 * Update an existing client.
 */
export async function update(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;
  const { id } = req.params;
  const input = req.body as UpdateClientInput;

  // Get old values for audit before update
  const oldClient = await clientsService.getById(tenantId, id!);
  const client = await clientsService.update(tenantId, id!, input);

  // Audit log (fire and forget)
  auditService.logUpdate(
    getAuditContext(req),
    'client',
    client.id,
    { companyName: oldClient.companyName, contactName: oldClient.contactName, status: oldClient.status },
    { companyName: client.companyName, contactName: client.contactName, status: client.status }
  );

  return sendSuccess(res, client);
}

/**
 * DELETE /clients/:id
 * Delete a client.
 */
export async function remove(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;
  const { id } = req.params;

  // Get client info for audit before deletion
  const client = await clientsService.getById(tenantId, id!);
  await clientsService.remove(tenantId, id!);

  // Audit log (fire and forget)
  auditService.logDelete(getAuditContext(req), 'client', id!, {
    companyName: client.companyName,
    contactName: client.contactName,
  });

  return sendNoContent(res);
}

// ─────────────────────────────────────────
// Bulk Operations
// ─────────────────────────────────────────

/**
 * POST /clients/bulk/status
 * Bulk update status for multiple clients.
 */
export async function bulkUpdateStatus(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;
  const { clientIds, status } = req.body as { clientIds: string[]; status: string };

  const updatedCount = await clientsService.bulkUpdateStatus(tenantId, clientIds, status);

  return sendSuccess(res, { updatedCount });
}

/**
 * POST /clients/bulk/assign
 * Bulk assign clients to a user.
 */
export async function bulkAssign(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;
  const { clientIds, assignedToId } = req.body as { clientIds: string[]; assignedToId: string | null };

  const updatedCount = await clientsService.bulkAssign(tenantId, clientIds, assignedToId);

  return sendSuccess(res, { updatedCount });
}
