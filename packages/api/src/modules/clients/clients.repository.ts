/**
 * Client repository - database access layer.
 * Handles all Prisma operations for clients.
 *
 * @remarks
 * Repository functions are pure database operations without business logic.
 * All queries are scoped by tenantId for multi-tenant isolation.
 */

import type { Client, Prisma, User } from '@prisma/client';
import { prisma } from '../../infrastructure/prisma/client.js';

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────
export interface ClientWithAssignedUser extends Client {
  assignedTo: User | null;
}

export interface FindManyOptions {
  tenantId: string;
  page: number;
  limit: number;
  search?: string;
  status?: string;
  segment?: string;
  assignedToId?: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

// ─────────────────────────────────────────
// Read Operations
// ─────────────────────────────────────────

/**
 * Find a client by ID within a tenant.
 */
export async function findById(
  tenantId: string,
  clientId: string
): Promise<ClientWithAssignedUser | null> {
  return prisma.client.findFirst({
    where: {
      id: clientId,
      tenantId,
    },
    include: {
      assignedTo: true,
    },
  });
}

/**
 * Find a client by email within a tenant.
 */
export async function findByEmail(tenantId: string, email: string): Promise<Client | null> {
  return prisma.client.findFirst({
    where: {
      tenantId,
      email: email.toLowerCase(),
    },
  });
}

/**
 * Find all clients matching criteria with pagination.
 */
export async function findMany(
  options: FindManyOptions
): Promise<{ clients: ClientWithAssignedUser[]; total: number }> {
  const { tenantId, page, limit, search, status, segment, assignedToId, sortBy, sortOrder } =
    options;

  // Build where clause
  const where: Prisma.ClientWhereInput = {
    tenantId,
  };

  if (status) {
    where.status = status;
  }

  if (segment) {
    where.segment = segment;
  }

  if (assignedToId) {
    where.assignedToId = assignedToId;
  }

  if (search) {
    where.OR = [
      { companyName: { contains: search } },
      { contactName: { contains: search } },
      { email: { contains: search } },
      { phone: { contains: search } },
    ];
  }

  // Build orderBy clause
  const orderBy: Prisma.ClientOrderByWithRelationInput = {
    [sortBy]: sortOrder,
  };

  // Execute queries in parallel
  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      where,
      include: {
        assignedTo: true,
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.client.count({ where }),
  ]);

  return { clients, total };
}

/**
 * Get distinct segments for a tenant.
 */
export async function findDistinctSegments(tenantId: string): Promise<string[]> {
  const results = await prisma.client.findMany({
    where: {
      tenantId,
      segment: { not: null },
    },
    select: {
      segment: true,
    },
    distinct: ['segment'],
  });

  return results
    .map((r: { segment: string | null }) => r.segment)
    .filter((s: string | null): s is string => s !== null);
}

/**
 * Count clients by status for a tenant.
 */
export async function countByStatus(
  tenantId: string
): Promise<{ status: string; count: number }[]> {
  const results = await prisma.client.groupBy({
    by: ['status'],
    where: { tenantId },
    _count: { status: true },
  });

  return results.map((r: { status: string; _count: { status: number } }) => ({
    status: r.status,
    count: r._count.status,
  }));
}

// ─────────────────────────────────────────
// Write Operations
// ─────────────────────────────────────────

/**
 * Create a new client.
 */
export async function create(
  data: Prisma.ClientUncheckedCreateInput
): Promise<ClientWithAssignedUser> {
  return prisma.client.create({
    data,
    include: {
      assignedTo: true,
    },
  });
}

/**
 * Update an existing client.
 */
export async function update(
  tenantId: string,
  clientId: string,
  data: Prisma.ClientUncheckedUpdateInput
): Promise<ClientWithAssignedUser> {
  return prisma.client.update({
    where: {
      id: clientId,
      tenantId,
    },
    data,
    include: {
      assignedTo: true,
    },
  });
}

/**
 * Delete a client.
 * Note: Interactions will be cascade deleted due to schema relation.
 */
export async function remove(tenantId: string, clientId: string): Promise<Client> {
  return prisma.client.delete({
    where: {
      id: clientId,
      tenantId,
    },
  });
}

/**
 * Bulk update client status.
 */
export async function updateManyStatus(
  tenantId: string,
  clientIds: string[],
  status: string
): Promise<number> {
  const result = await prisma.client.updateMany({
    where: {
      id: { in: clientIds },
      tenantId,
    },
    data: { status },
  });

  return result.count;
}

/**
 * Bulk assign clients to a user.
 */
export async function assignMany(
  tenantId: string,
  clientIds: string[],
  assignedToId: string | null
): Promise<number> {
  const result = await prisma.client.updateMany({
    where: {
      id: { in: clientIds },
      tenantId,
    },
    data: { assignedToId },
  });

  return result.count;
}

// ─────────────────────────────────────────
// Validation Helpers
// ─────────────────────────────────────────

/**
 * Check if a user exists in the tenant (for assignment validation).
 */
export async function userExistsInTenant(tenantId: string, userId: string): Promise<boolean> {
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
 * Check if client exists in tenant.
 */
export async function exists(tenantId: string, clientId: string): Promise<boolean> {
  const client = await prisma.client.findFirst({
    where: {
      id: clientId,
      tenantId,
    },
    select: { id: true },
  });

  return client !== null;
}
