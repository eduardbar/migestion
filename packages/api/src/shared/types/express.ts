/**
 * Express types with authentication support.
 * These extend the base Express Request with optional user context.
 */

import type { Request } from 'express';
import type { Role } from '../../config/constants.js';

/**
 * User payload from JWT token.
 */
export interface UserPayload {
  userId: string;
  tenantId: string;
  email: string;
  role: Role;
}

/**
 * Authenticated request interface.
 * Generic parameters:
 * - P: Route params (default: unknown)
 * - B: Request body (default: unknown)
 * - Q: Query string (default: unknown)
 */
export interface AuthenticatedRequest<P = unknown, B = unknown, Q = unknown> extends Request<
  P extends unknown ? Record<string, string> : P,
  unknown,
  B,
  Q extends unknown ? Record<string, string> : Q
> {
  user?: UserPayload;
  tenantId?: string;
}
