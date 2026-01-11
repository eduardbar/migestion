/**
 * Notification Data Transfer Objects.
 * Transforms database entities to API responses.
 */

import type { Notification } from '@prisma/client';
import type { NotificationType } from './notifications.validator.js';

// ─────────────────────────────────────────
// Response DTOs
// ─────────────────────────────────────────
export interface NotificationDto {
  id: string;
  type: NotificationType;
  title: string;
  message: string | null;
  data: Record<string, unknown> | null;
  read: boolean;
  createdAt: string;
}

export interface NotificationListDto {
  data: NotificationDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  unreadCount: number;
}

export interface NotificationCountDto {
  total: number;
  unread: number;
}

export interface MarkReadResultDto {
  markedCount: number;
}

// ─────────────────────────────────────────
// Mapper Functions
// ─────────────────────────────────────────

/**
 * Map Notification entity to DTO.
 */
export function toNotificationDto(notification: Notification): NotificationDto {
  return {
    id: notification.id,
    type: notification.type as NotificationType,
    title: notification.title,
    message: notification.message,
    data: notification.data as Record<string, unknown> | null,
    read: notification.read,
    createdAt: notification.createdAt.toISOString(),
  };
}

/**
 * Map array of Notification entities to DTOs.
 */
export function toNotificationDtoList(notifications: Notification[]): NotificationDto[] {
  return notifications.map(toNotificationDto);
}

/**
 * Build paginated notification list response.
 */
export function toNotificationListDto(
  notifications: Notification[],
  total: number,
  unreadCount: number,
  page: number,
  limit: number
): NotificationListDto {
  return {
    data: toNotificationDtoList(notifications),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    unreadCount,
  };
}
