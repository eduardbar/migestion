import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/index.js';
import { verifyAccessToken, extractBearerToken } from '../utils/index.js';
import { Role } from '../../config/constants.js';

/**
 * Authentication middleware.
 * Verifies JWT access token and populates req.user.
 * 
 * @remarks
 * Following Single Responsibility Principle:
 * - Only handles token verification
 * - Authorization (role checking) is separate
 */
export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    const token = extractBearerToken(authHeader);

    if (!token) {
      throw new UnauthorizedError('Access token required');
    }

    const payload = verifyAccessToken(token);

    req.user = {
      userId: payload.userId,
      tenantId: payload.tenantId,
      email: payload.email,
      role: payload.role as Role,
    };

    req.tenantId = payload.tenantId;

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Optional authentication middleware.
 * Attempts to authenticate but doesn't fail if no token present.
 */
export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    const token = extractBearerToken(authHeader);

    if (token) {
      const payload = verifyAccessToken(token);
      req.user = {
        userId: payload.userId,
        tenantId: payload.tenantId,
        email: payload.email,
        role: payload.role as Role,
      };
      req.tenantId = payload.tenantId;
    }

    next();
  } catch {
    // Silently continue without authentication
    next();
  }
}
