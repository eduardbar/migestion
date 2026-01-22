import { prisma } from '../../infrastructure/prisma/client.js';
import { Tenant, User, RefreshToken } from '@prisma/client';

/**
 * Auth repository - handles database operations for authentication.
 *
 * @remarks
 * Following Repository Pattern:
 * - Encapsulates data access logic
 * - Provides domain-specific query methods
 * - Easy to mock for testing
 */

// ─────────────────────────────────────────
// Tenant Operations
// ─────────────────────────────────────────

export async function createTenant(data: { name: string; slug: string }): Promise<Tenant> {
  return prisma.tenant.create({
    data: {
      name: data.name,
      slug: data.slug,
      status: 'active',
    },
  });
}

export async function findTenantBySlug(slug: string): Promise<Tenant | null> {
  return prisma.tenant.findUnique({
    where: { slug },
  });
}

export async function findTenantById(id: string): Promise<Tenant | null> {
  return prisma.tenant.findUnique({
    where: { id },
  });
}

// ─────────────────────────────────────────
// User Operations
// ─────────────────────────────────────────

export async function createUser(data: {
  tenantId: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: string;
}): Promise<User> {
  return prisma.user.create({
    data: {
      tenantId: data.tenantId,
      email: data.email,
      passwordHash: data.passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      status: 'active',
    },
  });
}

export async function findUserByEmail(tenantId: string, email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      tenantId_email: {
        tenantId,
        email,
      },
    },
  });
}

export async function findUserByEmailAcrossTenants(
  email: string
): Promise<(User & { tenant: Tenant }) | null> {
  return prisma.user.findFirst({
    where: { email },
    include: { tenant: true },
  });
}

export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function findUserWithTenant(id: string): Promise<(User & { tenant: Tenant }) | null> {
  return prisma.user.findUnique({
    where: { id },
    include: { tenant: true },
  });
}

export async function updateUserLastLogin(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: { lastLoginAt: new Date() },
  });
}

// ─────────────────────────────────────────
// Refresh Token Operations
// ─────────────────────────────────────────

export async function createRefreshToken(data: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}): Promise<RefreshToken> {
  return prisma.refreshToken.create({
    data: {
      userId: data.userId,
      tokenHash: data.tokenHash,
      expiresAt: data.expiresAt,
    },
  });
}

export async function findRefreshTokenByHash(tokenHash: string): Promise<RefreshToken | null> {
  return prisma.refreshToken.findUnique({
    where: { tokenHash },
  });
}

export async function revokeRefreshToken(tokenHash: string): Promise<void> {
  await prisma.refreshToken.update({
    where: { tokenHash },
    data: { revokedAt: new Date() },
  });
}

export async function revokeAllUserRefreshTokens(userId: string): Promise<void> {
  await prisma.refreshToken.updateMany({
    where: {
      userId,
      revokedAt: null,
    },
    data: { revokedAt: new Date() },
  });
}

export async function deleteExpiredRefreshTokens(): Promise<number> {
  const result = await prisma.refreshToken.deleteMany({
    where: {
      OR: [{ expiresAt: { lt: new Date() } }, { revokedAt: { not: null } }],
    },
  });
  return result.count;
}

// ─────────────────────────────────────────
// Transaction: Create Tenant + User
// ─────────────────────────────────────────

export async function createTenantWithOwner(data: {
  tenantName: string;
  tenantSlug: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
}): Promise<{ tenant: Tenant; user: User }> {
  return prisma.$transaction(
    async (
      tx: Omit<
        typeof prisma,
        '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
      >
    ) => {
      const tenant = await tx.tenant.create({
        data: {
          name: data.tenantName,
          slug: data.tenantSlug,
          status: 'active',
        },
      });

      const user = await tx.user.create({
        data: {
          tenantId: tenant.id,
          email: data.email,
          passwordHash: data.passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'owner',
          status: 'active',
        },
      });

      return { tenant, user };
    }
  );
}
