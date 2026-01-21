import rateLimit from 'express-rate-limit';
import { env } from '../../config/index.js';
import { TooManyRequestsError } from '../errors/index.js';

/**
 * Rate limiting middleware configuration.
 *
 * @remarks
 * Protects API from abuse and DoS attacks.
 * Different limits for different endpoints.
 */

/**
 * Default rate limiter for general API endpoints.
 */
export const defaultRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: () => {
    throw new TooManyRequestsError();
  },
  keyGenerator: req => {
    // Use user ID if authenticated, otherwise IP
    return req.user?.userId ?? req.ip ?? 'unknown';
  },
});

/**
 * Strict rate limiter for authentication endpoints.
 * Prevents brute force attacks.
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  handler: () => {
    throw new TooManyRequestsError('Too many authentication attempts, please try again later');
  },
  keyGenerator: req => req.ip ?? 'unknown',
  skipSuccessfulRequests: true,
});

/**
 * Rate limiter for password reset.
 */
export const passwordResetRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts per hour
  standardHeaders: true,
  legacyHeaders: false,
  handler: () => {
    throw new TooManyRequestsError('Too many password reset requests, please try again later');
  },
  keyGenerator: req => req.ip ?? 'unknown',
});
