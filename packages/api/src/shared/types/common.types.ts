/**
 * Common types used across the application.
 */

import { Request, Response, NextFunction } from 'express';
import { Role } from '../../config/constants.js';

// Extend Express Request to add custom properties
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        tenantId: string;
        email: string;
        role: Role;
      };
      tenantId?: string;
      startTime?: number;
    }
  }
}

/**
 * Async request handler wrapper type.
 */
export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;

/**
 * Pagination query parameters.
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Sort parameters.
 */
export interface SortParams {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

/**
 * Paginated result wrapper.
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Base entity with audit fields.
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Service result pattern for operations that can fail.
 */
export type ServiceResult<T, E = Error> = { success: true; data: T } | { success: false; error: E };
