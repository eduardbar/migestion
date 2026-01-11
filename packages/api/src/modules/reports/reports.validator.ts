/**
 * Reports validation schemas using Zod.
 * Defines all input validation for report/analytics operations.
 */

import { z } from 'zod';

// ─────────────────────────────────────────
// Date Range Schema
// ─────────────────────────────────────────
export const dateRangeSchema = z.object({
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format')
    .optional(),

  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'End date must be in YYYY-MM-DD format')
    .optional(),

  period: z
    .enum(['today', 'yesterday', 'last7days', 'last30days', 'thisMonth', 'lastMonth', 'thisYear', 'custom'])
    .default('last30days'),
});

export type DateRangeQuery = z.infer<typeof dateRangeSchema>;

// ─────────────────────────────────────────
// Dashboard Overview Query
// ─────────────────────────────────────────
export const dashboardQuerySchema = dateRangeSchema;

export type DashboardQuery = z.infer<typeof dashboardQuerySchema>;

// ─────────────────────────────────────────
// Client Stats Query
// ─────────────────────────────────────────
export const clientStatsQuerySchema = dateRangeSchema.extend({
  groupBy: z
    .enum(['status', 'segment', 'assignedTo', 'createdMonth'])
    .default('status'),
});

export type ClientStatsQuery = z.infer<typeof clientStatsQuerySchema>;

// ─────────────────────────────────────────
// Interaction Stats Query
// ─────────────────────────────────────────
export const interactionStatsQuerySchema = dateRangeSchema.extend({
  groupBy: z
    .enum(['type', 'user', 'client', 'day', 'week', 'month'])
    .default('type'),
});

export type InteractionStatsQuery = z.infer<typeof interactionStatsQuerySchema>;

// ─────────────────────────────────────────
// Team Performance Query
// ─────────────────────────────────────────
export const teamPerformanceQuerySchema = dateRangeSchema.extend({
  userId: z.string().uuid().optional(),
});

export type TeamPerformanceQuery = z.infer<typeof teamPerformanceQuerySchema>;

// ─────────────────────────────────────────
// Activity Timeline Query
// ─────────────────────────────────────────
export const activityTimelineQuerySchema = z.object({
  days: z.coerce
    .number()
    .int()
    .min(1)
    .max(365)
    .default(30),

  type: z
    .enum(['all', 'clients', 'interactions', 'users'])
    .default('all'),
});

export type ActivityTimelineQuery = z.infer<typeof activityTimelineQuerySchema>;
