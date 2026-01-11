/**
 * Audit Middleware.
 * Extracts audit context from request for use in services.
 */

import type { Request, Response, NextFunction } from 'express';

/**
 * Audit context for logging operations.
 */
export interface AuditContext {
  tenantId: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Extracts audit context from the request.
 */
export function getAuditContext(req: Request): AuditContext {
  return {
    tenantId: req.tenantId!,
    userId: req.user?.userId,
    ipAddress: getClientIp(req),
    userAgent: req.get('user-agent')?.substring(0, 500),
  };
}

/**
 * Get the client's IP address, accounting for proxies.
 */
function getClientIp(req: Request): string | undefined {
  // Check X-Forwarded-For header (set by proxies)
  const forwardedFor = req.get('x-forwarded-for');
  if (forwardedFor) {
    // The first IP in the list is the client's IP
    const firstIp = forwardedFor.split(',')[0];
    if (firstIp) return firstIp.trim();
  }

  // Check X-Real-IP header (set by some proxies)
  const realIp = req.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback to socket remote address
  return req.socket.remoteAddress;
}

/**
 * Middleware that attaches audit context to the request.
 * Use this when you want to access audit context in controllers.
 */
export function attachAuditContext(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  // Attach a getter function to the request
  (req as Request & { getAuditContext: () => AuditContext }).getAuditContext = () =>
    getAuditContext(req);
  next();
}
