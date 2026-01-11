/**
 * Interaction repository - database access layer.
 * Handles all Prisma operations for interactions.
 * 
 * @remarks
 * Repository functions are pure database operations without business logic.
 * All queries are scoped by tenantId for multi-tenant isolation.
 */

import type { Interaction, Prisma, User, Client } from '@prisma/client';
import { prisma } from '../../infrastructure/prisma/client.js';

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────
export interface InteractionWithRelations extends Interaction {
  user: User;
  client: Client;
}

export interface InteractionWithUser extends Interaction {
  user: User;
}

export interface FindManyOptions {
  tenantId: string;
  page: number;
  limit: number;
  clientId?: string;
  userId?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface FindByClientOptions {
  tenantId: string;
  clientId: string;
  page: number;
  limit: number;
  type?: string;
}

// ─────────────────────────────────────────
// Read Operations
// ─────────────────────────────────────────

/**
 * Find an interaction by ID within a tenant.
 */
export async function findById(
  tenantId: string,
  interactionId: string
): Promise<InteractionWithRelations | null> {
  return prisma.interaction.findFirst({
    where: {
      id: interactionId,
      tenantId,
    },
    include: {
      user: true,
      client: true,
    },
  });
}

/**
 * Find all interactions matching criteria with pagination.
 */
export async function findMany(
  options: FindManyOptions
): Promise<{ interactions: InteractionWithRelations[]; total: number }> {
  const {
    tenantId,
    page,
    limit,
    clientId,
    userId,
    type,
    startDate,
    endDate,
    sortBy,
    sortOrder,
  } = options;

  // Build where clause
  const where: Prisma.InteractionWhereInput = {
    tenantId,
  };

  if (clientId) {
    where.clientId = clientId;
  }

  if (userId) {
    where.userId = userId;
  }

  if (type) {
    where.type = type;
  }

  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) {
      where.createdAt.gte = new Date(startDate);
    }
    if (endDate) {
      where.createdAt.lte = new Date(endDate);
    }
  }

  // Build orderBy clause
  const orderBy: Prisma.InteractionOrderByWithRelationInput = {
    [sortBy]: sortOrder,
  };

  // Execute queries in parallel
  const [interactions, total] = await Promise.all([
    prisma.interaction.findMany({
      where,
      include: {
        user: true,
        client: true,
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.interaction.count({ where }),
  ]);

  return { interactions, total };
}

/**
 * Find interactions for a specific client (timeline view).
 */
export async function findByClient(
  options: FindByClientOptions
): Promise<{ interactions: InteractionWithUser[]; total: number }> {
  const { tenantId, clientId, page, limit, type } = options;

  const where: Prisma.InteractionWhereInput = {
    tenantId,
    clientId,
  };

  if (type) {
    where.type = type;
  }

  const [interactions, total] = await Promise.all([
    prisma.interaction.findMany({
      where,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.interaction.count({ where }),
  ]);

  return { interactions, total };
}

/**
 * Count interactions by type for a tenant.
 */
export async function countByType(
  tenantId: string
): Promise<{ type: string; count: number }[]> {
  const results = await prisma.interaction.groupBy({
    by: ['type'],
    where: { tenantId },
    _count: { type: true },
  });

  return results.map((r) => ({
    type: r.type,
    count: r._count.type,
  }));
}

/**
 * Count interactions by user for a tenant.
 */
export async function countByUser(
  tenantId: string
): Promise<{ userId: string; count: number }[]> {
  const results = await prisma.interaction.groupBy({
    by: ['userId'],
    where: { tenantId },
    _count: { userId: true },
  });

  return results.map((r) => ({
    userId: r.userId,
    count: r._count.userId,
  }));
}

/**
 * Count interactions in the last N days.
 */
export async function countSince(
  tenantId: string,
  since: Date
): Promise<number> {
  return prisma.interaction.count({
    where: {
      tenantId,
      createdAt: {
        gte: since,
      },
    },
  });
}

/**
 * Get total interaction count for a tenant.
 */
export async function countTotal(tenantId: string): Promise<number> {
  return prisma.interaction.count({
    where: { tenantId },
  });
}

// ─────────────────────────────────────────
// Write Operations
// ─────────────────────────────────────────

/**
 * Create a new interaction.
 */
export async function create(
  data: Prisma.InteractionUncheckedCreateInput
): Promise<InteractionWithRelations> {
  return prisma.interaction.create({
    data,
    include: {
      user: true,
      client: true,
    },
  });
}

/**
 * Update an existing interaction.
 */
export async function update(
  tenantId: string,
  interactionId: string,
  data: Prisma.InteractionUncheckedUpdateInput
): Promise<InteractionWithRelations> {
  return prisma.interaction.update({
    where: {
      id: interactionId,
      tenantId,
    },
    data,
    include: {
      user: true,
      client: true,
    },
  });
}

/**
 * Delete an interaction.
 */
export async function remove(
  tenantId: string,
  interactionId: string
): Promise<Interaction> {
  return prisma.interaction.delete({
    where: {
      id: interactionId,
      tenantId,
    },
  });
}

// ─────────────────────────────────────────
// Validation Helpers
// ─────────────────────────────────────────

/**
 * Check if interaction exists in tenant.
 */
export async function exists(
  tenantId: string,
  interactionId: string
): Promise<boolean> {
  const interaction = await prisma.interaction.findFirst({
    where: {
      id: interactionId,
      tenantId,
    },
    select: { id: true },
  });

  return interaction !== null;
}

/**
 * Check if client exists in tenant.
 */
export async function clientExists(
  tenantId: string,
  clientId: string
): Promise<boolean> {
  const client = await prisma.client.findFirst({
    where: {
      id: clientId,
      tenantId,
    },
    select: { id: true },
  });

  return client !== null;
}

/**
 * Check if user exists in tenant.
 */
export async function userExists(
  tenantId: string,
  userId: string
): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      tenantId,
    },
    select: { id: true },
  });

  return user !== null;
}

/**
 * Get users with their interaction counts (for stats).
 */
export async function getUsersWithCounts(
  tenantId: string,
  userIds: string[]
): Promise<{ id: string; firstName: string; lastName: string }[]> {
  return prisma.user.findMany({
    where: {
      tenantId,
      id: { in: userIds },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
}
