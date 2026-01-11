import bcrypt from 'bcrypt';
import { env } from '../../config/index.js';

/**
 * Password utility functions.
 * Handles secure hashing and comparison.
 * 
 * @remarks
 * Uses bcrypt with configurable rounds for production flexibility.
 */

/**
 * Hash a plain text password.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, env.BCRYPT_ROUNDS);
}

/**
 * Compare a plain text password with a hash.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Check if a password meets security requirements.
 * Returns validation errors or empty array if valid.
 */
export function validatePasswordStrength(password: string): string[] {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return errors;
}

// Alias for backward compatibility
export const verifyPassword = comparePassword;
