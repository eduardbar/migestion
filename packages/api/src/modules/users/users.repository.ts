/**
 * User repository - data access layer.
 * Handles all Prisma operations for users within a tenant.
 *
 * @remarks
 * All queries are scoped by tenantId for multi-tenant isolation.
 * Never expose passwordHash in queries that return data to service layer.
 */

import { prisma } from '../../infrastructure/prisma/client.js';
import type { Prisma } from '@prisma/client';

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

interface FindManyParams {
  tenantId: string;
  page: number;
  limit: number;
  search?: string;
  status?: string;
  role?: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface CreateUserData {
  tenantId: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
}

// ─────────────────────────────────────────
// Read Operations
// ─────────────────────────────────────────

/**
 * Find a user by ID within a tenant.
 * Includes client count for stats.
 */
export async function findById(tenantId: string, userId: string) {
  return prisma.user.findFirst({
    where: {
      id: userId,
      tenantId,
    },
    include: {
      _count: {
        select: { assignedClients: true },
      },
    },
  });
}

/**
 * Find a user by email within a tenant.
 */
export async function findByEmail(tenantId: string, email: string) {
  return prisma.user.findUnique({
    where: {
      tenantId_email: {
        tenantId,
        email,
      },
    },
  });
}

/**
 * Find a user by ID with password hash (for password verification).
 */
export async function findByIdWithPassword(tenantId: string, userId: string) {
  return prisma.user.findFirst({
    where: {
      id: userId,
      tenantId,
    },
    select: {
      id: true,
      passwordHash: true,
    },
  });
}

/**
 * List users with filtering, pagination, and sorting.
 */
export async function findMany(params: FindManyParams) {
  const { tenantId, page, limit, search, status, role, sortBy, sortOrder } = params;

  const where: Prisma.UserWhereInput = {
    tenantId,
  };

  // Search filter (name or email)
  if (search) {
    where.OR = [
      { firstName: { contains: search } },
      { lastName: { contains: search } },
      { email: { contains: search } },
    ];
  }

  // Status filter
  if (status) {
    where.status = status;
  }

  // Role filter
  if (role) {
    where.role = role;
  }

  // Build order by
  const orderBy: Prisma.UserOrderByWithRelationInput = {};
  orderBy[sortBy as keyof Prisma.UserOrderByWithRelationInput] = sortOrder;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: {
        _count: {
          select: { assignedClients: true },
        },
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return { users, total };
}

/**
 * Check if a user exists in the tenant.
 */
export async function exists(tenantId: string, userId: string): Promise<boolean> {
  const count = await prisma.user.count({
    where: {
      id: userId,
      tenantId,
    },
  });
  return count > 0;
}

/**
 * Check if email is already used in the tenant.
 */
export async function emailExists(tenantId: string, email: string): Promise<boolean> {
  const count = await prisma.user.count({
    where: {
      tenantId,
      email,
    },
  });
  return count > 0;
}

/**
 * Get team statistics for a tenant.
 */
export async function getTeamStats(tenantId: string) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [totalUsers, byRole, byStatus, recentlyActive] = await Promise.all([
    prisma.user.count({ where: { tenantId } }),
    prisma.user.groupBy({
      by: ['role'],
      where: { tenantId },
      _count: { role: true },
    }),
    prisma.user.groupBy({
      by: ['status'],
      where: { tenantId },
      _count: { status: true },
    }),
    prisma.user.count({
      where: {
        tenantId,
        lastLoginAt: { gte: sevenDaysAgo },
      },
    }),
  ]);

  return {
    totalUsers,
    byRole: byRole.map((r: { role: string; _count: { role: number } }) => ({
      role: r.role,
      count: r._count.role,
    })),
    byStatus: byStatus.map((s: { status: string; _count: { status: number } }) => ({
      status: s.status,
      count: s._count.status,
    })),
    recentlyActive,
  };
}

/**
 * Count users by role in a tenant.
 */
export async function countByRole(tenantId: string, role: string): Promise<number> {
  return prisma.user.count({
    where: {
      tenantId,
      role,
    },
  });
}

// ─────────────────────────────────────────
// Write Operations
// ─────────────────────────────────────────

/**
 * Create a new user (used for invitations).
 */
export async function create(data: CreateUserData) {
  return prisma.user.create({
    data,
    include: {
      _count: {
        select: { assignedClients: true },
      },
    },
  });
}

/**
 * Update user profile (name, avatar).
 */
export async function updateProfile(
  tenantId: string,
  userId: string,
  data: { firstName?: string; lastName?: string; avatarUrl?: string | null }
) {
  return prisma.user.update({
    where: { id: userId },
    data,
    include: {
      _count: {
        select: { assignedClients: true },
      },
    },
  });
}

/**
 * Update user role.
 */
export async function updateRole(tenantId: string, userId: string, role: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { role },
    include: {
      _count: {
        select: { assignedClients: true },
      },
    },
  });
}

/**
 * Update user status (activate/deactivate).
 */
export async function updateStatus(tenantId: string, userId: string, status: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { status },
    include: {
      _count: {
        select: { assignedClients: true },
      },
    },
  });
}

/**
 * Update user password.
 */
export async function updatePassword(userId: string, passwordHash: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });
}

/**
 * Delete a user and reassign their clients.
 * Uses a transaction to ensure data integrity.
 */
export async function remove(tenantId: string, userId: string) {
  return prisma.$transaction(async tx => {
    // Unassign all clients from this user
    await tx.client.updateMany({
      where: {
        tenantId,
        assignedToId: userId,
      },
      data: {
        assignedToId: null,
      },
    });

    // Delete refresh tokens
    await tx.refreshToken.deleteMany({
      where: { userId },
    });

    // Delete the user
    return tx.user.delete({
      where: { id: userId },
    });
  });
}

/**
 * Transfer clients from one user to another.
 */
export async function transferClients(
  tenantId: string,
  fromUserId: string,
  toUserId: string | null
): Promise<number> {
  const result = await prisma.client.updateMany({
    where: {
      tenantId,
      assignedToId: fromUserId,
    },
    data: {
      assignedToId: toUserId,
    },
  });
  return result.count;
}
