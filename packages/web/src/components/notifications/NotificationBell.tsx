import { useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotificationsStore } from '@/stores';
import { useAuthStore } from '@/stores';
import { NotificationPanel } from './NotificationPanel';

/**
 * Notification bell with unread badge and dropdown panel.
 */
export function NotificationBell() {
  const { unreadCount, fetchUnreadCount, initializeListeners } = useNotificationsStore();
  const { isAuthenticated } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize listeners and fetch initial count (only when authenticated)
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    fetchUnreadCount();
    const cleanup = initializeListeners();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Zustand store functions have stable references
  }, [isAuthenticated]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={toggleOpen}
        className={cn(
          'relative p-2 rounded hover:bg-neutral-100 text-neutral-500 transition-colors',
          isOpen && 'bg-neutral-100 text-neutral-700'
        )}
        aria-label={`Notificaciones${unreadCount > 0 ? ` (${unreadCount} sin leer)` : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell className="h-5 w-5" />

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span
            className={cn(
              'absolute flex items-center justify-center rounded-full bg-error-500 text-white font-medium',
              unreadCount < 10
                ? 'top-1 right-1 h-4 w-4 text-[10px]'
                : 'top-0.5 right-0.5 h-5 min-w-5 px-1 text-[10px]'
            )}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {isOpen && <NotificationPanel onClose={() => setIsOpen(false)} />}
    </div>
  );
}
