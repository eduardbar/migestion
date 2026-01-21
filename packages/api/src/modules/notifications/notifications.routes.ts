/**
 * Notification Routes.
 * Defines all notification-related API endpoints.
 */

import { Router } from 'express';
import * as notificationController from './notifications.controller.js';
import {
  authenticate,
  authorize,
  validateBody,
  validateQuery,
  validateParams,
} from '../../shared/middlewares/index.js';
import {
  createNotificationSchema,
  bulkCreateNotificationsSchema,
  listNotificationsQuerySchema,
  notificationIdParamSchema,
  markMultipleReadSchema,
} from './notifications.validator.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// ─────────────────────────────────────────
// User Routes (own notifications)
// ─────────────────────────────────────────

/**
 * GET /notifications
 * List current user's notifications
 */
router.get('/', validateQuery(listNotificationsQuerySchema), notificationController.list);

/**
 * GET /notifications/count
 * Get notification counts for current user
 */
router.get('/count', notificationController.getCount);

/**
 * PATCH /notifications/read-all
 * Mark all notifications as read
 */
router.patch('/read-all', notificationController.markAllAsRead);

/**
 * PATCH /notifications/read
 * Mark multiple notifications as read
 */
router.patch(
  '/read',
  validateBody(markMultipleReadSchema),
  notificationController.markMultipleAsRead
);

/**
 * DELETE /notifications/read
 * Delete all read notifications
 */
router.delete('/read', notificationController.removeReadNotifications);

/**
 * GET /notifications/:id
 * Get a specific notification
 */
router.get('/:id', validateParams(notificationIdParamSchema), notificationController.getById);

/**
 * PATCH /notifications/:id/read
 * Mark a notification as read
 */
router.patch(
  '/:id/read',
  validateParams(notificationIdParamSchema),
  notificationController.markAsRead
);

/**
 * DELETE /notifications/:id
 * Delete a notification
 */
router.delete('/:id', validateParams(notificationIdParamSchema), notificationController.remove);

// ─────────────────────────────────────────
// Admin Routes (create notifications for others)
// ─────────────────────────────────────────

/**
 * POST /notifications
 * Create a notification for a user (admin only)
 */
router.post(
  '/',
  authorize(ROLES.ADMIN),
  validateBody(createNotificationSchema),
  notificationController.create
);

/**
 * POST /notifications/bulk
 * Create notifications for multiple users (admin only)
 */
router.post(
  '/bulk',
  authorize(ROLES.ADMIN),
  validateBody(bulkCreateNotificationsSchema),
  notificationController.createBulk
);

export { router as notificationsRoutes };
