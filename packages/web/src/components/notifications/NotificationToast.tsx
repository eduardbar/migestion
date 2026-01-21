import { X, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotificationsStore } from '@/stores';

/**
 * Toast notification component for real-time alerts.
 * Shows a brief notification when a new notification arrives.
 */
export function NotificationToast() {
  const { toast, dismissToast, markAsRead } = useNotificationsStore();

  // Handle click on toast to mark as read
  const handleClick = () => {
    if (toast) {
      markAsRead(toast.id);
      dismissToast();
    }
  };

  if (!toast) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 animate-in slide-in-from-right-full fade-in duration-300',
        'max-w-sm w-full bg-white border border-neutral-200 rounded-lg shadow-lg'
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-50 flex items-center justify-center">
          <Bell className="h-4 w-4 text-primary-600" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 cursor-pointer" onClick={handleClick}>
          <p className="text-sm font-medium text-neutral-900">{toast.title}</p>
          {toast.message && (
            <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{toast.message}</p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={dismissToast}
          className="flex-shrink-0 p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600"
          aria-label="Cerrar notificación"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-neutral-100 rounded-b-lg overflow-hidden">
        <div className="h-full bg-primary-500 animate-progress" />
      </div>
    </div>
  );
}
