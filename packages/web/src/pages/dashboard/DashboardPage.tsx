// Dashboard with Recharts
import { useQuery } from '@tanstack/react-query';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { useAuthStore } from '@/stores';
import { api } from '@/services/api';
import { Card, Spinner } from '@/components/ui';
import { cn } from '@/lib/utils';

/**
 * Dashboard page - main landing after login.
 * Shows KPIs, charts and analytics.
 */

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

interface DashboardOverview {
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

interface ActivityTimelineItem {
  date: string;
  clients: number;
  interactions: number;
}

interface ActivityTimeline {
  data: ActivityTimelineItem[];
  period: {
    start: string;
    end: string;
  };
}

interface TopClient {
  id: string;
  companyName: string;
  contactName: string;
  interactionCount: number;
  status: string;
}

interface TopClientsResponse {
  clients: TopClient[];
  period: {
    start: string;
    end: string;
  };
}

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  active: '#10b981',
  prospect: '#3b82f6',
  inactive: '#6b7280',
  lead: '#f59e0b',
  churned: '#ef4444',
};

const STATUS_LABELS: Record<string, string> = {
  active: 'Activos',
  prospect: 'Prospectos',
  inactive: 'Inactivos',
  lead: 'Leads',
  churned: 'Perdidos',
};

// ─────────────────────────────────────────
// API Hooks
// ─────────────────────────────────────────

function useDashboard() {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => api.get<DashboardOverview>('/reports/dashboard?period=last30days'),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

function useActivityTimeline() {
  return useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: () => api.get<ActivityTimeline>('/reports/activity?days=30'),
    staleTime: 1000 * 60 * 5,
  });
}

function useTopClients() {
  return useQuery({
    queryKey: ['dashboard', 'top-clients'],
    queryFn: () => api.get<TopClientsResponse>('/reports/top-clients?period=last30days&limit=5'),
    staleTime: 1000 * 60 * 5,
  });
}

// ─────────────────────────────────────────
// KPI Card Component
// ─────────────────────────────────────────

interface KPICardProps {
  title: string;
  value: number;
  change?: number;
  subtitle?: string;
  loading?: boolean;
}

function KPICard({ title, value, change, subtitle, loading }: KPICardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <Card className="p-5">
      {loading ? (
        <div className="flex items-center justify-center h-20">
          <Spinner size="sm" />
        </div>
      ) : (
        <>
          <p className="text-sm text-neutral-500">{title}</p>
          <p className="text-2xl font-semibold text-neutral-900 mt-1">
            {value.toLocaleString('es-ES')}
          </p>
          {change !== undefined && (
            <p
              className={cn(
                'text-xs mt-2',
                isPositive && 'text-green-600',
                isNegative && 'text-red-600',
                !isPositive && !isNegative && 'text-neutral-400'
              )}
            >
              {isPositive && '+'}
              {change}% vs periodo anterior
            </p>
          )}
          {subtitle && !change && (
            <p className="text-xs text-neutral-400 mt-2">{subtitle}</p>
          )}
        </>
      )}
    </Card>
  );
}

// ─────────────────────────────────────────
// Chart Components
// ─────────────────────────────────────────

interface StatusPieChartProps {
  data: Record<string, number>;
  loading?: boolean;
}

function StatusPieChart({ data, loading }: StatusPieChartProps) {
  const chartData = Object.entries(data).map(([status, count]) => ({
    name: STATUS_LABELS[status] || status,
    value: count,
    color: STATUS_COLORS[status] || '#6b7280',
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-neutral-400">
        Sin datos disponibles
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [value.toLocaleString('es-ES'), '']}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-sm text-neutral-600">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

interface ActivityChartProps {
  data: ActivityTimelineItem[];
  loading?: boolean;
}

function ActivityChart({ data, loading }: ActivityChartProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-neutral-400">
        Sin datos disponibles
      </div>
    );
  }

  // Format dates for display
  const formattedData = data.map((item) => ({
    ...item,
    dateLabel: new Date(item.date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
    }),
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={formattedData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="dateLabel"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
            }}
            labelFormatter={(label) => label}
          />
          <Area
            type="monotone"
            dataKey="clients"
            name="Clientes"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorClients)"
          />
          <Area
            type="monotone"
            dataKey="interactions"
            name="Interacciones"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorInteractions)"
          />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => (
              <span className="text-sm text-neutral-600">{value}</span>
            )}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface TopClientsChartProps {
  data: TopClient[];
  loading?: boolean;
}

function TopClientsChart({ data, loading }: TopClientsChartProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-neutral-400">
        Sin datos disponibles
      </div>
    );
  }

  const chartData = data.map((client) => ({
    name: client.companyName.length > 15
      ? client.companyName.substring(0, 15) + '...'
      : client.companyName,
    interacciones: client.interactionCount,
    fullName: client.companyName,
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} vertical={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickLine={false}
            axisLine={false}
            width={120}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
            }}
            formatter={(value: number, name: string) => [
              value.toLocaleString('es-ES'),
              name,
            ]}
            labelFormatter={(_, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.fullName;
              }
              return '';
            }}
          />
          <Bar
            dataKey="interacciones"
            name="Interacciones"
            fill="#3b82f6"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─────────────────────────────────────────
// Recent Activity Component
// ─────────────────────────────────────────

interface RecentActivityProps {
  interactions: Record<string, number>;
  loading?: boolean;
}

function RecentActivity({ interactions, loading }: RecentActivityProps) {
  const INTERACTION_LABELS: Record<string, string> = {
    call: 'Llamadas',
    email: 'Emails',
    meeting: 'Reuniones',
    note: 'Notas',
    task: 'Tareas',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Spinner />
      </div>
    );
  }

  const items = Object.entries(interactions);

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-neutral-400">
        No hay actividad reciente
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map(([type, count]) => (
        <div
          key={type}
          className="flex items-center justify-between py-2 px-3 bg-neutral-50 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
              <span className="text-xs text-neutral-600">
                {type.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-neutral-700">
              {INTERACTION_LABELS[type] || type}
            </span>
          </div>
          <span className="text-sm font-medium text-neutral-900">
            {count.toLocaleString('es-ES')}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// Main Dashboard Component
// ─────────────────────────────────────────

export function DashboardPage() {
  const { user, tenant } = useAuthStore();
  const { data: dashboard, isLoading: dashboardLoading } = useDashboard();
  const { data: activity, isLoading: activityLoading } = useActivityTimeline();
  const { data: topClients, isLoading: topClientsLoading } = useTopClients();

  // Calculate active percentage
  const activePercentage = dashboard?.clients.total
    ? Math.round(
        ((dashboard.clients.byStatus.active || 0) / dashboard.clients.total) * 100
      )
    : 0;

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">
          Bienvenido, {user?.firstName}
        </h1>
        <p className="text-neutral-500 mt-1">
          Panel de control de {tenant?.name}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Clientes"
          value={dashboard?.clients.total || 0}
          change={dashboard?.trends.clientsChange}
          loading={dashboardLoading}
        />
        <KPICard
          title="Clientes Activos"
          value={dashboard?.clients.byStatus.active || 0}
          subtitle={`${activePercentage}% del total`}
          loading={dashboardLoading}
        />
        <KPICard
          title="Interacciones (mes)"
          value={dashboard?.interactions.new || 0}
          change={dashboard?.trends.interactionsChange}
          loading={dashboardLoading}
        />
        <KPICard
          title="Prospectos"
          value={dashboard?.clients.byStatus.prospect || 0}
          subtitle={`${dashboard?.clients.new || 0} nuevos este periodo`}
          loading={dashboardLoading}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity timeline chart */}
        <Card padding="none">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="font-semibold text-neutral-900">
              Actividad (Ultimos 30 dias)
            </h2>
          </div>
          <div className="p-4">
            <ActivityChart data={activity?.data || []} loading={activityLoading} />
          </div>
        </Card>

        {/* Client status distribution */}
        <Card padding="none">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="font-semibold text-neutral-900">
              Distribucion de Clientes
            </h2>
          </div>
          <div className="p-4">
            <StatusPieChart
              data={dashboard?.clients.byStatus || {}}
              loading={dashboardLoading}
            />
          </div>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top clients */}
        <Card padding="none">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="font-semibold text-neutral-900">
              Top Clientes por Actividad
            </h2>
          </div>
          <div className="p-4">
            <TopClientsChart
              data={topClients?.clients || []}
              loading={topClientsLoading}
            />
          </div>
        </Card>

        {/* Interaction types */}
        <Card padding="none">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="font-semibold text-neutral-900">
              Tipos de Interaccion
            </h2>
          </div>
          <div className="p-6">
            <RecentActivity
              interactions={dashboard?.interactions.byType || {}}
              loading={dashboardLoading}
            />
          </div>
        </Card>
      </div>

      {/* Team stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-sm text-neutral-500">Equipo Total</p>
          <p className="text-2xl font-semibold text-neutral-900 mt-1">
            {dashboardLoading ? (
              <Spinner size="sm" />
            ) : (
              dashboard?.team.total || 0
            )}
          </p>
          <p className="text-xs text-neutral-400 mt-2">Miembros del equipo</p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-neutral-500">Usuarios Activos</p>
          <p className="text-2xl font-semibold text-neutral-900 mt-1">
            {dashboardLoading ? (
              <Spinner size="sm" />
            ) : (
              dashboard?.team.active || 0
            )}
          </p>
          <p className="text-xs text-neutral-400 mt-2">
            Activos en los ultimos 7 dias
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-neutral-500">Total Interacciones</p>
          <p className="text-2xl font-semibold text-neutral-900 mt-1">
            {dashboardLoading ? (
              <Spinner size="sm" />
            ) : (
              (dashboard?.interactions.total || 0).toLocaleString('es-ES')
            )}
          </p>
          <p className="text-xs text-neutral-400 mt-2">Desde siempre</p>
        </Card>
      </div>
    </div>
  );
}
