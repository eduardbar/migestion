import { Response } from 'express';

/**
 * Standardized API response structure.
 * Ensures consistent response format across all endpoints.
 */

interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  meta?: ResponseMeta;
}

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    errors?: Record<string, string[]>;
  };
}

interface ResponseMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

/**
 * Send a successful response with data.
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  meta?: ResponseMeta
): Response {
  const response: SuccessResponse<T> = {
    success: true,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
}

/**
 * Send a successful response for created resources.
 */
export function sendCreated<T>(res: Response, data: T): Response {
  return sendSuccess(res, data, 201);
}

/**
 * Send a successful response with no content.
 */
export function sendNoContent(res: Response): Response {
  return res.status(204).send();
}

/**
 * Send an error response.
 */
export function sendError(
  res: Response,
  code: string,
  message: string,
  statusCode: number = 400,
  errors?: Record<string, string[]>
): Response {
  const response: ErrorResponse = {
    success: false,
    error: {
      code,
      message,
    },
  };

  if (errors) {
    response.error.errors = errors;
  }

  return res.status(statusCode).json(response);
}

/**
 * Build pagination metadata.
 */
export function buildPaginationMeta(
  page: number,
  limit: number,
  total: number
): ResponseMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Build a success response object (for use with res.json()).
 * Use this when you want to manually call res.json().
 */
export function success<T>(data: T, message?: string): SuccessResponse<T> {
  const response: SuccessResponse<T> = {
    success: true,
    data,
  };
  if (message) {
    response.message = message;
  }
  return response;
}

/**
 * Build a created response object (for use with res.status(201).json()).
 * Use this when you want to manually call res.json().
 */
export function created<T>(data: T, message?: string): SuccessResponse<T> {
  return success(data, message);
}
