import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../errors/index.js';
import { sendError } from '../utils/response.js';
import { logError } from '../utils/logger.js';
import { isProduction } from '../../config/index.js';

/**
 * Global error handling middleware.
 *
 * @remarks
 * Following Clean Code principles:
 * - Centralized error handling
 * - Consistent error response format
 * - Proper logging for debugging
 * - Security: hide internal errors in production
 */
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response {
  // Log error with context
  logError(error, {
    method: req.method,
    path: req.path,
    userId: req.user?.userId,
    tenantId: req.tenantId,
  });

  // Handle known application errors
  if (error instanceof AppError) {
    // Handle validation errors with field-level details
    if (error instanceof ValidationError) {
      return sendError(res, error.code, error.message, error.statusCode, error.errors);
    }

    return sendError(res, error.code, error.message, error.statusCode);
  }

  // Handle unknown errors
  const message = isProduction ? 'An unexpected error occurred' : error.message;

  return sendError(res, 'INTERNAL_ERROR', message, 500);
}

/**
 * 404 handler for undefined routes.
 */
export function notFoundHandler(req: Request, res: Response): Response {
  return sendError(res, 'NOT_FOUND', `Route ${req.method} ${req.path} not found`, 404);
}

/**
 * Async handler wrapper to catch promise rejections.
 *
 * @example
 * ```typescript
 * router.get('/users', asyncHandler(async (req, res) => {
 *   const users = await userService.findAll();
 *   return sendSuccess(res, users);
 * }));
 * ```
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
