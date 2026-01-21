/**
 * User validation schemas using Zod.
 * Defines all input validation for user/team management operations.
 */

import { z } from 'zod';
import { ROLES, USER_STATUS, LIMITS, PAGINATION } from '../../config/constants.js';

// ─────────────────────────────────────────
// Invite User Schema
// ─────────────────────────────────────────
export const inviteUserSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .max(LIMITS.EMAIL_MAX, `Email must be at most ${LIMITS.EMAIL_MAX} characters`)
    .toLowerCase()
    .trim(),

  firstName: z
    .string()
    .min(LIMITS.NAME_MIN, `First name must be at least ${LIMITS.NAME_MIN} characters`)
    .max(LIMITS.NAME_MAX, `First name must be at most ${LIMITS.NAME_MAX} characters`)
    .trim(),

  lastName: z
    .string()
    .min(LIMITS.NAME_MIN, `Last name must be at least ${LIMITS.NAME_MIN} characters`)
    .max(LIMITS.NAME_MAX, `Last name must be at most ${LIMITS.NAME_MAX} characters`)
    .trim(),

  role: z.enum([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]).default(ROLES.USER),
});

export type InviteUserInput = z.infer<typeof inviteUserSchema>;

// ─────────────────────────────────────────
// Update User Schema (self-update)
// ─────────────────────────────────────────
export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(LIMITS.NAME_MIN, `First name must be at least ${LIMITS.NAME_MIN} characters`)
    .max(LIMITS.NAME_MAX, `First name must be at most ${LIMITS.NAME_MAX} characters`)
    .trim()
    .optional(),

  lastName: z
    .string()
    .min(LIMITS.NAME_MIN, `Last name must be at least ${LIMITS.NAME_MIN} characters`)
    .max(LIMITS.NAME_MAX, `Last name must be at most ${LIMITS.NAME_MAX} characters`)
    .trim()
    .optional(),

  avatarUrl: z
    .string()
    .url('Invalid avatar URL')
    .max(500, 'Avatar URL must be at most 500 characters')
    .optional()
    .or(z.literal(''))
    .nullable(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// ─────────────────────────────────────────
// Update User Role Schema (admin action)
// ─────────────────────────────────────────
export const updateUserRoleSchema = z.object({
  role: z.enum([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]),
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;

// ─────────────────────────────────────────
// Update User Status Schema (admin action)
// ─────────────────────────────────────────
export const updateUserStatusSchema = z.object({
  status: z.enum([USER_STATUS.ACTIVE, USER_STATUS.INACTIVE]),
});

export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>;

// ─────────────────────────────────────────
// Change Password Schema
// ─────────────────────────────────────────
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),

  newPassword: z
    .string()
    .min(LIMITS.PASSWORD_MIN, `Password must be at least ${LIMITS.PASSWORD_MIN} characters`)
    .max(LIMITS.PASSWORD_MAX, `Password must be at most ${LIMITS.PASSWORD_MAX} characters`)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

// ─────────────────────────────────────────
// Query Parameters Schema
// ─────────────────────────────────────────
export const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(PAGINATION.DEFAULT_PAGE),

  limit: z.coerce.number().int().min(1).max(PAGINATION.MAX_LIMIT).default(PAGINATION.DEFAULT_LIMIT),

  search: z.string().max(100).trim().optional(),

  status: z.enum([USER_STATUS.ACTIVE, USER_STATUS.INACTIVE, USER_STATUS.PENDING]).optional(),

  role: z.enum([ROLES.OWNER, ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]).optional(),

  sortBy: z
    .enum(['firstName', 'lastName', 'email', 'createdAt', 'lastLoginAt', 'role'])
    .default('createdAt'),

  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;

// ─────────────────────────────────────────
// ID Parameter Schema
// ─────────────────────────────────────────
export const userIdParamSchema = z.object({
  id: z.string().uuid('Invalid user ID'),
});

export type UserIdParam = z.infer<typeof userIdParamSchema>;
