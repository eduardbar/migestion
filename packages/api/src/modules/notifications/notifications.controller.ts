/**
 * Notification Controller.
 * Handles HTTP requests for notification endpoints.
 */

import type { Request, Response, NextFunction } from 'express';
import * as notificationService from './notifications.service.js';
import { success } from '../../shared/utils/response.js';
import type {
  CreateNotificationInput,
  BulkCreateNotificationsInput,
  ListNotificationsQuery,
  MarkMultipleReadInput,
} from './notifications.validator.js';

// ─────────────────────────────────────────
// Controller Functions
// ─────────────────────────────────────────

/**
 * Create a notification (admin only).
 * POST /notifications
 */
export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId } = req.user!;
    const input = req.body as CreateNotificationInput;

    const notification = await notificationService.createNotification(
      tenantId,
      input
    );

    res.status(201).json(success(notification, 'Notification created successfully'));
  } catch (error) {
    next(error);
  }
}

/**
 * Create notifications for multiple users (admin only).
 * POST /notifications/bulk
 */
export async function createBulk(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId } = req.user!;
    const input = req.body as BulkCreateNotificationsInput;

    const result = await notificationService.createBulkNotifications(
      tenantId,
      input
    );

    res.status(201).json(success(result, `${result.count} notifications created successfully`));
  } catch (error) {
    next(error);
  }
}

/**
 * Get current user's notifications.
 * GET /notifications
 */
export async function list(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId, userId } = req.user!;
    const query = req.query as unknown as ListNotificationsQuery;

    const result = await notificationService.listNotifications(
      tenantId,
      userId,
      query
    );

    res.json(success(result));
  } catch (error) {
    next(error);
  }
}

/**
 * Get notification counts for current user.
 * GET /notifications/count
 */
export async function getCount(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId, userId } = req.user!;

    const counts = await notificationService.getNotificationCounts(
      tenantId,
      userId
    );

    res.json(success(counts));
  } catch (error) {
    next(error);
  }
}

/**
 * Get a single notification.
 * GET /notifications/:id
 */
export async function getById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId, userId } = req.user!;
    const { id } = req.params;

    const notification = await notificationService.getNotificationById(
      tenantId,
      userId,
      id!
    );

    res.json(success(notification));
  } catch (error) {
    next(error);
  }
}

/**
 * Mark a notification as read.
 * PATCH /notifications/:id/read
 */
export async function markAsRead(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId, userId } = req.user!;
    const { id } = req.params;

    const notification = await notificationService.markAsRead(
      tenantId,
      userId,
      id!
    );

    res.json(success(notification, 'Notification marked as read'));
  } catch (error) {
    next(error);
  }
}

/**
 * Mark multiple notifications as read.
 * PATCH /notifications/read
 */
export async function markMultipleAsRead(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId, userId } = req.user!;
    const { ids } = req.body as MarkMultipleReadInput;

    const result = await notificationService.markMultipleAsRead(
      tenantId,
      userId,
      ids
    );

    res.json(success(result, `${result.markedCount} notifications marked as read`));
  } catch (error) {
    next(error);
  }
}

/**
 * Mark all notifications as read.
 * PATCH /notifications/read-all
 */
export async function markAllAsRead(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId, userId } = req.user!;

    const result = await notificationService.markAllAsRead(tenantId, userId);

    res.json(success(result, 'All notifications marked as read'));
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a notification.
 * DELETE /notifications/:id
 */
export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId, userId } = req.user!;
    const { id } = req.params;

    await notificationService.deleteNotification(tenantId, userId, id!);

    res.json(success(null, 'Notification deleted successfully'));
  } catch (error) {
    next(error);
  }
}

/**
 * Delete all read notifications.
 * DELETE /notifications/read
 */
export async function removeReadNotifications(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tenantId, userId } = req.user!;

    const result = await notificationService.deleteReadNotifications(
      tenantId,
      userId
    );

    res.json(success(result, `${result.count} read notifications deleted`));
  } catch (error) {
    next(error);
  }
}
