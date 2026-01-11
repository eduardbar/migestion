import jwt, { type SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../../config/index.js';
import { InvalidTokenError, TokenExpiredError } from '../errors/index.js';

/**
 * JWT token payload structure.
 */
export interface AccessTokenPayload {
  userId: string;
  tenantId: string;
  email: string;
  role: string;
}

export interface RefreshTokenPayload {
  userId: string;
  tokenId: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
}

/**
 * Parse duration string (e.g., '15m', '7d') to milliseconds.
 */
function parseDuration(duration: string): number {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) {
    throw new Error(`Invalid duration format: ${duration}`);
  }

  const value = parseInt(match[1]!, 10);
  const unit = match[2];

  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * (multipliers[unit!] ?? 1000);
}

/**
 * Generate a cryptographically secure random token ID.
 */
export function generateTokenId(): string {
  return crypto.randomUUID();
}

/**
 * Hash a refresh token for secure storage.
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Generate access and refresh token pair.
 */
export function generateTokenPair(payload: AccessTokenPayload): TokenPair {
  const tokenId = generateTokenId();
  const now = Date.now();

  const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRY,
    issuer: 'migestion',
    audience: 'migestion-api',
  } as SignOptions);

  const refreshToken = jwt.sign(
    { userId: payload.userId, tokenId } as RefreshTokenPayload,
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.JWT_REFRESH_EXPIRY,
      issuer: 'migestion',
    } as SignOptions
  );

  const accessTokenExpiresAt = new Date(now + parseDuration(env.JWT_ACCESS_EXPIRY));
  const refreshTokenExpiresAt = new Date(now + parseDuration(env.JWT_REFRESH_EXPIRY));

  return {
    accessToken,
    refreshToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
  };
}

/**
 * Verify access token and return payload.
 */
export function verifyAccessToken(token: string): AccessTokenPayload {
  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET, {
      issuer: 'migestion',
      audience: 'migestion-api',
    });

    return decoded as AccessTokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenExpiredError();
    }
    throw new InvalidTokenError();
  }
}

/**
 * Verify refresh token and return payload.
 */
export function verifyRefreshToken(token: string): RefreshTokenPayload {
  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET, {
      issuer: 'migestion',
    });

    return decoded as RefreshTokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenExpiredError();
    }
    throw new InvalidTokenError();
  }
}

/**
 * Extract token from Authorization header.
 */
export function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.slice(7);
}
