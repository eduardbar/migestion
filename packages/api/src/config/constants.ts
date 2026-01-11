/**
 * Application constants.
 * Centralized configuration values that don't change at runtime.
 * 
 * @remarks
 * Following Clean Code: magic numbers and strings are extracted
 * to named constants for clarity and maintainability.
 */

// ─────────────────────────────────────────
// API Versioning
// ─────────────────────────────────────────
export const API_VERSION = 'v1';
export const API_PREFIX = `/api/${API_VERSION}`;

// ─────────────────────────────────────────
// User Roles (RBAC)
// ─────────────────────────────────────────
export const ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_HIERARCHY: Record<Role, number> = {
  [ROLES.OWNER]: 100,
  [ROLES.ADMIN]: 80,
  [ROLES.MANAGER]: 60,
  [ROLES.USER]: 40,
};

// ─────────────────────────────────────────
// Entity Status
// ─────────────────────────────────────────
export const TENANT_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  CANCELLED: 'cancelled',
} as const;

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
} as const;

export const CLIENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PROSPECT: 'prospect',
  CHURNED: 'churned',
} as const;

// ─────────────────────────────────────────
// Interaction Types
// ─────────────────────────────────────────
export const INTERACTION_TYPES = {
  CALL: 'call',
  EMAIL: 'email',
  MEETING: 'meeting',
  NOTE: 'note',
  TASK: 'task',
} as const;

// ─────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// ─────────────────────────────────────────
// Cache TTL (in seconds)
// ─────────────────────────────────────────
export const CACHE_TTL = {
  SHORT: 60,           // 1 minute
  MEDIUM: 300,         // 5 minutes
  LONG: 3600,          // 1 hour
  SESSION: 900,        // 15 minutes (matches access token)
  REFRESH_TOKEN: 604800, // 7 days
} as const;

// ─────────────────────────────────────────
// Validation Limits
// ─────────────────────────────────────────
export const LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 255,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 128,
  PHONE_MAX: 20,
  NOTES_MAX: 5000,
  SLUG_MIN: 3,
  SLUG_MAX: 50,
} as const;

// ─────────────────────────────────────────
// Time Constants
// ─────────────────────────────────────────
export const TIME = {
  MILLISECONDS_PER_SECOND: 1000,
  MILLISECONDS_PER_MINUTE: 60 * 1000,
  MILLISECONDS_PER_HOUR: 60 * 60 * 1000,
  MILLISECONDS_PER_DAY: 24 * 60 * 60 * 1000,
  MILLISECONDS_PER_WEEK: 7 * 24 * 60 * 60 * 1000,
  DAYS_IN_WEEK: 7,
  DAYS_IN_MONTH: 30,
} as const;

// ─────────────────────────────────────────
// Audit & Security
// ─────────────────────────────────────────
export const AUDIT = {
  MAX_USER_AGENT_LENGTH: 500,
  MAX_AUDIT_NOTES_LENGTH: 100,
  SENSITIVE_FIELDS: ['password', 'passwordHash', 'token', 'secret', 'apiKey', 'refreshToken'],
} as const;

// ─────────────────────────────────────────
// Notification Types
// ─────────────────────────────────────────
export const NOTIFICATION_TYPES = {
  CLIENT_ASSIGNED: 'client_assigned',
  ROLE_CHANGED: 'role_changed',
  TEAM_INVITE: 'team_invite',
  INTERACTION_CREATED: 'interaction_created',
  SYSTEM_ALERT: 'system_alert',
} as const;

// ─────────────────────────────────────────
// Default Values
// ─────────────────────────────────────────
export const DEFAULTS = {
  TEMP_PASSWORD_BYTES: 12,
  TEMP_PASSWORD_LENGTH: 16,
  TOP_CLIENTS_LIMIT: 10,
  ACTIVITY_TIMELINE_DAYS: 30,
} as const;
