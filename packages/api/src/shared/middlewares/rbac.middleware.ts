import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../errors/index.js';
import { Role, ROLE_HIERARCHY } from '../../config/constants.js';

/**
 * Role-based authorization middleware.
 * Checks if user has required role or higher.
 *
 * @remarks
 * Uses role hierarchy for flexible permission checking.
 * Higher roles automatically have lower role permissions.
 *
 * @example
 * ```typescript
 * router.delete('/users/:id', authorize('admin'), deleteUser);
 * router.get('/reports', authorize('manager'), getReports);
 * ```
 */
export function authorize(...allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ForbiddenError('Authentication required'));
    }

    const userRole = req.user.role;
    const userRoleLevel = ROLE_HIERARCHY[userRole] ?? 0;

    // Check if user's role is in allowed roles or has higher privilege
    const hasPermission = allowedRoles.some(role => {
      const requiredLevel = ROLE_HIERARCHY[role] ?? 0;
      return userRoleLevel >= requiredLevel;
    });

    if (!hasPermission) {
      return next(new ForbiddenError('Insufficient permissions'));
    }

    next();
  };
}

/**
 * Check if user has exact role (no hierarchy).
 */
export function requireExactRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ForbiddenError('Authentication required'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('This action requires a specific role'));
    }

    next();
  };
}

/**
 * Check if user is owner or admin of the tenant.
 */
export function requireTenantAdmin(req: Request, _res: Response, next: NextFunction): void {
  if (!req.user) {
    return next(new ForbiddenError('Authentication required'));
  }

  const adminRoles: Role[] = ['owner', 'admin'];
  if (!adminRoles.includes(req.user.role)) {
    return next(new ForbiddenError('Admin access required'));
  }

  next();
}

/**
 * Alias for authorize (backward compatibility).
 */
export const requireRole = authorize;
