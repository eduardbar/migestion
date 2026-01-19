/**
 * User routes - Express router configuration.
 * Defines endpoints and applies middleware.
 */

import { Router } from 'express';
import * as usersController from './users.controller.js';
import { authenticate } from '../../shared/middlewares/auth.middleware.js';
import { requireRole } from '../../shared/middlewares/rbac.middleware.js';
import { validate } from '../../shared/middlewares/validation.middleware.js';
import { ROLES } from '../../config/constants.js';
import {
  inviteUserSchema,
  updateProfileSchema,
  updateUserRoleSchema,
  updateUserStatusSchema,
  changePasswordSchema,
  listUsersQuerySchema,
  userIdParamSchema,
} from './users.validator.js';
import { z } from 'zod';

const router = Router();

// All routes require authentication
router.use(authenticate);

// ─────────────────────────────────────────
// User Profile Routes (any authenticated user)
// ─────────────────────────────────────────

/**
 * GET /users/me
 * Get current user's profile
 */
router.get('/me', usersController.getProfile);

// TEMPORARIO: Debug endpoint para verificar/actualizar rol
router.get('/debug-role', usersController.debugRole);

// TEMPORARIO: Endpoint para darse admin a uno mismo (solo para desarrollo)
router.post('/make-me-admin', usersController.makeMeAdmin);

/**
 * PATCH /users/me
 * Update current user's profile
 */
router.patch('/me', validate({ body: updateProfileSchema }), usersController.updateProfile);

/**
 * POST /users/me/password
 * Change current user's password
 */
router.post(
  '/me/password',
  validate({ body: changePasswordSchema }),
  usersController.changePassword
);

// ─────────────────────────────────────────
// Team Management Routes (managers and above)
// ─────────────────────────────────────────

/**
 * GET /users
 * List all team members
 */
router.get(
  '/',
  requireRole(ROLES.MANAGER),
  validate({ query: listUsersQuerySchema }),
  usersController.list
);

/**
 * GET /users/stats
 * Get team statistics
 */
router.get('/stats', requireRole(ROLES.MANAGER), usersController.getStats);

/**
 * GET /users/:id
 * Get a specific team member
 */
router.get(
  '/:id',
  requireRole(ROLES.MANAGER),
  validate({ params: userIdParamSchema }),
  usersController.getById
);

// ─────────────────────────────────────────
// Admin Routes (admins and owners only)
// ─────────────────────────────────────────

/**
 * POST /users/invite
 * Invite a new team member
 */
router.post(
  '/invite',
  requireRole(ROLES.ADMIN),
  validate({ body: inviteUserSchema }),
  usersController.invite
);

/**
 * PATCH /users/:id/role
 * Update a team member's role
 */
router.patch(
  '/:id/role',
  requireRole(ROLES.ADMIN),
  validate({ params: userIdParamSchema, body: updateUserRoleSchema }),
  usersController.updateRole
);

/**
 * PATCH /users/:id/status
 * Activate or deactivate a team member
 */
router.patch(
  '/:id/status',
  requireRole(ROLES.ADMIN),
  validate({ params: userIdParamSchema, body: updateUserStatusSchema }),
  usersController.updateStatus
);

/**
 * DELETE /users/:id
 * Remove a team member
 */
router.delete(
  '/:id',
  requireRole(ROLES.ADMIN),
  validate({ params: userIdParamSchema }),
  usersController.remove
);

/**
 * POST /users/transfer-clients
 * Transfer clients from one user to another
 */
router.post(
  '/transfer-clients',
  requireRole(ROLES.ADMIN),
  validate({
    body: z.object({
      fromUserId: z.string().uuid('Invalid source user ID'),
      toUserId: z.string().uuid('Invalid target user ID').nullable(),
    }),
  }),
  usersController.transferClients
);

export { router as usersRoutes };
