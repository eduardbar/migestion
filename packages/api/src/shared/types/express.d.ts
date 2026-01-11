import { Role } from '../../config/constants.js';

/**
 * Extended Express types for type-safe request handling.
 */

declare global {
  namespace Express {
    interface Request {
      /**
       * Authenticated user information.
       * Populated by auth middleware.
       */
      user?: {
        userId: string;
        tenantId: string;
        email: string;
        role: Role;
      };

      /**
       * Current tenant ID for multi-tenant queries.
       * Populated by tenant middleware.
       */
      tenantId?: string;

      /**
       * Request start time for duration logging.
       */
      startTime?: number;
    }
  }
}

export {};
