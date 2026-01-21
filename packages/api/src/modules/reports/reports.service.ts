/**
 * Reports Service.
 * Contains business logic for analytics and reporting.
 */

import * as reportsRepository from './reports.repository.js';
import type { DateRange } from './reports.repository.js';
import type {
  DashboardOverviewDto,
  ClientStatsDto,
  ClientStatItem,
  InteractionStatsDto,
  InteractionStatItem,
  TeamPerformanceDto,
  ActivityTimelineDto,
  ActivityTimelineItem,
  TopClientsDto,
} from './reports.dto.js';
import type {
  DateRangeQuery,
  ClientStatsQuery,
  InteractionStatsQuery,
  TeamPerformanceQuery,
  ActivityTimelineQuery,
} from './reports.validator.js';
import { TIME, DEFAULTS } from '../../config/constants.js';

// ─────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────

/**
 * Calculate percentage safely, returning 0 if total is 0.
 */
function calculatePercentage(count: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((count / total) * 100);
}

/**
 * Calculate percentage change between two periods.
 */
function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

/**
 * Get start of day (midnight) for a given date.
 */
function getStartOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Get end of day (23:59:59.999) for a given date.
 */
function getEndOfDay(date: Date): Date {
  return new Date(date.getTime() + TIME.MILLISECONDS_PER_DAY - 1);
}

/**
 * Calculate date range from period or custom dates.
 */
export function calculateDateRange(query: DateRangeQuery): DateRange {
  const now = new Date();
  const today = getStartOfDay(now);

  if (query.period === 'custom' && query.startDate && query.endDate) {
    return {
      start: new Date(query.startDate),
      end: new Date(query.endDate + 'T23:59:59.999Z'),
    };
  }

  switch (query.period) {
    case 'today':
      return {
        start: today,
        end: getEndOfDay(today),
      };
    case 'yesterday': {
      const yesterday = new Date(today.getTime() - TIME.MILLISECONDS_PER_DAY);
      return {
        start: yesterday,
        end: getEndOfDay(yesterday),
      };
    }
    case 'last7days':
      return {
        start: new Date(today.getTime() - TIME.DAYS_IN_WEEK * TIME.MILLISECONDS_PER_DAY),
        end: now,
      };
    case 'last30days':
    default:
      return {
        start: new Date(today.getTime() - TIME.DAYS_IN_MONTH * TIME.MILLISECONDS_PER_DAY),
        end: now,
      };
    case 'thisMonth':
      return {
        start: new Date(now.getFullYear(), now.getMonth(), 1),
        end: now,
      };
    case 'lastMonth': {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return {
        start: lastMonth,
        end: new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999),
      };
    }
    case 'thisYear':
      return {
        start: new Date(now.getFullYear(), 0, 1),
        end: now,
      };
  }
}

// ─────────────────────────────────────────
// Service Functions
// ─────────────────────────────────────────

/**
 * Get dashboard overview stats.
 */
export async function getDashboardOverview(
  tenantId: string,
  query: DateRangeQuery
): Promise<DashboardOverviewDto> {
  const dateRange = calculateDateRange(query);

  // Calculate previous period for trends
  const periodLength = dateRange.end.getTime() - dateRange.start.getTime();
  const previousRange: DateRange = {
    start: new Date(dateRange.start.getTime() - periodLength),
    end: new Date(dateRange.start.getTime() - 1),
  };

  // Fetch all stats in parallel
  const [
    totalClients,
    newClients,
    clientsByStatus,
    totalInteractions,
    newInteractions,
    interactionsByType,
    totalTeam,
    activeTeam,
    previousNewClients,
    previousNewInteractions,
  ] = await Promise.all([
    reportsRepository.getClientCount(tenantId),
    reportsRepository.getNewClientsCount(tenantId, dateRange),
    reportsRepository.getClientsByStatus(tenantId),
    reportsRepository.getInteractionCount(tenantId),
    reportsRepository.getNewInteractionsCount(tenantId, dateRange),
    reportsRepository.getInteractionsByType(tenantId, dateRange),
    reportsRepository.getTotalTeamCount(tenantId),
    reportsRepository.getActiveTeamCount(tenantId),
    reportsRepository.getNewClientsCount(tenantId, previousRange),
    reportsRepository.getNewInteractionsCount(tenantId, previousRange),
  ]);

  // Transform status data
  const byStatus = clientsByStatus.reduce(
    (acc, item) => {
      acc[item.status] = item._count;
      return acc;
    },
    {} as Record<string, number>
  );

  // Transform interaction type data
  const byType = interactionsByType.reduce(
    (acc, item) => {
      acc[item.type] = item._count;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    clients: {
      total: totalClients,
      new: newClients,
      byStatus,
    },
    interactions: {
      total: totalInteractions,
      new: newInteractions,
      byType,
    },
    team: {
      total: totalTeam,
      active: activeTeam,
    },
    trends: {
      clientsChange: calculatePercentageChange(newClients, previousNewClients),
      interactionsChange: calculatePercentageChange(newInteractions, previousNewInteractions),
    },
  };
}

/**
 * Get client statistics grouped by specified field.
 */
export async function getClientStats(
  tenantId: string,
  query: ClientStatsQuery
): Promise<ClientStatsDto> {
  const dateRange = calculateDateRange(query);
  const total = await reportsRepository.getClientCount(tenantId);

  let data: ClientStatItem[] = [];

  switch (query.groupBy) {
    case 'status': {
      const byStatus = await reportsRepository.getClientsByStatus(tenantId);
      data = byStatus.map(item => ({
        label: item.status,
        value: item.status,
        count: item._count,
        percentage: calculatePercentage(item._count, total),
      }));
      break;
    }

    case 'segment': {
      const bySegment = await reportsRepository.getClientsBySegment(tenantId);
      data = bySegment.map(item => ({
        label: item.segment || 'No Segment',
        value: item.segment,
        count: item._count,
        percentage: calculatePercentage(item._count, total),
      }));
      break;
    }

    case 'assignedTo': {
      const byAssigned = await reportsRepository.getClientsByAssignedUser(tenantId);
      data = byAssigned.map(item => ({
        label: item.user ? `${item.user.firstName} ${item.user.lastName}` : 'Unassigned',
        value: item.assignedToId,
        count: item._count,
        percentage: calculatePercentage(item._count, total),
      }));
      break;
    }

    case 'createdMonth': {
      const byMonth = await reportsRepository.getClientsByCreatedMonth(tenantId, dateRange);
      const monthTotal = byMonth.reduce((sum, item) => sum + item.count, 0);
      data = byMonth.map(item => ({
        label: item.month,
        value: item.month,
        count: item.count,
        percentage: calculatePercentage(item.count, monthTotal),
      }));
      break;
    }
  }

  return {
    total,
    data,
    period: {
      start: dateRange.start.toISOString(),
      end: dateRange.end.toISOString(),
    },
  };
}

/**
 * Get interaction statistics grouped by specified field.
 */
export async function getInteractionStats(
  tenantId: string,
  query: InteractionStatsQuery
): Promise<InteractionStatsDto> {
  const dateRange = calculateDateRange(query);
  const total = await reportsRepository.getNewInteractionsCount(tenantId, dateRange);

  let data: InteractionStatItem[] = [];

  switch (query.groupBy) {
    case 'type': {
      const byType = await reportsRepository.getInteractionsByType(tenantId, dateRange);
      data = byType.map(item => ({
        label: item.type,
        value: item.type,
        count: item._count,
        percentage: calculatePercentage(item._count, total),
      }));
      break;
    }

    case 'user': {
      const byUser = await reportsRepository.getInteractionsByUser(tenantId, dateRange);
      data = byUser.map(item => ({
        label: `${item.user.firstName} ${item.user.lastName}`,
        value: item.userId,
        count: item._count,
        percentage: calculatePercentage(item._count, total),
      }));
      break;
    }

    case 'day':
    case 'week':
    case 'month': {
      const byDay = await reportsRepository.getInteractionsByDay(tenantId, dateRange);
      data = byDay.map(item => ({
        label: item.date,
        value: item.date,
        count: item.count,
        percentage: calculatePercentage(item.count, total),
      }));
      break;
    }
  }

  return {
    total,
    data,
    period: {
      start: dateRange.start.toISOString(),
      end: dateRange.end.toISOString(),
    },
  };
}

/**
 * Get team performance statistics.
 */
export async function getTeamPerformance(
  tenantId: string,
  query: TeamPerformanceQuery
): Promise<TeamPerformanceDto> {
  const dateRange = calculateDateRange(query);

  const performance = await reportsRepository.getTeamPerformance(tenantId, dateRange);

  const members = performance.map(p => ({
    userId: p.userId,
    name: `${p.firstName} ${p.lastName}`,
    email: p.email,
    clientsAssigned: p.clientsAssigned,
    interactionsCreated: p.interactionsCreated,
    clientsConverted: 0, // Would need additional tracking
  }));

  const totals = members.reduce(
    (acc, member) => ({
      clients: acc.clients + member.clientsAssigned,
      interactions: acc.interactions + member.interactionsCreated,
      conversions: acc.conversions + member.clientsConverted,
    }),
    { clients: 0, interactions: 0, conversions: 0 }
  );

  return {
    members,
    totals,
    period: {
      start: dateRange.start.toISOString(),
      end: dateRange.end.toISOString(),
    },
  };
}

/**
 * Get activity timeline for charts.
 */
export async function getActivityTimeline(
  tenantId: string,
  query: ActivityTimelineQuery
): Promise<ActivityTimelineDto> {
  const end = new Date();
  const start = new Date(end.getTime() - query.days * TIME.MILLISECONDS_PER_DAY);
  const dateRange: DateRange = { start, end };

  const [clientsByDay, interactionsByDay] = await Promise.all([
    reportsRepository.getClientsByDay(tenantId, dateRange),
    reportsRepository.getInteractionsByDay(tenantId, dateRange),
  ]);

  // Merge data by date
  const clientMap = new Map(clientsByDay.map(c => [c.date, c.count]));
  const interactionMap = new Map(interactionsByDay.map(i => [i.date, i.count]));

  // Generate all dates in range
  const dates: string[] = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }

  const data: ActivityTimelineItem[] = dates.map(date => ({
    date,
    clients: clientMap.get(date) || 0,
    interactions: interactionMap.get(date) || 0,
  }));

  return {
    data,
    period: {
      start: start.toISOString(),
      end: end.toISOString(),
    },
  };
}

/**
 * Get top clients by activity.
 */
export async function getTopClients(
  tenantId: string,
  query: DateRangeQuery,
  limit: number = DEFAULTS.TOP_CLIENTS_LIMIT
): Promise<TopClientsDto> {
  const dateRange = calculateDateRange(query);

  const clients = await reportsRepository.getTopClientsByInteractions(tenantId, dateRange, limit);

  return {
    clients,
    period: {
      start: dateRange.start.toISOString(),
      end: dateRange.end.toISOString(),
    },
  };
}
