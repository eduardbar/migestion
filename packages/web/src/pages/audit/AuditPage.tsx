import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useAuthStore } from '@/stores';
import {
  Card,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  Spinner,
  Select,
  Input,
  Button,
  Pagination,
} from '@/components/ui';

/**
 * Audit Log Viewer Page.
 * Shows system activity logs (admin/owner only).
 */

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

interface AuditLog {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  userId: string | null;
  oldValues: Record<string, unknown> | null;
  newValues: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

interface AuditLogListResponse {
  data: AuditLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface AuditFilters {
  action?: string;
  entity?: string;
  startDate?: string;
  endDate?: string;
}

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────

const ACTION_LABELS: Record<string, string> = {
  create: 'Crear',
  update: 'Actualizar',
  delete: 'Eliminar',
  login: 'Inicio sesion',
  logout: 'Cierre sesion',
  export: 'Exportar',
  import: 'Importar',
  assign: 'Asignar',
  unassign: 'Desasignar',
};

const ACTION_COLORS: Record<string, string> = {
  create: 'bg-green-50 text-green-700',
  update: 'bg-blue-50 text-blue-700',
  delete: 'bg-red-50 text-red-700',
  login: 'bg-purple-50 text-purple-700',
  logout: 'bg-gray-50 text-gray-700',
  export: 'bg-yellow-50 text-yellow-700',
  import: 'bg-cyan-50 text-cyan-700',
  assign: 'bg-indigo-50 text-indigo-700',
  unassign: 'bg-orange-50 text-orange-700',
};

const ENTITY_LABELS: Record<string, string> = {
  user: 'Usuario',
  client: 'Cliente',
  interaction: 'Interaccion',
  segment: 'Segmento',
  notification: 'Notificacion',
  tenant: 'Tenant',
  session: 'Sesion',
};

const ACTION_OPTIONS = [
  { value: '', label: 'Todas las acciones' },
  { value: 'create', label: 'Crear' },
  { value: 'update', label: 'Actualizar' },
  { value: 'delete', label: 'Eliminar' },
  { value: 'login', label: 'Inicio sesion' },
  { value: 'logout', label: 'Cierre sesion' },
];

const ENTITY_OPTIONS = [
  { value: '', label: 'Todas las entidades' },
  { value: 'user', label: 'Usuario' },
  { value: 'client', label: 'Cliente' },
  { value: 'interaction', label: 'Interaccion' },
  { value: 'session', label: 'Sesion' },
  { value: 'tenant', label: 'Tenant' },
];

// ─────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────

function useAuditLogs(page: number, filters: AuditFilters) {
  const params = new URLSearchParams();
  params.set('page', page.toString());
  params.set('limit', '20');
  if (filters.action) params.set('action', filters.action);
  if (filters.entity) params.set('entity', filters.entity);
  if (filters.startDate) params.set('startDate', filters.startDate);
  if (filters.endDate) params.set('endDate', filters.endDate);

  return useQuery({
    queryKey: ['audit', page, filters],
    queryFn: () => api.get<AuditLogListResponse>(`/audit?${params.toString()}`),
    staleTime: 1000 * 30, // 30 seconds
  });
}

// ─────────────────────────────────────────
// Components
// ─────────────────────────────────────────

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatValues(values: Record<string, unknown> | null): string {
  if (!values) return '-';
  const entries = Object.entries(values).slice(0, 3);
  return entries.map(([k, v]) => `${k}: ${String(v).substring(0, 30)}`).join(', ');
}

interface AuditDetailModalProps {
  log: AuditLog | null;
  onClose: () => void;
}

function AuditDetailModal({ log, onClose }: AuditDetailModalProps) {
  if (!log) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h3 className="font-semibold text-neutral-900">Detalle de Auditoria</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600">
            &times;
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-500">Accion</p>
              <Badge className={ACTION_COLORS[log.action]}>
                {ACTION_LABELS[log.action] || log.action}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Entidad</p>
              <p className="text-sm font-medium text-neutral-900">
                {ENTITY_LABELS[log.entity] || log.entity}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Usuario</p>
              <p className="text-sm font-medium text-neutral-900">
                {log.user ? `${log.user.firstName} ${log.user.lastName}` : 'Sistema'}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Fecha</p>
              <p className="text-sm font-medium text-neutral-900">{formatDate(log.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">IP</p>
              <p className="text-sm font-mono text-neutral-700">{log.ipAddress || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">ID Entidad</p>
              <p className="text-sm font-mono text-neutral-700">{log.entityId || '-'}</p>
            </div>
          </div>

          {log.oldValues && Object.keys(log.oldValues).length > 0 && (
            <div>
              <p className="text-sm text-neutral-500 mb-2">Valores Anteriores</p>
              <pre className="bg-neutral-50 p-3 rounded text-xs overflow-auto">
                {JSON.stringify(log.oldValues, null, 2)}
              </pre>
            </div>
          )}

          {log.newValues && Object.keys(log.newValues).length > 0 && (
            <div>
              <p className="text-sm text-neutral-500 mb-2">Valores Nuevos</p>
              <pre className="bg-neutral-50 p-3 rounded text-xs overflow-auto">
                {JSON.stringify(log.newValues, null, 2)}
              </pre>
            </div>
          )}

          {log.userAgent && (
            <div>
              <p className="text-sm text-neutral-500 mb-2">User Agent</p>
              <p className="text-xs text-neutral-600 break-all">{log.userAgent}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────

export function AuditPage() {
  const { user } = useAuthStore();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<AuditFilters>({});
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const { data, isLoading, error } = useAuditLogs(page, filters);

  // Check if user has permission (admin or owner)
  const hasPermission = user?.role === 'admin' || user?.role === 'owner';

  if (!hasPermission) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-neutral-500">No tienes permiso para ver los registros de auditoria.</p>
      </div>
    );
  }

  const handleFilterChange = (key: keyof AuditFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined,
    }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Registro de Auditoria</h1>
        <p className="text-neutral-500 mt-1">Historial de todas las acciones del sistema</p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[150px]">
            <Select
              label="Accion"
              value={filters.action || ''}
              onChange={e => handleFilterChange('action', e.target.value)}
              options={ACTION_OPTIONS}
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <Select
              label="Entidad"
              value={filters.entity || ''}
              onChange={e => handleFilterChange('entity', e.target.value)}
              options={ENTITY_OPTIONS}
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <Input
              label="Desde"
              type="date"
              value={filters.startDate || ''}
              onChange={e => handleFilterChange('startDate', e.target.value)}
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <Input
              label="Hasta"
              type="date"
              value={filters.endDate || ''}
              onChange={e => handleFilterChange('endDate', e.target.value)}
            />
          </div>

          <Button variant="secondary" onClick={clearFilters}>
            Limpiar
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card padding="none">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Spinner />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64 text-red-500">
            Error al cargar los registros
          </div>
        ) : !data?.data.length ? (
          <div className="flex items-center justify-center h-64 text-neutral-400">
            No hay registros de auditoria
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Accion</TableHead>
                  <TableHead>Entidad</TableHead>
                  <TableHead>Detalles</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map(log => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap">{formatDate(log.createdAt)}</TableCell>
                    <TableCell>
                      {log.user ? `${log.user.firstName} ${log.user.lastName}` : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge className={ACTION_COLORS[log.action] || ''}>
                        {ACTION_LABELS[log.action] || log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>{ENTITY_LABELS[log.entity] || log.entity}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {formatValues(log.newValues || log.oldValues)}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{log.ipAddress || '-'}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="text-primary-600 hover:text-primary-800 text-sm"
                      >
                        Ver
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {data.pagination.totalPages > 1 && (
              <div className="px-6 py-4 border-t border-neutral-200">
                <Pagination
                  currentPage={page}
                  totalPages={data.pagination.totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </Card>

      {/* Detail Modal */}
      <AuditDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  );
}
