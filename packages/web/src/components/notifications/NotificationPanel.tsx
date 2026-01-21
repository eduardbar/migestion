import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, CheckCheck, Trash2, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useNotificationsStore } from '@/stores';
import { ROUTES } from '@/lib/constants';
import { Spinner } from '@/components/ui';

/**
 * Notification dropdown panel.
 */

interface NotificationPanelProps {
  onClose: () => void;
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const {
    notifications,
    unreadCount,
    isLoading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotificationsStore();

  // Fetch notifications when panel opens
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAsRead = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    await markAsRead(id);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleDelete = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    await deleteNotification(id);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'client_assigned':
        return (
          <div className="h-8 w-8 rounded-full bg-primary-50 flex items-center justify-center">
            <span className="text-primary-600 text-sm">C</span>
          </div>
        );
      case 'role_changed':
        return (
          <div className="h-8 w-8 rounded-full bg-warning-50 flex items-center justify-center">
            <span className="text-warning-600 text-sm">R</span>
          </div>
        );
      case 'team_invite':
        return (
          <div className="h-8 w-8 rounded-full bg-success-50 flex items-center justify-center">
            <span className="text-success-600 text-sm">T</span>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center">
            <span className="text-neutral-600 text-sm">N</span>
          </div>
        );
    }
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-neutral-200 rounded-lg shadow-lg z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
        <h3 className="font-medium text-neutral-900">Notificaciones</h3>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Marcar todas como leídas
          </button>
        )}
      </div>

      {/* Notifications list */}
      <div className="max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner size="md" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-8 text-center text-neutral-500">
            <p className="text-sm">No tienes notificaciones</p>
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {notifications.map(notification => (
              <li
                key={notification.id}
                className={cn(
                  'relative px-4 py-3 hover:bg-neutral-50 transition-colors',
                  !notification.read && 'bg-primary-50/30'
                )}
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  {getNotificationIcon(notification.type)}

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
                      <p className="text-xs text-neutral-500 mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                    )}
                    <p className="text-xs text-neutral-400 mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-start gap-1">
                    {!notification.read && (
                      <button
                        onClick={e => handleMarkAsRead(notification.id, e)}
                        className="p-1 rounded hover:bg-neutral-200 text-neutral-400 hover:text-neutral-600"
                        title="Marcar como leída"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={e => handleDelete(notification.id, e)}
                      className="p-1 rounded hover:bg-neutral-200 text-neutral-400 hover:text-error-600"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Unread indicator */}
                {!notification.read && (
                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary-500" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-neutral-200">
        <Link
          to={ROUTES.NOTIFICATIONS || '/notifications'}
          onClick={onClose}
          className="flex items-center justify-center gap-2 text-sm text-primary-600 hover:text-primary-700"
        >
          Ver todas las notificaciones
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
