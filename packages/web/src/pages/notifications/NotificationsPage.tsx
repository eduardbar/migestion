import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Bell, Check, CheckCheck, Trash2, Filter, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, Button, Spinner, EmptyState } from '@/components/ui';
import * as notificationsService from '@/services/notifications.service';
import type { Notification } from '@/types';

/**
 * Notifications page.
 * Full list of notifications with filtering, pagination, and bulk actions.
 */

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────

const NOTIFICATION_TYPES = [
  { value: '', label: 'Todos los tipos' },
  { value: 'client_assigned', label: 'Cliente asignado' },
  { value: 'role_changed', label: 'Cambio de rol' },
  { value: 'team_invite', label: 'Invitación de equipo' },
  { value: 'system', label: 'Sistema' },
];

// ─────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────

export function NotificationsPage() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    unreadOnly: false,
    type: '',
  });
  const [page, setPage] = useState(1);
  const limit = 20;

  // Fetch notifications
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['notifications', page, filters],
    queryFn: () =>
      notificationsService.getNotifications({
        page,
        limit,
        unreadOnly: filters.unreadOnly,
        type: filters.type || undefined,
      }),
  });

  // Mark single as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: notificationsService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  // Mark all as read mutation
  const markAllAsReadMutation = useMutation({
    mutationFn: notificationsService.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  // Delete notification mutation
  const deleteMutation = useMutation({
    mutationFn: notificationsService.deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  // Delete all read mutation
  const deleteReadMutation = useMutation({
    mutationFn: notificationsService.deleteReadNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const notifications = data?.data ?? [];
  const pagination = data?.pagination;
  const unreadCount = data?.unreadCount ?? 0;

  const handleFilterChange = (key: keyof typeof filters, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'client_assigned':
        return (
          <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
            <span className="text-primary-600 font-medium">C</span>
          </div>
        );
      case 'role_changed':
        return (
          <div className="h-10 w-10 rounded-full bg-warning-50 flex items-center justify-center flex-shrink-0">
            <span className="text-warning-600 font-medium">R</span>
          </div>
        );
      case 'team_invite':
        return (
          <div className="h-10 w-10 rounded-full bg-success-50 flex items-center justify-center flex-shrink-0">
            <span className="text-success-600 font-medium">T</span>
          </div>
        );
      default:
        return (
          <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
            <Bell className="h-5 w-5 text-neutral-600" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Notificaciones</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {unreadCount > 0
              ? `${unreadCount} notificaciones sin leer`
              : 'No tienes notificaciones sin leer'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
            Actualizar
          </Button>
          {unreadCount > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => markAllAsReadMutation.mutate()}
              disabled={markAllAsReadMutation.isPending}
            >
              <CheckCheck className="h-4 w-4" />
              Marcar todas como leídas
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-neutral-500" />
            <span className="text-sm font-medium text-neutral-700">Filtros:</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Type filter */}
            <select
              value={filters.type}
              onChange={e => handleFilterChange('type', e.target.value)}
              className="h-9 px-3 text-sm border border-neutral-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {NOTIFICATION_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {/* Unread only toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.unreadOnly}
                onChange={e => handleFilterChange('unreadOnly', e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">Solo sin leer</span>
            </label>
          </div>

          {/* Clear read notifications */}
          <div className="sm:ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteReadMutation.mutate()}
              disabled={deleteReadMutation.isPending}
              className="text-error-600 hover:text-error-700 hover:bg-error-50"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar leídas
            </Button>
          </div>
        </div>
      </Card>

      {/* Notifications list */}
      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="No hay notificaciones"
            description={
              filters.unreadOnly
                ? 'No tienes notificaciones sin leer'
                : 'Cuando recibas notificaciones, aparecerán aquí'
            }
          />
        ) : (
          <>
            <ul className="divide-y divide-neutral-200">
              {notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={() => markAsReadMutation.mutate(notification.id)}
                  onDelete={() => deleteMutation.mutate(notification.id)}
                  isMarkingRead={markAsReadMutation.isPending}
                  isDeleting={deleteMutation.isPending}
                  getIcon={getNotificationIcon}
                />
              ))}
            </ul>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200">
                <p className="text-sm text-neutral-500">
                  Mostrando {(page - 1) * limit + 1} - {Math.min(page * limit, pagination.total)} de{' '}
                  {pagination.total}
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Anterior
                  </Button>
                  <span className="text-sm text-neutral-600">
                    Página {page} de {pagination.totalPages}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                    disabled={page === pagination.totalPages}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────
// Notification Item
// ─────────────────────────────────────────

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: () => void;
  onDelete: () => void;
  isMarkingRead: boolean;
  isDeleting: boolean;
  getIcon: (type: string) => React.ReactNode;
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  isMarkingRead,
  isDeleting,
  getIcon,
}: NotificationItemProps) {
  return (
    <li
      className={cn(
        'relative px-6 py-4 hover:bg-neutral-50 transition-colors',
        !notification.read && 'bg-primary-50/30'
      )}
    >
      <div className="flex gap-4">
        {/* Icon */}
        {getIcon(notification.type)}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'text-sm',
              notification.read ? 'text-neutral-600' : 'text-neutral-900 font-medium'
            )}
          >
            {notification.title}
          </p>
          {notification.message && (
            <p className="text-sm text-neutral-500 mt-1">{notification.message}</p>
          )}
          <p className="text-xs text-neutral-400 mt-2">
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
              locale: es,
            })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-start gap-1">
          {!notification.read && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMarkAsRead}
              disabled={isMarkingRead}
              title="Marcar como leída"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            disabled={isDeleting}
            className="text-neutral-400 hover:text-error-600"
            title="Eliminar"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Unread indicator */}
      {!notification.read && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary-500" />
      )}
    </li>
  );
}
