import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../errors/index.js';

/**
 * Request validation middleware using Zod schemas.
 * 
 * @remarks
 * Following Clean Code principles:
 * - Centralized validation logic
 * - Type-safe request handling
 * - Clear error messages for API consumers
 * 
 * @example
 * ```typescript
 * const createUserSchema = z.object({
 *   body: z.object({
 *     email: z.string().email(),
 *     password: z.string().min(8),
 *   }),
 * });
 * 
 * router.post('/users', validate(createUserSchema), createUser);
 * ```
 */

interface ValidationSchemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export function validate(schemas: ValidationSchemas) {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors: Record<string, string[]> = {};

      // Validate body
      if (schemas.body) {
        const result = schemas.body.safeParse(req.body);
        if (!result.success) {
          mergeZodErrors(result.error, errors, 'body');
        } else {
          req.body = result.data;
        }
      }

      // Validate query parameters
      if (schemas.query) {
        const result = schemas.query.safeParse(req.query);
        if (!result.success) {
          mergeZodErrors(result.error, errors, 'query');
        } else {
          req.query = result.data;
        }
      }

      // Validate URL parameters
      if (schemas.params) {
        const result = schemas.params.safeParse(req.params);
        if (!result.success) {
          mergeZodErrors(result.error, errors, 'params');
        } else {
          req.params = result.data;
        }
      }

      // If any validation errors, throw
      if (Object.keys(errors).length > 0) {
        throw new ValidationError(errors);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Merge Zod validation errors into a flat error object.
 */
function mergeZodErrors(
  zodError: ZodError,
  errors: Record<string, string[]>,
  prefix: string
): void {
  for (const issue of zodError.issues) {
    const path = issue.path.length > 0
      ? `${prefix}.${issue.path.join('.')}`
      : prefix;

    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path]!.push(issue.message);
  }
}

/**
 * Validate only request body (shorthand).
 */
export function validateBody(schema: ZodSchema) {
  return validate({ body: schema });
}

/**
 * Validate only query parameters (shorthand).
 */
export function validateQuery(schema: ZodSchema) {
  return validate({ query: schema });
}

/**
 * Validate only URL parameters (shorthand).
 */
export function validateParams(schema: ZodSchema) {
  return validate({ params: schema });
}
