import { User, Tenant, RefreshToken } from '@prisma/client';

/**
 * Auth module DTOs (Data Transfer Objects).
 * Separates internal entities from API responses.
 * 
 * @remarks
 * Following Clean Code: DTOs prevent exposing internal data structures.
 */

// ─────────────────────────────────────────
// Response DTOs
// ─────────────────────────────────────────

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  avatarUrl: string | null;
  createdAt: Date;
}

export interface TenantDto {
  id: string;
  name: string;
  slug: string;
  status: string;
  createdAt: Date;
}

export interface AuthResponseDto {
  user: UserDto;
  tenant: TenantDto;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface TokenRefreshResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

// ─────────────────────────────────────────
// Mapper Functions
// ─────────────────────────────────────────

/**
 * Map User entity to UserDto.
 * Excludes sensitive fields like passwordHash.
 */
export function toUserDto(user: User): UserDto {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    status: user.status,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
  };
}

/**
 * Map Tenant entity to TenantDto.
 * Excludes internal settings.
 */
export function toTenantDto(tenant: Tenant): TenantDto {
  return {
    id: tenant.id,
    name: tenant.name,
    slug: tenant.slug,
    status: tenant.status,
    createdAt: tenant.createdAt,
  };
}

/**
 * Build complete auth response.
 */
export function toAuthResponse(
  user: User,
  tenant: Tenant,
  accessToken: string,
  refreshToken: string,
  expiresAt: Date
): AuthResponseDto {
  return {
    user: toUserDto(user),
    tenant: toTenantDto(tenant),
    accessToken,
    refreshToken,
    expiresAt,
  };
}
