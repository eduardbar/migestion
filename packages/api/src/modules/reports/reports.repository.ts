/**
 * Reports Repository.
 * Handles all database queries for analytics and reports.
 * All queries are scoped by tenantId for multi-tenant isolation.
 */

import { prisma } from '../../infrastructure/prisma/client.js';

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────
export interface DateRange {
  start: Date;
  end: Date;
}

// ─────────────────────────────────────────
// Client Stats Queries
// ─────────────────────────────────────────

/**
 * Get total client count for tenant.
 */
export async function getClientCount(tenantId: string): Promise<number> {
  return prisma.client.count({ where: { tenantId } });
}

/**
 * Get new clients in date range.
 */
export async function getNewClientsCount(tenantId: string, dateRange: DateRange): Promise<number> {
  return prisma.client.count({
    where: {
      tenantId,
      createdAt: {
        gte: dateRange.start,
        lte: dateRange.end,
      },
    },
  });
}

/**
 * Get new interactions in date range.
 */
export async function getNewInteractionsCount(
  tenantId: string,
  dateRange: DateRange
): Promise<number> {
  return prisma.interaction.count({
    where: {
      tenantId,
      createdAt: {
        gte: dateRange.start,
        lte: dateRange.end,
      },
    },
  });
}

/**
 * Get total interaction count for tenant.
 */
export async function getInteractionCount(tenantId: string): Promise<number> {
  return prisma.interaction.count({ where: { tenantId } });
}

/**
 * Get clients grouped by status.
 */
export async function getClientsByStatus(
  tenantId: string
): Promise<{ status: string; _count: number }[]> {
  const results = await prisma.client.groupBy({
    by: ['status'],
    where: { tenantId },
    _count: { _all: true },
    orderBy: { _count: { status: 'desc' } },
  });

  return results.map((r: { status: string; _count: { _all: number } }) => ({
    status: r.status,
    _count: r._count._all,
  }));
}

/**
 * Get clients grouped by segment.
 */
export async function getClientsBySegment(
  tenantId: string
): Promise<{ segment: string | null; _count: number }[]> {
  const results = await prisma.client.groupBy({
    by: ['segment'],
    where: { tenantId },
    _count: { _all: true },
    orderBy: { _count: { segment: 'desc' } },
  });

  return results.map((r: { segment: string | null; _count: { _all: number } }) => ({
    segment: r.segment,
    _count: r._count._all,
  }));
}

/**
 * Get clients grouped by assigned user.
 */
export async function getClientsByAssignedUser(
  tenantId: string
): Promise<
  { assignedToId: string | null; _count: number; user?: { firstName: string; lastName: string } }[]
> {
  const results = await prisma.client.groupBy({
    by: ['assignedToId'],
    where: { tenantId },
    _count: true,
    orderBy: { _count: { assignedToId: 'desc' } },
  });

  // Fetch user names for assigned users
  const userIds = results
    .map((r: { assignedToId: string | null; _count: number }) => r.assignedToId)
    .filter((id: string | null): id is string => id !== null);

  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, firstName: true, lastName: true },
  });

  const userMap = new Map(
    users.map((u: { id: string; firstName: string; lastName: string }) => [u.id, u])
  );

  return results.map((r: { assignedToId: string | null; _count: number }) => ({
    ...r,
    user: r.assignedToId ? userMap.get(r.assignedToId) : undefined,
  }));
}

/**
 * Get clients grouped by creation month.
 */
export async function getClientsByCreatedMonth(
  tenantId: string,
  dateRange: DateRange
): Promise<{ month: string; count: number }[]> {
  const clients = await prisma.client.findMany({
    where: {
      tenantId,
      createdAt: {
        gte: dateRange.start,
        lte: dateRange.end,
      },
    },
    select: { createdAt: true },
  });

  const grouped = clients.reduce(
    (acc: Record<string, number>, client: { createdAt: Date }) => {
      const month = client.createdAt.toISOString().slice(0, 7); // YYYY-MM
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(grouped).map(([month, count]) => ({
    month,
    count: count as number,
  }));
}

/**
 * Get interactions grouped by user.
 */
export async function getInteractionsByUser(
  tenantId: string,
  dateRange?: DateRange
): Promise<{ userId: string; _count: number; user: { firstName: string; lastName: string } }[]> {
  const results = await prisma.interaction.groupBy({
    by: ['userId'],
    where: {
      tenantId,
      ...(dateRange && {
        createdAt: {
          gte: dateRange.start,
          lte: dateRange.end,
        },
      }),
    },
    _count: true,
    orderBy: { _count: { userId: 'desc' } },
  });

  const userIds = results.map((r: { userId: string }) => r.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, firstName: true, lastName: true },
  });

  const userMap = new Map(users.map((u: { id: string; firstName: string; lastName: string }) => [u.id, u]));

  return results.map((r) => ({
    userId: r.userId,
    _count: r._count as number,
    user: userMap.get(r.userId) || { firstName: 'Unknown', lastName: 'User' },
  }));
}

/**
 * Get interactions by day for timeline.
 */
export async function getInteractionsByDay(
  tenantId: string,
  dateRange: DateRange
): Promise<{ date: string; count: number }[]> {
  const interactions = await prisma.interaction.findMany({
    where: {
      tenantId,
      createdAt: {
        gte: dateRange.start,
        lte: dateRange.end,
      },
    },
    select: { createdAt: true },
  });

  const grouped = interactions.reduce(
    (acc: Record<string, number>, interaction: { createdAt: Date }) => {
      const date = interaction.createdAt.toISOString().slice(0, 10); // YYYY-MM-DD
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(grouped)
    .map(([date, count]) => ({ date, count: count as number }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Get clients created by day for timeline.
 */
export async function getClientsByDay(
  tenantId: string,
  dateRange: DateRange
): Promise<{ date: string; count: number }[]> {
  const clients = await prisma.client.findMany({
    where: {
      tenantId,
      createdAt: {
        gte: dateRange.start,
        lte: dateRange.end,
      },
    },
    select: { createdAt: true },
  });

  const grouped = clients.reduce(
    (acc: Record<string, number>, client: { createdAt: Date }) => {
      const date = client.createdAt.toISOString().slice(0, 10);
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(grouped)
    .map(([date, count]) => ({ date, count: count as number }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

// ─────────────────────────────────────────
// Team Stats Queries
// ─────────────────────────────────────────

/**
 * Get active team member count.
 */
export async function getActiveTeamCount(tenantId: string): Promise<number> {
  return prisma.user.count({
    where: { tenantId, status: 'active' },
  });
}

/**
 * Get total team member count.
 */
export async function getTotalTeamCount(tenantId: string): Promise<number> {
  return prisma.user.count({ where: { tenantId } });
}

/**
 * Get team member performance stats.
 */
export async function getTeamPerformance(
  tenantId: string,
  dateRange: DateRange
): Promise<
  {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    clientsAssigned: number;
    interactionsCreated: number;
  }[]
> {
  const users = await prisma.user.findMany({
    where: { tenantId, status: 'active' },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      _count: {
        select: {
          assignedClients: true,
        },
      },
    },
  });

  // Get interactions count for each user in date range
  const interactionCounts = await prisma.interaction.groupBy({
    by: ['userId'],
    where: {
      tenantId,
      createdAt: {
        gte: dateRange.start,
        lte: dateRange.end,
      },
    },
    _count: true,
  });

  const interactionMap = new Map(
    interactionCounts.map((i: { userId: string; _count: number }) => [i.userId, i._count])
  );

  return users.map(
    (user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      _count: { assignedClients: number };
    }) => ({
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      clientsAssigned: user._count.assignedClients,
      interactionsCreated: interactionMap.get(user.id) || 0,
    })
  );
}

// ─────────────────────────────────────────
// Top Clients Query
// ─────────────────────────────────────────

/**
 * Get top clients by interaction count.
 */
export async function getTopClientsByInteractions(
  tenantId: string,
  dateRange: DateRange,
  limit: number = 10
): Promise<
  {
    id: string;
    companyName: string;
    contactName: string;
    status: string;
    interactionCount: number;
  }[]
> {
  const clients = await prisma.client.findMany({
    where: { tenantId },
    select: {
      id: true,
      companyName: true,
      contactName: true,
      status: true,
      _count: {
        select: {
          interactions: {
            where: {
              createdAt: {
                gte: dateRange.start,
                lte: dateRange.end,
              },
            },
          },
        },
      },
    },
    orderBy: {
      interactions: {
        _count: 'desc',
      },
    },
    take: limit,
  });

  return clients.map((client: { id: string; companyName: string; contactName: string; status: string; _count: { interactions: number } }) => ({
    id: client.id,
    companyName: client.companyName,
    contactName: client.contactName,
    status: client.status,
    interactionCount: client._count.interactions,
  }));
}
