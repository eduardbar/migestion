/**
 * Notification validation schemas using Zod.
 * Defines all input validation for notification operations.
 */

import { z } from 'zod';
import { PAGINATION } from '../../config/constants.js';

// ─────────────────────────────────────────
// Notification Types
// ─────────────────────────────────────────
export const NOTIFICATION_TYPES = [
  'client_assigned',
  'client_status_changed',
  'interaction_created',
  'team_invite',
  'role_changed',
  'segment_match',
  'reminder',
  'system',
] as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

// ─────────────────────────────────────────
// Create Notification Schema
// ─────────────────────────────────────────
export const createNotificationSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),

  type: z.enum(NOTIFICATION_TYPES, {
    errorMap: () => ({ message: 'Invalid notification type' }),
  }),

  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be at most 200 characters')
    .trim(),

  message: z.string().max(1000, 'Message must be at most 1000 characters').trim().optional(),

  data: z.record(z.unknown()).optional(),
});

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;

// ─────────────────────────────────────────
// Bulk Create Notifications Schema
// ─────────────────────────────────────────
export const bulkCreateNotificationsSchema = z.object({
  userIds: z
    .array(z.string().uuid('Invalid user ID'))
    .min(1, 'At least one user ID is required')
    .max(100, 'Cannot send to more than 100 users at once'),

  type: z.enum(NOTIFICATION_TYPES, {
    errorMap: () => ({ message: 'Invalid notification type' }),
  }),

  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be at most 200 characters')
    .trim(),

  message: z.string().max(1000, 'Message must be at most 1000 characters').trim().optional(),

  data: z.record(z.unknown()).optional(),
});

export type BulkCreateNotificationsInput = z.infer<typeof bulkCreateNotificationsSchema>;

// ─────────────────────────────────────────
// Query Parameters Schema
// ─────────────────────────────────────────
export const listNotificationsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(PAGINATION.DEFAULT_PAGE),

  limit: z.coerce.number().int().min(1).max(PAGINATION.MAX_LIMIT).default(PAGINATION.DEFAULT_LIMIT),

  unreadOnly: z
    .string()
    .transform(val => val === 'true')
    .optional(),

  type: z.enum(NOTIFICATION_TYPES).optional(),

  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type ListNotificationsQuery = z.infer<typeof listNotificationsQuerySchema>;

// ─────────────────────────────────────────
// ID Parameter Schema
// ─────────────────────────────────────────
export const notificationIdParamSchema = z.object({
  id: z.string().uuid('Invalid notification ID'),
});

export type NotificationIdParam = z.infer<typeof notificationIdParamSchema>;

// ─────────────────────────────────────────
// Mark Multiple as Read Schema
// ─────────────────────────────────────────
export const markMultipleReadSchema = z.object({
  ids: z
    .array(z.string().uuid('Invalid notification ID'))
    .min(1, 'At least one notification ID is required')
    .max(100, 'Cannot mark more than 100 notifications at once'),
});

export type MarkMultipleReadInput = z.infer<typeof markMultipleReadSchema>;
