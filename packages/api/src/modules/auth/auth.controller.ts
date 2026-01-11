import { Request, Response } from 'express';
import * as authService from './auth.service.js';
import * as auditService from '../audit/audit.service.js';
import { toUserDto, toTenantDto } from './auth.dto.js';
import { sendSuccess, sendCreated, sendNoContent } from '../../shared/utils/response.js';

/**
 * Auth controller - handles HTTP requests for authentication.
 * 
 * @remarks
 * Following Clean Code principles:
 * - Controllers are thin: delegate to services
 * - No business logic: only request/response handling
 * - Consistent response format via utilities
 */

/**
 * Get client IP from request.
 */
function getClientIp(req: Request): string {
  const forwardedFor = req.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0];
    if (firstIp) return firstIp.trim();
  }
  return req.get('x-real-ip') || req.socket.remoteAddress || 'unknown';
}

/**
 * POST /auth/register
 * Register a new tenant with owner user.
 */
export async function register(req: Request, res: Response): Promise<Response> {
  const result = await authService.register(req.body);

  // Audit log for new tenant creation
  auditService.log(
    {
      tenantId: result.tenant.id,
      userId: result.user.id,
      ipAddress: getClientIp(req),
      userAgent: req.get('user-agent')?.substring(0, 500),
    },
    {
      action: 'create',
      entity: 'tenant',
      entityId: result.tenant.id,
      newValues: { name: result.tenant.name, slug: result.tenant.slug },
    }
  );

  return sendCreated(res, result);
}

/**
 * POST /auth/login
 * Authenticate user and return tokens.
 */
export async function login(req: Request, res: Response): Promise<Response> {
  const result = await authService.login(req.body);

  // Audit login
  auditService.logLogin({
    tenantId: result.tenant.id,
    userId: result.user.id,
    ipAddress: getClientIp(req),
    userAgent: req.get('user-agent')?.substring(0, 500),
  });

  return sendSuccess(res, result);
}

/**
 * POST /auth/refresh
 * Refresh access token using refresh token.
 */
export async function refresh(req: Request, res: Response): Promise<Response> {
  const { refreshToken } = req.body;
  const result = await authService.refreshTokens(refreshToken);
  return sendSuccess(res, result);
}

/**
 * POST /auth/logout
 * Logout user and revoke refresh token.
 */
export async function logout(req: Request, res: Response): Promise<Response> {
  const { refreshToken } = req.body;
  
  // Audit logout before revoking token
  if (req.user && req.tenantId) {
    auditService.logLogout({
      tenantId: req.tenantId,
      userId: req.user.userId,
      ipAddress: getClientIp(req),
      userAgent: req.get('user-agent')?.substring(0, 500),
    });
  }

  if (refreshToken) {
    await authService.logout(refreshToken);
  }
  
  return sendNoContent(res);
}

/**
 * POST /auth/logout-all
 * Logout from all devices.
 */
export async function logoutAll(req: Request, res: Response): Promise<Response> {
  // Audit logout-all before revoking tokens
  if (req.user && req.tenantId) {
    auditService.log(
      {
        tenantId: req.tenantId,
        userId: req.user.userId,
        ipAddress: getClientIp(req),
        userAgent: req.get('user-agent')?.substring(0, 500),
      },
      {
        action: 'logout',
        entity: 'session',
        newValues: { allDevices: true },
      }
    );
  }

  await authService.logoutAll(req.user!.userId);
  return sendNoContent(res);
}

/**
 * GET /auth/me
 * Get current authenticated user profile.
 */
export async function me(req: Request, res: Response): Promise<Response> {
  const { user, tenant } = await authService.getCurrentUser(req.user!.userId);
  
  return sendSuccess(res, {
    user: toUserDto(user),
    tenant: toTenantDto(tenant),
  });
}
