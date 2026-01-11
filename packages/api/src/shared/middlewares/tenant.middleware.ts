import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/index.js';

/**
 * Multi-tenant middleware.
 * Ensures tenant isolation for all data operations.
 * 
 * @remarks
 * This middleware should be applied after authentication.
 * It extracts and validates tenant context for database queries.
 * 
 * Following security-by-default principle:
 * - No tenant = no access to tenant-scoped data
 * - Tenant ID comes from authenticated user token only
 */
export function requireTenant(req: Request, _res: Response, next: NextFunction): void {
  // Tenant ID should be set by auth middleware from JWT
  if (!req.tenantId) {
    return next(new UnauthorizedError('Tenant context required'));
  }

  // Double-check that user belongs to claimed tenant
  if (req.user && req.user.tenantId !== req.tenantId) {
    return next(new UnauthorizedError('Tenant mismatch'));
  }

  next();
}

/**
 * Extract tenant from subdomain (optional pattern).
 * Can be used for subdomain-based multi-tenancy.
 * 
 * @example
 * acme.migestion.com -> tenantSlug = 'acme'
 */
export function extractTenantFromSubdomain(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const host = req.hostname;
  const parts = host.split('.');

  // Subdomain pattern: {tenant}.migestion.com
  if (parts.length >= 3) {
    const tenantSlug = parts[0];
    // Store slug for lookup (actual tenant ID resolved in auth)
    req.headers['x-tenant-slug'] = tenantSlug;
  }

  next();
}
