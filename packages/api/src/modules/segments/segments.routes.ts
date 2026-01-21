/**
 * Segment routes - Express router configuration.
 */

import { Router } from 'express';
import * as segmentsController from './segments.controller.js';
import { authenticate } from '../../shared/middlewares/auth.middleware.js';
import { requireRole } from '../../shared/middlewares/rbac.middleware.js';
import { validate } from '../../shared/middlewares/validation.middleware.js';
import { ROLES } from '../../config/constants.js';
import {
  createSegmentSchema,
  updateSegmentSchema,
  listSegmentsQuerySchema,
  segmentIdParamSchema,
} from './segments.validator.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// ─────────────────────────────────────────
// Read Routes (any authenticated user)
// ─────────────────────────────────────────

/**
 * GET /segments
 * List segments with pagination
 */
router.get('/', validate({ query: listSegmentsQuerySchema }), segmentsController.list);

/**
 * GET /segments/all
 * Get all segments (simple list for dropdowns)
 */
router.get('/all', segmentsController.getAll);

/**
 * GET /segments/stats
 * Get segment statistics
 */
router.get('/stats', segmentsController.getStats);

/**
 * GET /segments/:id
 * Get a specific segment
 */
router.get('/:id', validate({ params: segmentIdParamSchema }), segmentsController.getById);

// ─────────────────────────────────────────
// Write Routes (managers and above)
// ─────────────────────────────────────────

/**
 * POST /segments
 * Create a new segment
 */
router.post(
  '/',
  requireRole(ROLES.MANAGER),
  validate({ body: createSegmentSchema }),
  segmentsController.create
);

/**
 * PATCH /segments/:id
 * Update a segment
 */
router.patch(
  '/:id',
  requireRole(ROLES.MANAGER),
  validate({ params: segmentIdParamSchema, body: updateSegmentSchema }),
  segmentsController.update
);

/**
 * DELETE /segments/:id
 * Delete a segment
 */
router.delete(
  '/:id',
  requireRole(ROLES.MANAGER),
  validate({ params: segmentIdParamSchema }),
  segmentsController.remove
);

export { router as segmentsRoutes };
