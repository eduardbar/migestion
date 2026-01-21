import { z } from 'zod';
import { LIMITS } from '../../config/constants.js';

/**
 * Authentication validation schemas.
 * Using Zod for type-safe request validation.
 */

/**
 * Registration schema - creates tenant + admin user.
 */
export const registerSchema = z.object({
  // Company/Tenant info
  companyName: z
    .string()
    .min(LIMITS.NAME_MIN, `Company name must be at least ${LIMITS.NAME_MIN} characters`)
    .max(LIMITS.NAME_MAX, `Company name must be at most ${LIMITS.NAME_MAX} characters`)
    .trim(),

  slug: z
    .string()
    .min(LIMITS.SLUG_MIN, `Slug must be at least ${LIMITS.SLUG_MIN} characters`)
    .max(LIMITS.SLUG_MAX, `Slug must be at most ${LIMITS.SLUG_MAX} characters`)
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .trim(),

  // Admin user info
  email: z.string().email('Invalid email format').max(LIMITS.EMAIL_MAX).toLowerCase().trim(),

  password: z
    .string()
    .min(LIMITS.PASSWORD_MIN, `Password must be at least ${LIMITS.PASSWORD_MIN} characters`)
    .max(LIMITS.PASSWORD_MAX)
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number'),

  firstName: z.string().min(LIMITS.NAME_MIN).max(LIMITS.NAME_MAX).trim(),

  lastName: z.string().min(LIMITS.NAME_MIN).max(LIMITS.NAME_MAX).trim(),
});

export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Login schema.
 */
export const loginSchema = z.object({
  email: z.string().email('Invalid email format').toLowerCase().trim(),

  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Refresh token schema.
 */
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;

/**
 * Forgot password schema.
 */
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format').toLowerCase().trim(),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

/**
 * Reset password schema.
 */
export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),

  password: z
    .string()
    .min(LIMITS.PASSWORD_MIN, `Password must be at least ${LIMITS.PASSWORD_MIN} characters`)
    .max(LIMITS.PASSWORD_MAX)
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
