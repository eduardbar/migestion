/**
 * Segment repository - data access layer.
 * Handles all Prisma operations for segments within a tenant.
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
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface CreateSegmentData {
  tenantId: string;
  name: string;
  color?: string | null;
  criteria?: Prisma.InputJsonValue;
}

// ─────────────────────────────────────────
// Read Operations
// ─────────────────────────────────────────

/**
 * Find a segment by ID within a tenant.
 */
export async function findById(tenantId: string, segmentId: string) {
  return prisma.segment.findFirst({
    where: {
      id: segmentId,
      tenantId,
    },
  });
}

/**
 * Find a segment by name within a tenant.
 */
export async function findByName(tenantId: string, name: string) {
  return prisma.segment.findUnique({
    where: {
      tenantId_name: {
        tenantId,
        name,
      },
    },
  });
}

/**
 * List segments with filtering, pagination, and sorting.
 * Includes client count for each segment.
 */
export async function findMany(params: FindManyParams) {
  const { tenantId, page, limit, search, sortBy, sortOrder } = params;

  const where: Prisma.SegmentWhereInput = {
    tenantId,
  };

  if (search) {
    where.name = { contains: search };
  }

  const orderBy: Prisma.SegmentOrderByWithRelationInput = {};
  orderBy[sortBy as keyof Prisma.SegmentOrderByWithRelationInput] = sortOrder;

  const [segments, total] = await Promise.all([
    prisma.segment.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.segment.count({ where }),
  ]);

  // Get client counts for each segment
  const segmentsWithCounts = await Promise.all(
    segments.map(async segment => {
      const clientCount = await prisma.client.count({
        where: {
          tenantId,
          segment: segment.name,
        },
      });
      return {
        ...segment,
        _count: { clients: clientCount },
      };
    })
  );

  return { segments: segmentsWithCounts, total };
}

/**
 * Get all segments for a tenant (simple list for dropdowns).
 */
export async function findAll(tenantId: string) {
  return prisma.segment.findMany({
    where: { tenantId },
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      color: true,
    },
  });
}

/**
 * Check if a segment exists in the tenant.
 */
export async function exists(tenantId: string, segmentId: string): Promise<boolean> {
  const count = await prisma.segment.count({
    where: {
      id: segmentId,
      tenantId,
    },
  });
  return count > 0;
}

/**
 * Check if segment name is already used in the tenant.
 */
export async function nameExists(
  tenantId: string,
  name: string,
  excludeId?: string
): Promise<boolean> {
  const count = await prisma.segment.count({
    where: {
      tenantId,
      name,
      ...(excludeId && { NOT: { id: excludeId } }),
    },
  });
  return count > 0;
}

// ─────────────────────────────────────────
// Write Operations
// ─────────────────────────────────────────

/**
 * Create a new segment.
 */
export async function create(data: CreateSegmentData) {
  return prisma.segment.create({
    data: {
      tenantId: data.tenantId,
      name: data.name,
      color: data.color,
      criteria: data.criteria,
    },
  });
}

/**
 * Update a segment.
 */
export async function update(
  tenantId: string,
  segmentId: string,
  data: { name?: string; color?: string | null; criteria?: Prisma.InputJsonValue }
) {
  return prisma.segment.update({
    where: { id: segmentId },
    data,
  });
}

/**
 * Delete a segment.
 * Note: Clients with this segment name keep it (as string field).
 */
export async function remove(tenantId: string, segmentId: string) {
  return prisma.segment.delete({
    where: { id: segmentId },
  });
}

/**
 * Get segment statistics.
 */
export async function getStats(tenantId: string) {
  const segments = await prisma.segment.findMany({
    where: { tenantId },
    select: { name: true },
  });

  const stats = await Promise.all(
    segments.map(async segment => {
      const count = await prisma.client.count({
        where: {
          tenantId,
          segment: segment.name,
        },
      });
      return { segment: segment.name, count };
    })
  );

  // Also count clients without a segment
  const unassignedCount = await prisma.client.count({
    where: {
      tenantId,
      OR: [{ segment: null }, { segment: '' }],
    },
  });

  return {
    segments: stats,
    unassigned: unassignedCount,
    total: stats.reduce((sum, s) => sum + s.count, 0) + unassignedCount,
  };
}
