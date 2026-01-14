/**
 * Client routes configuration.
 * Defines all client-related endpoints with middleware chains.
 *
 * @remarks
 * All routes are protected (require authentication).
 * Multi-tenant isolation is enforced via tenant middleware.
 * RBAC controls access to write operations.
 */

import { Router } from 'express';
import * as clientsController from './clients.controller.js';
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
  createClientSchema,
  updateClientSchema,
  listClientsQuerySchema,
  clientIdParamSchema,
} from './clients.validator.js';
import { z } from 'zod';
import { clientTimelineRouter } from '../interactions/index.js';

const router = Router();

// All client routes require authentication
router.use(authenticate);

// ─────────────────────────────────────────
// Read Routes (All authenticated users)
// ─────────────────────────────────────────

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: List clients
 *     description: Get paginated list of clients with optional filters
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *         description: Items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by company name or contact name
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, prospect, churned]
 *         description: Filter by status
 *       - in: query
 *         name: segment
 *         schema:
 *           type: string
 *         description: Filter by segment
 *       - in: query
 *         name: assignedToId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by assigned user
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [companyName, contactName, createdAt, updatedAt, status]
 *           default: createdAt
 *         description: Sort field
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Client'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/', validateQuery(listClientsQuerySchema), asyncHandler(clientsController.list));

/**
 * @swagger
 * /clients/segments:
 *   get:
 *     summary: Get all segments
 *     description: Returns a list of all distinct client segments
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of segments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/segments', asyncHandler(clientsController.getSegments));

/**
 * @swagger
 * /clients/stats:
 *   get:
 *     summary: Get client statistics
 *     description: Returns client counts grouped by status
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Client statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/stats', asyncHandler(clientsController.getStats));

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Get client by ID
 *     description: Returns a single client with full details
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:id', validateParams(clientIdParamSchema), asyncHandler(clientsController.getById));

// ─────────────────────────────────────────
// Write Routes (Manager+ role required)
// ─────────────────────────────────────────

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Create a new client
 *     description: Create a new client (requires Manager role or higher)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClientRequest'
 *     responses:
 *       201:
 *         description: Client created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post(
  '/',
  authorize(ROLES.MANAGER),
  validateBody(createClientSchema),
  asyncHandler(clientsController.create)
);

/**
 * @swagger
 * /clients/{id}:
 *   patch:
 *     summary: Update a client
 *     description: Update an existing client (requires Manager role or higher)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClientRequest'
 *     responses:
 *       200:
 *         description: Client updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.patch(
  '/:id',
  authorize(ROLES.MANAGER),
  validateParams(clientIdParamSchema),
  validateBody(updateClientSchema),
  asyncHandler(clientsController.update)
);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Delete a client
 *     description: Delete a client (requires Admin role or higher)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client deleted
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete(
  '/:id',
  authorize(ROLES.ADMIN),
  validateParams(clientIdParamSchema),
  asyncHandler(clientsController.remove)
);

// ─────────────────────────────────────────
// Bulk Operations (Admin+ role required)
// ─────────────────────────────────────────

const bulkStatusSchema = z.object({
  clientIds: z
    .array(z.string().uuid())
    .min(1, 'At least one client ID required')
    .max(100, 'Maximum 100 clients per operation'),
  status: z.enum(['active', 'inactive', 'prospect', 'churned']),
});

const bulkAssignSchema = z.object({
  clientIds: z.array(z.string().uuid()).min(1).max(100),
  assignedToId: z.string().uuid().nullable(),
});

/**
 * @swagger
 * /clients/bulk/status:
 *   post:
 *     summary: Bulk update client status
 *     description: Update status for multiple clients at once (Admin role required)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [clientIds, status]
 *             properties:
 *               clientIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 minItems: 1
 *                 maxItems: 100
 *               status:
 *                 type: string
 *                 enum: [active, inactive, prospect, churned]
 *     responses:
 *       200:
 *         description: Bulk update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     updatedCount:
 *                       type: integer
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post(
  '/bulk/status',
  authorize(ROLES.ADMIN),
  validateBody(bulkStatusSchema),
  asyncHandler(clientsController.bulkUpdateStatus)
);

/**
 * @swagger
 * /clients/bulk/assign:
 *   post:
 *     summary: Bulk assign clients
 *     description: Assign multiple clients to a user (Admin role required)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [clientIds, assignedToId]
 *             properties:
 *               clientIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 minItems: 1
 *                 maxItems: 100
 *               assignedToId:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 description: User ID to assign to, or null to unassign
 *     responses:
 *       200:
 *         description: Bulk assign successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     updatedCount:
 *                       type: integer
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post(
  '/bulk/assign',
  authorize(ROLES.ADMIN),
  validateBody(bulkAssignSchema),
  asyncHandler(clientsController.bulkAssign)
);

router.use('/:clientId', clientTimelineRouter);

export default router;
