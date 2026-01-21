import { api } from './api';

/**
 * Reports/Analytics service.
 * Handles all reporting and analytics API calls.
 */

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

export type DatePeriod =
  | 'today'
  | 'yesterday'
  | 'last7days'
  | 'last30days'
  | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'custom';

export interface DateRangeParams {
  period?: DatePeriod;
  startDate?: string;
  endDate?: string;
}

export interface DashboardOverview {
  clients: {
    total: number;
    new: number;
    byStatus: Record<string, number>;
  };
  interactions: {
    total: number;
    new: number;
    byType: Record<string, number>;
  };
  team: {
    total: number;
    active: number;
  };
  trends: {
    clientsChange: number;
    interactionsChange: number;
  };
}

export interface StatItem {
  label: string;
  value: string | null;
  count: number;
  percentage: number;
}

export interface StatsResponse {
  total: number;
  data: StatItem[];
  period: {
    start: string;
    end: string;
  };
}

export interface TeamMemberPerformance {
  userId: string;
  name: string;
  email: string;
  clientsAssigned: number;
  interactionsCreated: number;
  clientsConverted: number;
}

export interface TeamPerformanceResponse {
  members: TeamMemberPerformance[];
  totals: {
    clients: number;
    interactions: number;
    conversions: number;
  };
  period: {
    start: string;
    end: string;
  };
}

export interface ActivityTimelineItem {
  date: string;
  clients: number;
  interactions: number;
}

export interface ActivityTimelineResponse {
  data: ActivityTimelineItem[];
  period: {
    start: string;
    end: string;
  };
}

export interface TopClient {
  id: string;
  companyName: string;
  contactName: string;
  interactionCount: number;
  status: string;
}

export interface TopClientsResponse {
  clients: TopClient[];
  period: {
    start: string;
    end: string;
  };
}

// ─────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────

function buildDateParams(params: DateRangeParams): URLSearchParams {
  const searchParams = new URLSearchParams();

  if (params.period) searchParams.set('period', params.period);
  if (params.startDate) searchParams.set('startDate', params.startDate);
  if (params.endDate) searchParams.set('endDate', params.endDate);

  return searchParams;
}

// ─────────────────────────────────────────
// API Calls
// ─────────────────────────────────────────

/**
 * Get dashboard overview statistics.
 */
export async function getDashboardOverview(
  params: DateRangeParams = {}
): Promise<DashboardOverview> {
  const searchParams = buildDateParams(params);
  const query = searchParams.toString();
  const endpoint = `/reports/dashboard${query ? `?${query}` : ''}`;

  return api.get<DashboardOverview>(endpoint);
}

/**
 * Get client statistics grouped by specified field.
 */
export async function getClientStats(
  params: DateRangeParams & { groupBy?: 'status' | 'segment' | 'assignedTo' | 'createdMonth' } = {}
): Promise<StatsResponse> {
  const searchParams = buildDateParams(params);
  if (params.groupBy) searchParams.set('groupBy', params.groupBy);

  const query = searchParams.toString();
  const endpoint = `/reports/clients${query ? `?${query}` : ''}`;

  return api.get<StatsResponse>(endpoint);
}

/**
 * Get interaction statistics grouped by specified field.
 */
export async function getInteractionStats(
  params: DateRangeParams & { groupBy?: 'type' | 'user' | 'day' | 'week' | 'month' } = {}
): Promise<StatsResponse> {
  const searchParams = buildDateParams(params);
  if (params.groupBy) searchParams.set('groupBy', params.groupBy);

  const query = searchParams.toString();
  const endpoint = `/reports/interactions${query ? `?${query}` : ''}`;

  return api.get<StatsResponse>(endpoint);
}

/**
 * Get team performance statistics.
 */
export async function getTeamPerformance(
  params: DateRangeParams & { userId?: string } = {}
): Promise<TeamPerformanceResponse> {
  const searchParams = buildDateParams(params);
  if (params.userId) searchParams.set('userId', params.userId);

  const query = searchParams.toString();
  const endpoint = `/reports/team${query ? `?${query}` : ''}`;

  return api.get<TeamPerformanceResponse>(endpoint);
}

/**
 * Get activity timeline for charts.
 */
export async function getActivityTimeline(
  params: { days?: number; type?: 'all' | 'clients' | 'interactions' | 'users' } = {}
): Promise<ActivityTimelineResponse> {
  const searchParams = new URLSearchParams();

  if (params.days) searchParams.set('days', String(params.days));
  if (params.type) searchParams.set('type', params.type);

  const query = searchParams.toString();
  const endpoint = `/reports/activity${query ? `?${query}` : ''}`;

  return api.get<ActivityTimelineResponse>(endpoint);
}

/**
 * Get top clients by activity.
 */
export async function getTopClients(
  params: DateRangeParams & { limit?: number } = {}
): Promise<TopClientsResponse> {
  const searchParams = buildDateParams(params);
  if (params.limit) searchParams.set('limit', String(params.limit));

  const query = searchParams.toString();
  const endpoint = `/reports/top-clients${query ? `?${query}` : ''}`;

  return api.get<TopClientsResponse>(endpoint);
}
