/**
 * Client validation schemas using Zod.
 * Defines all input validation for client-related operations.
 */

import { z } from 'zod';
import { CLIENT_STATUS, LIMITS, PAGINATION } from '../../config/constants.js';

const optionalStringWithTransform = () =>
  z
    .string()
    .trim()
    .transform(val => (val === '' ? undefined : val))
    .optional();

export const createClientSchema = z.object({
  companyName: z
    .string()
    .min(LIMITS.NAME_MIN, `Company name must be at least ${LIMITS.NAME_MIN} characters`)
    .max(200, 'Company name must be at most 200 characters')
    .trim(),

  contactName: z
    .string()
    .min(LIMITS.NAME_MIN, `Contact name must be at least ${LIMITS.NAME_MIN} characters`)
    .max(200, 'Contact name must be at most 200 characters')
    .trim(),

  email: z
    .string()
    .email('Invalid email format')
    .max(LIMITS.EMAIL_MAX, `Email must be at most ${LIMITS.EMAIL_MAX} characters`)
    .toLowerCase()
    .trim()
    .optional(),

  phone: optionalStringWithTransform(),

  status: z
    .enum([
      CLIENT_STATUS.ACTIVE,
      CLIENT_STATUS.INACTIVE,
      CLIENT_STATUS.PROSPECT,
      CLIENT_STATUS.CHURNED,
    ])
    .default(CLIENT_STATUS.PROSPECT),

  segment: optionalStringWithTransform(),

  tags: z.array(z.string().max(50)).max(20, 'Maximum 20 tags allowed').optional(),

  address: optionalStringWithTransform(),

  notes: optionalStringWithTransform(),

  customFields: z.record(z.string(), z.unknown()).optional(),

  assignedToId: z.string().uuid('Invalid assigned user ID').optional(),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;

// ─────────────────────────────────────────
// Update Client Schema
// ─────────────────────────────────────────
export const updateClientSchema = z.object({
  companyName: z
    .string()
    .min(LIMITS.NAME_MIN, `Company name must be at least ${LIMITS.NAME_MIN} characters`)
    .max(200, 'Company name must be at most 200 characters')
    .trim()
    .optional(),

  contactName: z
    .string()
    .min(LIMITS.NAME_MIN, `Contact name must be at least ${LIMITS.NAME_MIN} characters`)
    .max(200, 'Contact name must be at most 200 characters')
    .trim()
    .optional(),

  email: z
    .string()
    .email('Invalid email format')
    .max(LIMITS.EMAIL_MAX)
    .toLowerCase()
    .trim()
    .optional(),

  phone: optionalStringWithTransform(),

  status: z
    .enum([
      CLIENT_STATUS.ACTIVE,
      CLIENT_STATUS.INACTIVE,
      CLIENT_STATUS.PROSPECT,
      CLIENT_STATUS.CHURNED,
    ])
    .optional(),

  segment: optionalStringWithTransform(),

  tags: z.array(z.string().max(50)).max(20).optional(),

  address: optionalStringWithTransform(),

  notes: optionalStringWithTransform(),

  customFields: z.record(z.string(), z.unknown()).optional(),

  assignedToId: z.string().uuid('Invalid assigned user ID').optional(),
});

export type UpdateClientInput = z.infer<typeof updateClientSchema>;

// ─────────────────────────────────────────
// Query Parameters Schema
// ─────────────────────────────────────────
export const listClientsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(PAGINATION.DEFAULT_PAGE),

  limit: z.coerce.number().int().min(1).max(PAGINATION.MAX_LIMIT).default(PAGINATION.DEFAULT_LIMIT),

  search: z.string().max(100).trim().optional(),

  status: z
    .enum([
      CLIENT_STATUS.ACTIVE,
      CLIENT_STATUS.INACTIVE,
      CLIENT_STATUS.PROSPECT,
      CLIENT_STATUS.CHURNED,
    ])
    .optional(),

  segment: z.string().max(50).trim().optional(),

  assignedToId: z.string().uuid().optional(),

  sortBy: z
    .enum(['companyName', 'contactName', 'createdAt', 'updatedAt', 'status'])
    .default('createdAt'),

  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type ListClientsQuery = z.infer<typeof listClientsQuerySchema>;

// ─────────────────────────────────────────
// ID Parameter Schema
// ─────────────────────────────────────────
export const clientIdParamSchema = z.object({
  id: z.string().uuid('Invalid client ID'),
});

export type ClientIdParam = z.infer<typeof clientIdParamSchema>;
