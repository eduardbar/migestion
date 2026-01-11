/**
 * Audit Routes.
 * Protected routes for audit log access.
 * Restricted to admin and owner roles.
 */

import { Router } from 'express';
import * as auditController from './audit.controller.js';
import { authenticate, requireTenantAdmin } from '../../shared/middlewares/index.js';

const router = Router();

// All audit routes require authentication and admin+ role
router.use(authenticate);
router.use(requireTenantAdmin);

// ─────────────────────────────────────────
// Routes
// ─────────────────────────────────────────

/**
 * GET /audit/stats
 * Get audit statistics.
 */
router.get('/stats', auditController.getAuditStats);

/**
 * GET /audit/entity/:entity/:entityId
 * Get audit history for a specific entity.
 */
router.get('/entity/:entity/:entityId', auditController.getEntityHistory);

/**
 * GET /audit/:id
 * Get a single audit log.
 */
router.get('/:id', auditController.getAuditLog);

/**
 * GET /audit
 * List audit logs.
 */
router.get('/', auditController.listAuditLogs);

export const auditRoutes = router;
