import { User, Tenant } from '@prisma/client';
import * as authRepository from './auth.repository.js';
import { RegisterInput, LoginInput } from './auth.validator.js';
import { toAuthResponse, AuthResponseDto, TokenRefreshResponseDto } from './auth.dto.js';
import {
  hashPassword,
  comparePassword,
  generateTokenPair,
  verifyRefreshToken,
  hashToken,
} from '../../shared/utils/index.js';
import {
  InvalidCredentialsError,
  DuplicateEmailError,
  DuplicateSlugError,
  InvalidTokenError,
  NotFoundError,
} from '../../shared/errors/index.js';
import { USER_STATUS, TENANT_STATUS } from '../../config/constants.js';

/**
 * Auth service - business logic for authentication.
 *
 * @remarks
 * Following Clean Code principles:
 * - Single Responsibility: only handles auth logic
 * - Dependency Inversion: uses repository for data access
 * - No framework dependencies: pure business logic
 */

// ─────────────────────────────────────────
// Validation Helpers
// ─────────────────────────────────────────

type UserWithTenant = User & { tenant: Tenant };

/**
 * Ensure user account is in active status.
 * @throws {InvalidCredentialsError} if user is not active
 */
function ensureUserIsActive(user: User): void {
  if (user.status !== USER_STATUS.ACTIVE) {
    throw new InvalidCredentialsError();
  }
}

/**
 * Ensure tenant is in active status.
 * @throws {InvalidCredentialsError} if tenant is not active
 */
function ensureTenantIsActive(tenant: Tenant): void {
  if (tenant.status !== TENANT_STATUS.ACTIVE) {
    throw new InvalidCredentialsError();
  }
}

/**
 * Validate stored refresh token exists, is not revoked, and is not expired.
 * @throws {InvalidTokenError} if token is invalid
 */
function validateStoredRefreshToken(
  storedToken: { revokedAt: Date | null; expiresAt: Date } | null
): void {
  if (!storedToken || storedToken.revokedAt) {
    throw new InvalidTokenError();
  }
  if (storedToken.expiresAt < new Date()) {
    throw new InvalidTokenError();
  }
}

/**
 * Register a new tenant with owner user.
 */
export async function register(input: RegisterInput): Promise<AuthResponseDto> {
  // Check if slug is already taken
  const existingTenant = await authRepository.findTenantBySlug(input.slug);
  if (existingTenant) {
    throw new DuplicateSlugError();
  }

  // Check if email is already registered
  const existingUser = await authRepository.findUserByEmailAcrossTenants(input.email);
  if (existingUser) {
    throw new DuplicateEmailError();
  }

  // Hash password
  const passwordHash = await hashPassword(input.password);

  // Create tenant and owner user in transaction
  const { tenant, user } = await authRepository.createTenantWithOwner({
    tenantName: input.companyName,
    tenantSlug: input.slug,
    email: input.email,
    passwordHash,
    firstName: input.firstName,
    lastName: input.lastName,
  });

  // Generate tokens
  const tokenPair = generateTokenPair({
    userId: user.id,
    tenantId: tenant.id,
    email: user.email,
    role: user.role,
  });

  // Store refresh token
  await authRepository.createRefreshToken({
    userId: user.id,
    tokenHash: hashToken(tokenPair.refreshToken),
    expiresAt: tokenPair.refreshTokenExpiresAt,
  });

  return toAuthResponse(
    user,
    tenant,
    tokenPair.accessToken,
    tokenPair.refreshToken,
    tokenPair.accessTokenExpiresAt
  );
}

/**
 * Authenticate user with email and password.
 */
export async function login(input: LoginInput): Promise<AuthResponseDto> {
  // Find user by email (across all tenants for login)
  const userWithTenant = await authRepository.findUserByEmailAcrossTenants(input.email);

  if (!userWithTenant) {
    throw new InvalidCredentialsError();
  }

  // Verify password
  const isValidPassword = await comparePassword(input.password, userWithTenant.passwordHash);
  if (!isValidPassword) {
    throw new InvalidCredentialsError();
  }

  // Validate user and tenant are active
  ensureUserIsActive(userWithTenant);
  ensureTenantIsActive(userWithTenant.tenant);

  // Update last login
  await authRepository.updateUserLastLogin(userWithTenant.id);

  // Generate tokens
  const tokenPair = generateTokenPair({
    userId: userWithTenant.id,
    tenantId: userWithTenant.tenantId,
    email: userWithTenant.email,
    role: userWithTenant.role,
  });

  // Store refresh token
  await authRepository.createRefreshToken({
    userId: userWithTenant.id,
    tokenHash: hashToken(tokenPair.refreshToken),
    expiresAt: tokenPair.refreshTokenExpiresAt,
  });

  return toAuthResponse(
    userWithTenant,
    userWithTenant.tenant,
    tokenPair.accessToken,
    tokenPair.refreshToken,
    tokenPair.accessTokenExpiresAt
  );
}

/**
 * Refresh access token using refresh token.
 * Implements token rotation for security.
 */
export async function refreshTokens(refreshToken: string): Promise<TokenRefreshResponseDto> {
  // Verify refresh token
  const payload = verifyRefreshToken(refreshToken);

  // Check if token exists, is not revoked, and not expired
  const tokenHash = hashToken(refreshToken);
  const storedToken = await authRepository.findRefreshTokenByHash(tokenHash);
  validateStoredRefreshToken(storedToken);

  // Get user with tenant
  const userWithTenant = await authRepository.findUserWithTenant(payload.userId);
  if (!userWithTenant) {
    throw new NotFoundError('User');
  }

  // Revoke old refresh token (rotation)
  await authRepository.revokeRefreshToken(tokenHash);

  // Generate new token pair
  const tokenPair = generateTokenPair({
    userId: userWithTenant.id,
    tenantId: userWithTenant.tenantId,
    email: userWithTenant.email,
    role: userWithTenant.role,
  });

  // Store new refresh token
  await authRepository.createRefreshToken({
    userId: userWithTenant.id,
    tokenHash: hashToken(tokenPair.refreshToken),
    expiresAt: tokenPair.refreshTokenExpiresAt,
  });

  return {
    accessToken: tokenPair.accessToken,
    refreshToken: tokenPair.refreshToken,
    expiresAt: tokenPair.accessTokenExpiresAt,
  };
}

/**
 * Logout user by revoking refresh token.
 */
export async function logout(refreshToken: string): Promise<void> {
  const tokenHash = hashToken(refreshToken);
  const storedToken = await authRepository.findRefreshTokenByHash(tokenHash);

  if (storedToken && !storedToken.revokedAt) {
    await authRepository.revokeRefreshToken(tokenHash);
  }
}

/**
 * Logout from all devices by revoking all refresh tokens.
 */
export async function logoutAll(userId: string): Promise<void> {
  await authRepository.revokeAllUserRefreshTokens(userId);
}

/**
 * Get current user profile.
 */
export async function getCurrentUser(userId: string): Promise<{ user: User; tenant: Tenant }> {
  const userWithTenant = await authRepository.findUserWithTenant(userId);

  if (!userWithTenant) {
    throw new NotFoundError('User');
  }

  return {
    user: userWithTenant,
    tenant: userWithTenant.tenant,
  };
}
