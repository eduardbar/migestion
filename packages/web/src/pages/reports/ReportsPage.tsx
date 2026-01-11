import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Trophy,
  Activity,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, Select, Spinner, Badge } from '@/components/ui';
import {
  getDashboardOverview,
  getClientStats,
  getInteractionStats,
  getActivityTimeline,
  getTeamPerformance,
  getTopClients,
  type DatePeriod,
  type DashboardOverview,
  type StatsResponse,
  type ActivityTimelineResponse,
  type TeamPerformanceResponse,
  type TopClientsResponse,
} from '@/services/reports.service';

/**
 * Reports page.
 * Displays comprehensive analytics and reports with charts.
 */

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────

const PERIOD_OPTIONS = [
  { value: 'last7days', label: 'Last 7 days' },
  { value: 'last30days', label: 'Last 30 days' },
  { value: 'thisMonth', label: 'This month' },
  { value: 'lastMonth', label: 'Last month' },
  { value: 'thisYear', label: 'This year' },
];

const CHART_COLORS = {
  primary: '#3b82f6',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
  neutral: '#6b7280',
};

const PIE_COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6'];

const STATUS_COLORS: Record<string, string> = {
  lead: CHART_COLORS.info,
  prospect: CHART_COLORS.warning,
  active: CHART_COLORS.success,
  inactive: CHART_COLORS.neutral,
  lost: CHART_COLORS.error,
};

const STATUS_BADGE_VARIANTS: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'> = {
  lead: 'info',
  prospect: 'warning',
  active: 'success',
  inactive: 'default',
  lost: 'error',
};

// ─────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────

export function ReportsPage() {
  const [period, setPeriod] = useState<DatePeriod>('last30days');

  // Fetch dashboard overview
  const { data: overview, isLoading: isLoadingOverview } = useQuery<DashboardOverview>({
    queryKey: ['reports', 'dashboard', period],
    queryFn: () => getDashboardOverview({ period }),
  });

  // Fetch client stats by status
  const { data: clientStats, isLoading: isLoadingClientStats } = useQuery<StatsResponse>({
    queryKey: ['reports', 'clients', 'status', period],
    queryFn: () => getClientStats({ period, groupBy: 'status' }),
  });

  // Fetch interaction stats by type
  const { data: interactionStats, isLoading: isLoadingInteractionStats } = useQuery<StatsResponse>({
    queryKey: ['reports', 'interactions', 'type', period],
    queryFn: () => getInteractionStats({ period, groupBy: 'type' }),
  });

  // Fetch activity timeline
  const { data: timeline, isLoading: isLoadingTimeline } = useQuery<ActivityTimelineResponse>({
    queryKey: ['reports', 'activity', period],
    queryFn: () => getActivityTimeline({ days: period === 'last7days' ? 7 : 30 }),
  });

  // Fetch team performance
  const { data: teamPerformance, isLoading: isLoadingTeam } = useQuery<TeamPerformanceResponse>({
    queryKey: ['reports', 'team', period],
    queryFn: () => getTeamPerformance({ period }),
  });

  // Fetch top clients
  const { data: topClients, isLoading: isLoadingTopClients } = useQuery<TopClientsResponse>({
    queryKey: ['reports', 'top-clients', period],
    queryFn: () => getTopClients({ period, limit: 5 }),
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Reports</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Analyze your business performance
          </p>
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={PERIOD_OPTIONS}
            value={period}
            onChange={(e) => setPeriod(e.target.value as DatePeriod)}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Clients"
          value={overview?.clients.total ?? 0}
          change={overview?.trends.clientsChange}
          icon={<Users className="h-5 w-5 text-primary-600" />}
          iconBg="bg-primary-50"
          loading={isLoadingOverview}
        />
        <StatsCard
          title="Active Clients"
          value={overview?.clients.byStatus?.active ?? 0}
          subtitle={`of ${overview?.clients.total ?? 0} total`}
          icon={<TrendingUp className="h-5 w-5 text-success-600" />}
          iconBg="bg-success-50"
          loading={isLoadingOverview}
        />
        <StatsCard
          title="Interactions"
          value={overview?.interactions.total ?? 0}
          change={overview?.trends.interactionsChange}
          icon={<MessageSquare className="h-5 w-5 text-warning-600" />}
          iconBg="bg-warning-50"
          loading={isLoadingOverview}
        />
        <StatsCard
          title="Team Members"
          value={overview?.team.total ?? 0}
          subtitle={`${overview?.team.active ?? 0} active`}
          icon={<BarChart3 className="h-5 w-5 text-info-600" />}
          iconBg="bg-info-50"
          loading={isLoadingOverview}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clients by Status - Pie Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">
            Clients by Status
          </h3>
          {isLoadingClientStats ? (
            <ChartSkeleton />
          ) : clientStats && clientStats.data.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientStats.data.map((item) => ({
                      name: formatLabel(item.label),
                      value: item.count,
                    }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    labelLine={false}
                  >
                    {clientStats.data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={STATUS_COLORS[entry.label.toLowerCase()] || PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [value, 'Clients']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyChart message="No client data available" />
          )}
        </Card>

        {/* Interactions by Type - Bar Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">
            Interactions by Type
          </h3>
          {isLoadingInteractionStats ? (
            <ChartSkeleton />
          ) : interactionStats && interactionStats.data.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={interactionStats.data.map((item) => ({
                    name: formatLabel(item.label),
                    count: item.count,
                  }))}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip formatter={(value: number) => [value, 'Interactions']} />
                  <Bar dataKey="count" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyChart message="No interaction data available" />
          )}
        </Card>
      </div>

      {/* Activity Timeline - Line Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Activity Timeline
          </div>
        </h3>
        {isLoadingTimeline ? (
          <ChartSkeleton height={300} />
        ) : timeline && timeline.data.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeline.data.map((item) => ({
                  date: formatDate(item.date),
                  clients: item.clients,
                  interactions: item.interactions,
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="clients"
                  name="New Clients"
                  stroke={CHART_COLORS.primary}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="interactions"
                  name="Interactions"
                  stroke={CHART_COLORS.success}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <EmptyChart message="No activity data available" height={300} />
        )}
      </Card>

      {/* Bottom Row - Team Performance & Top Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance Table */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Performance
            </div>
          </h3>
          {isLoadingTeam ? (
            <TableSkeleton rows={4} />
          ) : teamPerformance && teamPerformance.members.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-2 font-medium text-neutral-500">Member</th>
                    <th className="text-right py-3 px-2 font-medium text-neutral-500">Clients</th>
                    <th className="text-right py-3 px-2 font-medium text-neutral-500">Interactions</th>
                    <th className="text-right py-3 px-2 font-medium text-neutral-500">Conversions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamPerformance.members.map((member) => (
                    <tr key={member.userId} className="border-b border-neutral-100 last:border-0">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-medium">
                            {member.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <span className="font-medium text-neutral-900">{member.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-right text-neutral-600">
                        {member.clientsAssigned}
                      </td>
                      <td className="py-3 px-2 text-right text-neutral-600">
                        {member.interactionsCreated}
                      </td>
                      <td className="py-3 px-2 text-right text-neutral-600">
                        {member.clientsConverted}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-neutral-50">
                    <td className="py-3 px-2 font-medium text-neutral-900">Total</td>
                    <td className="py-3 px-2 text-right font-medium text-neutral-900">
                      {teamPerformance.totals.clients}
                    </td>
                    <td className="py-3 px-2 text-right font-medium text-neutral-900">
                      {teamPerformance.totals.interactions}
                    </td>
                    <td className="py-3 px-2 text-right font-medium text-neutral-900">
                      {teamPerformance.totals.conversions}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <EmptyState
              icon={<Users className="h-10 w-10 text-neutral-300" />}
              message="No team performance data"
            />
          )}
        </Card>

        {/* Top Clients */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Top Clients by Activity
            </div>
          </h3>
          {isLoadingTopClients ? (
            <TableSkeleton rows={5} />
          ) : topClients && topClients.clients.length > 0 ? (
            <div className="space-y-3">
              {topClients.clients.map((client, index) => (
                <div
                  key={client.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50"
                >
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-neutral-900 truncate">
                      {client.companyName || client.contactName}
                    </div>
                    {client.companyName && (
                      <div className="text-sm text-neutral-500 truncate">
                        {client.contactName}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={STATUS_BADGE_VARIANTS[client.status.toLowerCase()] || 'default'}>
                      {formatLabel(client.status)}
                    </Badge>
                    <div className="text-sm text-neutral-500">
                      {client.interactionCount} interactions
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Trophy className="h-10 w-10 text-neutral-300" />}
              message="No client activity data"
            />
          )}
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Helper Components
// ─────────────────────────────────────────

interface StatsCardProps {
  title: string;
  value: number;
  change?: number;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg: string;
  loading?: boolean;
}

function StatsCard({ title, value, change, subtitle, icon, iconBg, loading }: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${iconBg}`}>{icon}</div>
        <div className="flex-1">
          <p className="text-sm text-neutral-500">{title}</p>
          {loading ? (
            <div className="h-8 w-16 bg-neutral-200 animate-pulse rounded mt-1" />
          ) : (
            <>
              <p className="text-2xl font-semibold text-neutral-900">{value.toLocaleString()}</p>
              {change !== undefined && (
                <div className="flex items-center gap-1 mt-1">
                  {change >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-success-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-error-500" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      change >= 0 ? 'text-success-600' : 'text-error-600'
                    }`}
                  >
                    {change >= 0 ? '+' : ''}{change}% vs previous period
                  </span>
                </div>
              )}
              {subtitle && (
                <p className="text-xs text-neutral-400 mt-1">{subtitle}</p>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

interface ChartSkeletonProps {
  height?: number;
}

function ChartSkeleton({ height = 256 }: ChartSkeletonProps) {
  return (
    <div
      className="flex items-center justify-center bg-neutral-50 rounded-lg"
      style={{ height }}
    >
      <Spinner size="lg" />
    </div>
  );
}

interface EmptyChartProps {
  message: string;
  height?: number;
}

function EmptyChart({ message, height = 256 }: EmptyChartProps) {
  return (
    <div
      className="flex flex-col items-center justify-center bg-neutral-50 rounded-lg"
      style={{ height }}
    >
      <BarChart3 className="h-10 w-10 text-neutral-300 mb-2" />
      <p className="text-sm text-neutral-500">{message}</p>
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
}

function EmptyState({ icon, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {icon}
      <p className="text-sm text-neutral-500 mt-2">{message}</p>
    </div>
  );
}

interface TableSkeletonProps {
  rows: number;
}

function TableSkeleton({ rows }: TableSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 bg-neutral-100 animate-pulse rounded" />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────

function formatLabel(label: string): string {
  if (!label) return 'Unknown';
  return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
