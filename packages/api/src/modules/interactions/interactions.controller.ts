/**
 * Interaction controller - HTTP request handlers.
 * Handles request/response transformation only, no business logic.
 */

import type { Request, Response } from 'express';
import * as interactionsService from './interactions.service.js';
import * as auditService from '../audit/audit.service.js';
import { getAuditContext } from '../../shared/middlewares/audit.middleware.js';
import { sendSuccess, sendCreated, sendNoContent } from '../../shared/utils/response.js';
import type {
  CreateInteractionInput,
  UpdateInteractionInput,
  ListInteractionsQuery,
  ClientTimelineQuery,
} from './interactions.validator.js';

// ─────────────────────────────────────────
// Read Operations
// ─────────────────────────────────────────

/**
 * GET /interactions
 * List interactions with filtering and pagination.
 */
export async function list(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;
  const query = req.query as unknown as ListInteractionsQuery;

  const result = await interactionsService.list(tenantId, query);

  return sendSuccess(res, result.interactions, 200, result.meta);
}

/**
 * GET /interactions/stats
 * Get interaction statistics.
 */
export async function getStats(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;

  const stats = await interactionsService.getStats(tenantId);

  return sendSuccess(res, stats);
}

/**
 * GET /interactions/:id
 * Get a single interaction by ID.
 */
export async function getById(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;
  const { id } = req.params;

  const interaction = await interactionsService.getById(tenantId, id!);

  return sendSuccess(res, interaction);
}

/**
 * GET /clients/:clientId/interactions
 * Get interaction timeline for a specific client.
 */
export async function getClientTimeline(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;
  const { clientId } = req.params;
  const query = req.query as unknown as ClientTimelineQuery;

  const result = await interactionsService.getClientTimeline(tenantId, clientId!, query);

  return sendSuccess(res, result.interactions, 200, result.meta);
}

// ─────────────────────────────────────────
// Write Operations
// ─────────────────────────────────────────

/**
 * POST /interactions
 * Create a new interaction.
 */
export async function create(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;
  const userId = req.user!.userId;
  const input = req.body as CreateInteractionInput;

  const interaction = await interactionsService.create(tenantId, userId, input);

  // Audit: interaction created
  auditService.logCreate(getAuditContext(req), 'interaction', interaction.id, {
    type: interaction.type,
    clientId: interaction.clientId,
    notes: interaction.notes?.substring(0, 100),
  });

  return sendCreated(res, interaction);
}

/**
 * PATCH /interactions/:id
 * Update an existing interaction.
 */
export async function update(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;
  const { id } = req.params;
  const input = req.body as UpdateInteractionInput;

  // Get old values for audit
  const oldInteraction = await interactionsService.getById(tenantId, id!);

  const interaction = await interactionsService.update(tenantId, id!, input);

  // Audit: interaction updated
  auditService.logUpdate(
    getAuditContext(req),
    'interaction',
    id!,
    { type: oldInteraction.type, notes: oldInteraction.notes?.substring(0, 100) },
    { type: interaction.type, notes: interaction.notes?.substring(0, 100) }
  );

  return sendSuccess(res, interaction);
}

/**
 * DELETE /interactions/:id
 * Delete an interaction.
 */
export async function remove(req: Request, res: Response): Promise<Response> {
  const tenantId = req.tenantId!;
  const { id } = req.params;

  // Get interaction info for audit before deletion
  const interactionToDelete = await interactionsService.getById(tenantId, id!);

  await interactionsService.remove(tenantId, id!);

  // Audit: interaction deleted
  auditService.logDelete(getAuditContext(req), 'interaction', id!, {
    type: interactionToDelete.type,
    clientId: interactionToDelete.clientId,
    notes: interactionToDelete.notes?.substring(0, 100),
  });

  return sendNoContent(res);
}
