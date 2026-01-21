import { api } from './api';
import type { Notification, PaginationMeta } from '@/types';

/**
 * Notifications service.
 * Handles all notification-related API calls.
 */

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

export interface NotificationListParams {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
  type?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface NotificationListResponse {
  data: Notification[];
  pagination: PaginationMeta;
  unreadCount: number;
}

export interface NotificationCounts {
  total: number;
  unread: number;
}

export interface MarkReadResult {
  markedCount: number;
}

// ─────────────────────────────────────────
// Read Operations
// ─────────────────────────────────────────

/**
 * Get a list of notifications with filtering and pagination.
 */
export async function getNotifications(
  params: NotificationListParams = {}
): Promise<NotificationListResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set('page', String(params.page));
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.unreadOnly) searchParams.set('unreadOnly', 'true');
  if (params.type) searchParams.set('type', params.type);
  if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);

  const query = searchParams.toString();
  const endpoint = `/notifications${query ? `?${query}` : ''}`;

  return api.get<NotificationListResponse>(endpoint);
}

/**
 * Get a single notification by ID.
 */
export async function getNotification(id: string): Promise<Notification> {
  return api.get<Notification>(`/notifications/${id}`);
}

/**
 * Get notification counts.
 */
export async function getNotificationCounts(): Promise<NotificationCounts> {
  return api.get<NotificationCounts>('/notifications/count');
}

// ─────────────────────────────────────────
// Write Operations
// ─────────────────────────────────────────

/**
 * Mark a single notification as read.
 */
export async function markAsRead(id: string): Promise<Notification> {
  return api.patch<Notification>(`/notifications/${id}/read`);
}

/**
 * Mark multiple notifications as read.
 */
export async function markMultipleAsRead(ids: string[]): Promise<MarkReadResult> {
  return api.patch<MarkReadResult>('/notifications/read', { ids });
}

/**
 * Mark all notifications as read.
 */
export async function markAllAsRead(): Promise<MarkReadResult> {
  return api.patch<MarkReadResult>('/notifications/read-all');
}

/**
 * Delete a notification.
 */
export async function deleteNotification(id: string): Promise<void> {
  return api.delete(`/notifications/${id}`);
}

/**
 * Delete all read notifications.
 */
export async function deleteReadNotifications(): Promise<{ count: number }> {
  return api.delete<{ count: number }>('/notifications/read');
}
