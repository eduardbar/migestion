/**
 * Custom application errors with HTTP status codes.
 * Following Clean Code: errors are self-descriptive and domain-specific.
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

// ─────────────────────────────────────────
// Authentication Errors (401)
// ─────────────────────────────────────────
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Authentication required', code: string = 'UNAUTHORIZED') {
    super(message, 401, code);
  }
}

export class InvalidCredentialsError extends UnauthorizedError {
  constructor() {
    super('Invalid email or password', 'INVALID_CREDENTIALS');
  }
}

export class TokenExpiredError extends UnauthorizedError {
  constructor() {
    super('Token has expired', 'TOKEN_EXPIRED');
  }
}

export class InvalidTokenError extends UnauthorizedError {
  constructor() {
    super('Invalid token', 'INVALID_TOKEN');
  }
}

// ─────────────────────────────────────────
// Authorization Errors (403)
// ─────────────────────────────────────────
export class ForbiddenError extends AppError {
  constructor(message: string = 'Access denied', code: string = 'FORBIDDEN') {
    super(message, 403, code);
  }
}

export class InsufficientPermissionsError extends ForbiddenError {
  constructor() {
    super('Insufficient permissions for this action', 'INSUFFICIENT_PERMISSIONS');
  }
}

// ─────────────────────────────────────────
// Resource Errors (404)
// ─────────────────────────────────────────
export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

// ─────────────────────────────────────────
// Validation Errors (400)
// ─────────────────────────────────────────
export class ValidationError extends AppError {
  public readonly errors: Record<string, string[]>;

  constructor(errors: Record<string, string[]>) {
    super('Validation failed', 400, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Bad request', code: string = 'BAD_REQUEST') {
    super(message, 400, code);
  }
}

// ─────────────────────────────────────────
// Conflict Errors (409)
// ─────────────────────────────────────────
export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists', code: string = 'CONFLICT') {
    super(message, 409, code);
  }
}

export class DuplicateEmailError extends ConflictError {
  constructor() {
    super('Email already registered', 'DUPLICATE_EMAIL');
  }
}

export class DuplicateSlugError extends ConflictError {
  constructor() {
    super('Slug already in use', 'DUPLICATE_SLUG');
  }
}

// ─────────────────────────────────────────
// Rate Limit Errors (429)
// ─────────────────────────────────────────
export class TooManyRequestsError extends AppError {
  constructor(message: string = 'Too many requests, please try again later') {
    super(message, 429, 'TOO_MANY_REQUESTS');
  }
}

// ─────────────────────────────────────────
// Server Errors (500)
// ─────────────────────────────────────────
export class InternalError extends AppError {
  constructor(message: string = 'An unexpected error occurred') {
    super(message, 500, 'INTERNAL_ERROR', false);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500, 'DATABASE_ERROR', false);
  }
}
