/**
 * Reports Data Transfer Objects.
 * Defines response structures for analytics endpoints.
 */

// ─────────────────────────────────────────
// Dashboard Overview DTOs
// ─────────────────────────────────────────
export interface DashboardOverviewDto {
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

// ─────────────────────────────────────────
// Client Stats DTOs
// ─────────────────────────────────────────
export interface ClientStatItem {
  label: string;
  value: string | null;
  count: number;
  percentage: number;
}

export interface ClientStatsDto {
  total: number;
  data: ClientStatItem[];
  period: {
    start: string;
    end: string;
  };
}

// ─────────────────────────────────────────
// Interaction Stats DTOs
// ─────────────────────────────────────────
export interface InteractionStatItem {
  label: string;
  value: string | null;
  count: number;
  percentage: number;
}

export interface InteractionStatsDto {
  total: number;
  data: InteractionStatItem[];
  period: {
    start: string;
    end: string;
  };
}

// ─────────────────────────────────────────
// Team Performance DTOs
// ─────────────────────────────────────────
export interface TeamMemberPerformance {
  userId: string;
  name: string;
  email: string;
  clientsAssigned: number;
  interactionsCreated: number;
  clientsConverted: number;
  avgResponseTime?: number;
}

export interface TeamPerformanceDto {
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

// ─────────────────────────────────────────
// Activity Timeline DTOs
// ─────────────────────────────────────────
export interface ActivityTimelineItem {
  date: string;
  clients: number;
  interactions: number;
}

export interface ActivityTimelineDto {
  data: ActivityTimelineItem[];
  period: {
    start: string;
    end: string;
  };
}

// ─────────────────────────────────────────
// Top Performers DTOs
// ─────────────────────────────────────────
export interface TopClient {
  id: string;
  companyName: string;
  contactName: string;
  interactionCount: number;
  status: string;
}

export interface TopClientsDto {
  clients: TopClient[];
  period: {
    start: string;
    end: string;
  };
}
