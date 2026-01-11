/**
 * Notification Service.
 * Contains business logic for notification operations.
 * Integrates with Socket.IO for real-time delivery.
 */

import * as notificationRepository from './notifications.repository.js';
import {
  toNotificationDto,
  toNotificationListDto,
  type NotificationDto,
  type NotificationListDto,
  type NotificationCountDto,
  type MarkReadResultDto,
} from './notifications.dto.js';
import { NotFoundError } from '../../shared/errors/index.js';
import {
  sendNotification,
  sendNotificationCount,
  type NotificationPayload,
} from '../../infrastructure/socket/index.js';
import {
  invalidateNotificationCache,
} from '../../infrastructure/redis/index.js';
import type {
  CreateNotificationInput,
  BulkCreateNotificationsInput,
  ListNotificationsQuery,
} from './notifications.validator.js';

// ─────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────

/**
 * Convert NotificationDto to Socket.IO payload.
 */
function toSocketPayload(notification: NotificationDto): NotificationPayload {
  return {
    id: notification.id,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    data: notification.data as Record<string, unknown> | undefined,
    createdAt: notification.createdAt,
  };
}

/**
 * Send real-time notification and update count.
 */
async function emitNotificationToUser(
  tenantId: string,
  userId: string,
  notification: NotificationDto
): Promise<void> {
  // Send the notification via WebSocket
  sendNotification(userId, toSocketPayload(notification));

  // Get and send updated unread count
  const unreadCount = await notificationRepository.countUnreadNotifications(tenantId, userId);
  sendNotificationCount(userId, unreadCount);

  // Invalidate cache
  await invalidateNotificationCache(userId);
}

// ─────────────────────────────────────────
// Service Functions
// ─────────────────────────────────────────

/**
 * Create a notification for a user.
 * Emits real-time notification via WebSocket.
 */
export async function createNotification(
  tenantId: string,
  input: CreateNotificationInput
): Promise<NotificationDto> {
  const notification = await notificationRepository.createNotification({
    tenantId,
    userId: input.userId,
    type: input.type,
    title: input.title,
    message: input.message,
    data: input.data,
  });

  const dto = toNotificationDto(notification);

  // Emit real-time notification (fire and forget)
  emitNotificationToUser(tenantId, input.userId, dto).catch(() => {
    // Silently fail - notification is persisted, real-time is best-effort
  });

  return dto;
}

/**
 * Create notifications for multiple users.
 * Emits real-time notifications via WebSocket.
 */
export async function createBulkNotifications(
  tenantId: string,
  input: BulkCreateNotificationsInput
): Promise<{ count: number }> {
  const notifications = input.userIds.map((userId) => ({
    tenantId,
    userId,
    type: input.type,
    title: input.title,
    message: input.message,
    data: input.data,
  }));

  const result = await notificationRepository.createManyNotifications(notifications);

  // Emit real-time notifications to all users (fire and forget)
  const notificationPayload: NotificationPayload = {
    id: '', // Will be different for each user, but content is same
    type: input.type,
    title: input.title,
    message: input.message ?? null,
    data: input.data as Record<string, unknown> | undefined,
    createdAt: new Date().toISOString(),
  };

  for (const userId of input.userIds) {
    sendNotification(userId, notificationPayload);
    invalidateNotificationCache(userId).catch(() => {});
  }

  return result;
}

/**
 * Get a notification by ID for the current user.
 */
export async function getNotificationById(
  tenantId: string,
  userId: string,
  notificationId: string
): Promise<NotificationDto> {
  const notification = await notificationRepository.findNotificationByIdAndUser(
    tenantId,
    userId,
    notificationId
  );

  if (!notification) {
    throw new NotFoundError('Notification not found');
  }

  return toNotificationDto(notification);
}

/**
 * List notifications for the current user.
 */
export async function listNotifications(
  tenantId: string,
  userId: string,
  query: ListNotificationsQuery
): Promise<NotificationListDto> {
  const { page, limit, unreadOnly, type, sortOrder } = query;

  const [{ notifications, total }, unreadCount] = await Promise.all([
    notificationRepository.listNotifications({
      tenantId,
      userId,
      page,
      limit,
      unreadOnly,
      type,
      sortOrder,
    }),
    notificationRepository.countUnreadNotifications(tenantId, userId),
  ]);

  return toNotificationListDto(notifications, total, unreadCount, page, limit);
}

/**
 * Get notification counts for the current user.
 */
export async function getNotificationCounts(
  tenantId: string,
  userId: string
): Promise<NotificationCountDto> {
  return notificationRepository.countNotifications(tenantId, userId);
}

/**
 * Mark a single notification as read.
 * Updates real-time notification count.
 */
export async function markAsRead(
  tenantId: string,
  userId: string,
  notificationId: string
): Promise<NotificationDto> {
  const notification = await notificationRepository.markNotificationAsRead(
    tenantId,
    userId,
    notificationId
  );

  if (!notification) {
    throw new NotFoundError('Notification not found');
  }

  // Update real-time count
  const unreadCount = await notificationRepository.countUnreadNotifications(tenantId, userId);
  sendNotificationCount(userId, unreadCount);
  await invalidateNotificationCache(userId);

  return toNotificationDto(notification);
}

/**
 * Mark multiple notifications as read.
 * Updates real-time notification count.
 */
export async function markMultipleAsRead(
  tenantId: string,
  userId: string,
  ids: string[]
): Promise<MarkReadResultDto> {
  const result = await notificationRepository.markManyNotificationsAsRead(
    tenantId,
    userId,
    ids
  );

  // Update real-time count
  const unreadCount = await notificationRepository.countUnreadNotifications(tenantId, userId);
  sendNotificationCount(userId, unreadCount);
  await invalidateNotificationCache(userId);

  return { markedCount: result.count };
}

/**
 * Mark all notifications as read for the current user.
 * Updates real-time notification count.
 */
export async function markAllAsRead(
  tenantId: string,
  userId: string
): Promise<MarkReadResultDto> {
  const result = await notificationRepository.markAllNotificationsAsRead(
    tenantId,
    userId
  );

  // Update real-time count (will be 0)
  sendNotificationCount(userId, 0);
  await invalidateNotificationCache(userId);

  return { markedCount: result.count };
}

/**
 * Delete a notification.
 */
export async function deleteNotification(
  tenantId: string,
  userId: string,
  notificationId: string
): Promise<void> {
  const notification = await notificationRepository.deleteNotification(
    tenantId,
    userId,
    notificationId
  );

  if (!notification) {
    throw new NotFoundError('Notification not found');
  }

  // Update cache
  await invalidateNotificationCache(userId);
}

/**
 * Delete all read notifications for the current user.
 */
export async function deleteReadNotifications(
  tenantId: string,
  userId: string
): Promise<{ count: number }> {
  const result = await notificationRepository.deleteReadNotifications(tenantId, userId);
  await invalidateNotificationCache(userId);
  return result;
}

/**
 * Internal helper: Create notification for client assignment.
 */
export async function notifyClientAssigned(
  tenantId: string,
  userId: string,
  clientName: string,
  clientId: string
): Promise<NotificationDto> {
  return createNotification(tenantId, {
    userId,
    type: 'client_assigned',
    title: 'New client assigned',
    message: `You have been assigned to ${clientName}`,
    data: { clientId },
  });
}

/**
 * Internal helper: Create notification for role change.
 */
export async function notifyRoleChanged(
  tenantId: string,
  userId: string,
  oldRole: string,
  newRole: string
): Promise<NotificationDto> {
  return createNotification(tenantId, {
    userId,
    type: 'role_changed',
    title: 'Your role has been updated',
    message: `Your role has been changed from ${oldRole} to ${newRole}`,
    data: { oldRole, newRole },
  });
}

/**
 * Internal helper: Create notification for team invite.
 */
export async function notifyTeamInvite(
  tenantId: string,
  userId: string,
  inviterName: string,
  tenantName: string
): Promise<NotificationDto> {
  return createNotification(tenantId, {
    userId,
    type: 'team_invite',
    title: 'You have been invited to a team',
    message: `${inviterName} has invited you to join ${tenantName}`,
    data: { inviterName, tenantName },
  });
}
