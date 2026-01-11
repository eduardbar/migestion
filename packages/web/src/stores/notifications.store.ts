import { create } from 'zustand';
import type { Notification } from '@/types';
import * as notificationsService from '@/services/notifications.service';
import * as socketService from '@/services/socket.service';
import type { NotificationPayload } from '@/services/socket.service';

/**
 * Notifications state store.
 * Manages notification state with real-time updates via Socket.IO.
 */

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  
  // Toast state
  toast: NotificationPayload | null;
  
  // Actions
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  
  // Real-time handlers
  addNotification: (payload: NotificationPayload) => void;
  setUnreadCount: (count: number) => void;
  
  // Toast handlers
  showToast: (notification: NotificationPayload) => void;
  dismissToast: () => void;
  
  // Initialize real-time listeners
  initializeListeners: () => () => void;
  
  // Reset state
  reset: () => void;
}

// ─────────────────────────────────────────
// Initial State
// ─────────────────────────────────────────

const initialState = {
  notifications: [] as Notification[],
  unreadCount: 0,
  isLoading: false,
  error: null as string | null,
  toast: null as NotificationPayload | null,
};

// ─────────────────────────────────────────
// Store
// ─────────────────────────────────────────

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  ...initialState,

  // ─────────────────────────────────────────
  // Fetch Actions
  // ─────────────────────────────────────────

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await notificationsService.getNotifications({ limit: 20 });
      set({
        notifications: response.data,
        unreadCount: response.unreadCount,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch notifications',
        isLoading: false,
      });
    }
  },

  fetchUnreadCount: async () => {
    try {
      const counts = await notificationsService.getNotificationCounts();
      set({ unreadCount: counts.unread });
    } catch (error) {
      console.error('Failed to fetch notification count:', error);
    }
  },

  // ─────────────────────────────────────────
  // Mutation Actions
  // ─────────────────────────────────────────

  markAsRead: async (id: string) => {
    try {
      await notificationsService.markAsRead(id);
      
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  },

  markAllAsRead: async () => {
    try {
      await notificationsService.markAllAsRead();
      
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  },

  deleteNotification: async (id: string) => {
    try {
      const notification = get().notifications.find((n) => n.id === id);
      await notificationsService.deleteNotification(id);
      
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: notification && !notification.read
          ? Math.max(0, state.unreadCount - 1)
          : state.unreadCount,
      }));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  },

  // ─────────────────────────────────────────
  // Real-time Handlers
  // ─────────────────────────────────────────

  addNotification: (payload: NotificationPayload) => {
    // Convert payload to Notification type
    const notification: Notification = {
      id: payload.id,
      type: payload.type,
      title: payload.title,
      message: payload.message,
      data: payload.data ?? null,
      read: false,
      createdAt: payload.createdAt,
    };

    set((state) => ({
      // Add to front of list, keeping max 50
      notifications: [notification, ...state.notifications].slice(0, 50),
      unreadCount: state.unreadCount + 1,
    }));

    // Show toast for new notification
    get().showToast(payload);
  },

  setUnreadCount: (count: number) => {
    set({ unreadCount: count });
  },

  // ─────────────────────────────────────────
  // Toast Handlers
  // ─────────────────────────────────────────

  showToast: (notification: NotificationPayload) => {
    set({ toast: notification });
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      const currentToast = get().toast;
      if (currentToast?.id === notification.id) {
        set({ toast: null });
      }
    }, 5000);
  },

  dismissToast: () => {
    set({ toast: null });
  },

  // ─────────────────────────────────────────
  // Initialize Socket Listeners
  // ─────────────────────────────────────────

  initializeListeners: () => {
    const { addNotification, setUnreadCount } = get();

    const unsubNotification = socketService.onNotification(addNotification);
    const unsubCount = socketService.onCountUpdate(setUnreadCount);

    // Return cleanup function
    return () => {
      unsubNotification();
      unsubCount();
    };
  },

  // ─────────────────────────────────────────
  // Reset
  // ─────────────────────────────────────────

  reset: () => {
    set(initialState);
  },
}));
