/**
 * Segment validation schemas using Zod.
 * Defines all input validation for segment operations.
 */

import { z } from 'zod';
import { PAGINATION } from '../../config/constants.js';

// ─────────────────────────────────────────
// Create Segment Schema
// ─────────────────────────────────────────
export const createSegmentSchema = z.object({
  name: z
    .string()
    .min(2, 'Segment name must be at least 2 characters')
    .max(100, 'Segment name must be at most 100 characters')
    .trim(),

  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color (e.g., #FF5733)')
    .optional(),

  criteria: z
    .object({
      status: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      assignedToId: z.string().uuid().optional(),
      createdAfter: z.string().datetime().optional(),
      createdBefore: z.string().datetime().optional(),
    })
    .optional(),
});

export type CreateSegmentInput = z.infer<typeof createSegmentSchema>;

// ─────────────────────────────────────────
// Update Segment Schema
// ─────────────────────────────────────────
export const updateSegmentSchema = z.object({
  name: z
    .string()
    .min(2, 'Segment name must be at least 2 characters')
    .max(100, 'Segment name must be at most 100 characters')
    .trim()
    .optional(),

  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color')
    .optional()
    .nullable(),

  criteria: z
    .object({
      status: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      assignedToId: z.string().uuid().optional(),
      createdAfter: z.string().datetime().optional(),
      createdBefore: z.string().datetime().optional(),
    })
    .optional()
    .nullable(),
});

export type UpdateSegmentInput = z.infer<typeof updateSegmentSchema>;

// ─────────────────────────────────────────
// Query Parameters Schema
// ─────────────────────────────────────────
export const listSegmentsQuerySchema = z.object({
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

  search: z
    .string()
    .max(100)
    .trim()
    .optional(),

  sortBy: z
    .enum(['name', 'createdAt', 'updatedAt'])
    .default('name'),

  sortOrder: z
    .enum(['asc', 'desc'])
    .default('asc'),
});

export type ListSegmentsQuery = z.infer<typeof listSegmentsQuerySchema>;

// ─────────────────────────────────────────
// ID Parameter Schema
// ─────────────────────────────────────────
export const segmentIdParamSchema = z.object({
  id: z.string().uuid('Invalid segment ID'),
});

export type SegmentIdParam = z.infer<typeof segmentIdParamSchema>;
