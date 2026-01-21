/**
 * Interaction routes configuration.
 * Defines all interaction-related endpoints with middleware chains.
 *
 * @remarks
 * All routes are protected (require authentication).
 * Multi-tenant isolation is enforced via tenant middleware.
 */

import { Router } from 'express';
import * as interactionsController from './interactions.controller.js';
import {
  asyncHandler,
  authenticate,
  validateBody,
  validateQuery,
  validateParams,
  authorize,
} from '../../shared/middlewares/index.js';
import { ROLES } from '../../config/constants.js';
import {
  createInteractionSchema,
  updateInteractionSchema,
  listInteractionsQuerySchema,
  interactionIdParamSchema,
  clientIdParamSchema,
  clientTimelineQuerySchema,
} from './interactions.validator.js';

const router = Router();

// All interaction routes require authentication
router.use(authenticate);

// ─────────────────────────────────────────
// Read Routes (All authenticated users)
// ─────────────────────────────────────────

/**
 * GET /interactions
 * List interactions with filtering and pagination.
 */
router.get(
  '/',
  validateQuery(listInteractionsQuerySchema),
  asyncHandler(interactionsController.list)
);

/**
 * GET /interactions/stats
 * Get interaction statistics.
 * Note: Must be before /:id to avoid matching "stats" as an ID.
 */
router.get('/stats', asyncHandler(interactionsController.getStats));

/**
 * GET /interactions/:id
 * Get a single interaction by ID.
 */
router.get(
  '/:id',
  validateParams(interactionIdParamSchema),
  asyncHandler(interactionsController.getById)
);

// ─────────────────────────────────────────
// Write Routes (All authenticated users can log interactions)
// ─────────────────────────────────────────

/**
 * POST /interactions
 * Create a new interaction.
 * Note: Any authenticated user can create interactions.
 */
router.post(
  '/',
  validateBody(createInteractionSchema),
  asyncHandler(interactionsController.create)
);

/**
 * PATCH /interactions/:id
 * Update an existing interaction.
 * Note: Any authenticated user can update (could add owner check in service).
 */
router.patch(
  '/:id',
  validateParams(interactionIdParamSchema),
  validateBody(updateInteractionSchema),
  asyncHandler(interactionsController.update)
);

/**
 * DELETE /interactions/:id
 * Delete an interaction.
 * Note: Manager+ required for deletion.
 */
router.delete(
  '/:id',
  authorize(ROLES.MANAGER),
  validateParams(interactionIdParamSchema),
  asyncHandler(interactionsController.remove)
);

export default router;

// ─────────────────────────────────────────
// Client Timeline Routes (to be mounted on /clients)
// ─────────────────────────────────────────
export const clientTimelineRouter = Router();

clientTimelineRouter.use(authenticate);

/**
 * GET /clients/:clientId/interactions
 * Get interaction timeline for a specific client.
 */
clientTimelineRouter.get(
  '/:clientId/interactions',
  validateParams(clientIdParamSchema),
  validateQuery(clientTimelineQuerySchema),
  asyncHandler(interactionsController.getClientTimeline)
);
