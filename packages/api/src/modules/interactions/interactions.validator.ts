/**
 * Interaction validation schemas using Zod.
 * Defines all input validation for interaction-related operations.
 */

import { z } from 'zod';
import { INTERACTION_TYPES, LIMITS, PAGINATION } from '../../config/constants.js';

// ─────────────────────────────────────────
// Interaction Type Enum
// ─────────────────────────────────────────
const interactionTypeValues = [
  INTERACTION_TYPES.CALL,
  INTERACTION_TYPES.EMAIL,
  INTERACTION_TYPES.MEETING,
  INTERACTION_TYPES.NOTE,
  INTERACTION_TYPES.TASK,
] as const;

// ─────────────────────────────────────────
// Create Interaction Schema
// ─────────────────────────────────────────
export const createInteractionSchema = z.object({
  clientId: z
    .string()
    .uuid('Invalid client ID'),

  type: z
    .enum(interactionTypeValues, {
      errorMap: () => ({ message: 'Invalid interaction type. Must be: call, email, meeting, note, or task' }),
    }),

  notes: z
    .string()
    .max(LIMITS.NOTES_MAX, `Notes must be at most ${LIMITS.NOTES_MAX} characters`)
    .trim()
    .optional()
    .or(z.literal('')),

  metadata: z
    .object({
      duration: z.number().int().min(0).optional(),
      outcome: z.string().max(100).optional(),
      scheduledAt: z.string().datetime().optional(),
      completedAt: z.string().datetime().optional(),
      subject: z.string().max(200).optional(),
      attendees: z.array(z.string().max(100)).max(20).optional(),
      location: z.string().max(200).optional(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
      status: z.enum(['pending', 'completed', 'cancelled']).optional(),
    })
    .passthrough()
    .optional(),
});

export type CreateInteractionInput = z.infer<typeof createInteractionSchema>;

// ─────────────────────────────────────────
// Update Interaction Schema
// ─────────────────────────────────────────
export const updateInteractionSchema = z.object({
  type: z
    .enum(interactionTypeValues)
    .optional(),

  notes: z
    .string()
    .max(LIMITS.NOTES_MAX)
    .trim()
    .optional()
    .or(z.literal(''))
    .nullable(),

  metadata: z
    .object({
      duration: z.number().int().min(0).optional(),
      outcome: z.string().max(100).optional(),
      scheduledAt: z.string().datetime().optional(),
      completedAt: z.string().datetime().optional(),
      subject: z.string().max(200).optional(),
      attendees: z.array(z.string().max(100)).max(20).optional(),
      location: z.string().max(200).optional(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
      status: z.enum(['pending', 'completed', 'cancelled']).optional(),
    })
    .passthrough()
    .optional()
    .nullable(),
});

export type UpdateInteractionInput = z.infer<typeof updateInteractionSchema>;

// ─────────────────────────────────────────
// Query Parameters Schema
// ─────────────────────────────────────────
export const listInteractionsQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(PAGINATION.DEFAULT_PAGE),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(PAGINATION.MAX_LIMIT)
    .default(PAGINATION.DEFAULT_LIMIT),

  clientId: z
    .string()
    .uuid()
    .optional(),

  userId: z
    .string()
    .uuid()
    .optional(),

  type: z
    .enum(interactionTypeValues)
    .optional(),

  startDate: z
    .string()
    .datetime()
    .optional(),

  endDate: z
    .string()
    .datetime()
    .optional(),

  sortBy: z
    .enum(['createdAt', 'updatedAt', 'type'])
    .default('createdAt'),

  sortOrder: z
    .enum(['asc', 'desc'])
    .default('desc'),
});

export type ListInteractionsQuery = z.infer<typeof listInteractionsQuerySchema>;

// ─────────────────────────────────────────
// ID Parameter Schemas
// ─────────────────────────────────────────
export const interactionIdParamSchema = z.object({
  id: z.string().uuid('Invalid interaction ID'),
});

export type InteractionIdParam = z.infer<typeof interactionIdParamSchema>;

export const clientIdParamSchema = z.object({
  clientId: z.string().uuid('Invalid client ID'),
});

export type ClientIdParam = z.infer<typeof clientIdParamSchema>;

// ─────────────────────────────────────────
// Client Timeline Query Schema
// ─────────────────────────────────────────
export const clientTimelineQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(PAGINATION.DEFAULT_PAGE),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(PAGINATION.MAX_LIMIT)
    .default(PAGINATION.DEFAULT_LIMIT),

  type: z
    .enum(interactionTypeValues)
    .optional(),
});

export type ClientTimelineQuery = z.infer<typeof clientTimelineQuerySchema>;
