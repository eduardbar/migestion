/**
 * Notification Repository.
 * Handles all database operations for notifications.
 * All queries are scoped by tenantId for multi-tenant isolation.
 */

import { prisma } from '../../infrastructure/prisma/client.js';
import type { Notification, Prisma } from '@prisma/client';
import type { NotificationType } from './notifications.validator.js';

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────
export interface CreateNotificationData {
  tenantId: string;
  userId: string;
  type: NotificationType;
  title: string;
  message?: string;
  data?: Record<string, unknown>;
}

export interface ListNotificationsOptions {
  tenantId: string;
  userId: string;
  page: number;
  limit: number;
  unreadOnly?: boolean;
  type?: NotificationType;
  sortOrder: 'asc' | 'desc';
}

// ─────────────────────────────────────────
// Repository Functions
// ─────────────────────────────────────────

/**
 * Create a new notification.
 */
export async function createNotification(data: CreateNotificationData): Promise<Notification> {
  return prisma.notification.create({
    data: {
      tenantId: data.tenantId,
      userId: data.userId,
      type: data.type,
      title: data.title,
      message: data.message,
      data: data.data as Prisma.InputJsonValue,
    },
  });
}

/**
 * Create multiple notifications (bulk insert).
 */
export async function createManyNotifications(
  notifications: CreateNotificationData[]
): Promise<{ count: number }> {
  return prisma.notification.createMany({
    data: notifications.map(n => ({
      tenantId: n.tenantId,
      userId: n.userId,
      type: n.type,
      title: n.title,
      message: n.message,
      data: n.data as Prisma.InputJsonValue,
    })),
  });
}

/**
 * Find notification by ID within tenant scope.
 */
export async function findNotificationById(
  tenantId: string,
  id: string
): Promise<Notification | null> {
  return prisma.notification.findFirst({
    where: {
      id,
      tenantId,
    },
  });
}

/**
 * Find notification by ID and user ID.
 */
export async function findNotificationByIdAndUser(
  tenantId: string,
  userId: string,
  id: string
): Promise<Notification | null> {
  return prisma.notification.findFirst({
    where: {
      id,
      tenantId,
      userId,
    },
  });
}

/**
 * List notifications with filtering and pagination.
 */
export async function listNotifications(
  options: ListNotificationsOptions
): Promise<{ notifications: Notification[]; total: number }> {
  const { tenantId, userId, page, limit, unreadOnly, type, sortOrder } = options;

  const where: Prisma.NotificationWhereInput = {
    tenantId,
    userId,
    ...(unreadOnly && { read: false }),
    ...(type && { type }),
  };

  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where,
      orderBy: { createdAt: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.notification.count({ where }),
  ]);

  return { notifications, total };
}

/**
 * Count notifications for a user.
 */
export async function countNotifications(
  tenantId: string,
  userId: string
): Promise<{ total: number; unread: number }> {
  const [total, unread] = await Promise.all([
    prisma.notification.count({
      where: { tenantId, userId },
    }),
    prisma.notification.count({
      where: { tenantId, userId, read: false },
    }),
  ]);

  return { total, unread };
}

/**
 * Count unread notifications for a user.
 */
export async function countUnreadNotifications(tenantId: string, userId: string): Promise<number> {
  return prisma.notification.count({
    where: {
      tenantId,
      userId,
      read: false,
    },
  });
}

/**
 * Mark a single notification as read.
 */
export async function markNotificationAsRead(
  tenantId: string,
  userId: string,
  id: string
): Promise<Notification | null> {
  const notification = await findNotificationByIdAndUser(tenantId, userId, id);

  if (!notification) {
    return null;
  }

  return prisma.notification.update({
    where: { id },
    data: { read: true },
  });
}

/**
 * Mark multiple notifications as read.
 */
export async function markManyNotificationsAsRead(
  tenantId: string,
  userId: string,
  ids: string[]
): Promise<{ count: number }> {
  return prisma.notification.updateMany({
    where: {
      id: { in: ids },
      tenantId,
      userId,
    },
    data: { read: true },
  });
}

/**
 * Mark all notifications as read for a user.
 */
export async function markAllNotificationsAsRead(
  tenantId: string,
  userId: string
): Promise<{ count: number }> {
  return prisma.notification.updateMany({
    where: {
      tenantId,
      userId,
      read: false,
    },
    data: { read: true },
  });
}

/**
 * Delete a notification.
 */
export async function deleteNotification(
  tenantId: string,
  userId: string,
  id: string
): Promise<Notification | null> {
  const notification = await findNotificationByIdAndUser(tenantId, userId, id);

  if (!notification) {
    return null;
  }

  return prisma.notification.delete({
    where: { id },
  });
}

/**
 * Delete all read notifications for a user (cleanup).
 */
export async function deleteReadNotifications(
  tenantId: string,
  userId: string
): Promise<{ count: number }> {
  return prisma.notification.deleteMany({
    where: {
      tenantId,
      userId,
      read: true,
    },
  });
}

/**
 * Delete old notifications (older than specified days).
 */
export async function deleteOldNotifications(
  tenantId: string,
  daysOld: number
): Promise<{ count: number }> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  return prisma.notification.deleteMany({
    where: {
      tenantId,
      createdAt: { lt: cutoffDate },
    },
  });
}
