import { create } from 'zustand';
import type { User, Tenant } from '@/types';
import { getStoredUser, getStoredTenant, getStoredAccessToken } from '@/services/auth.service';

interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAuth: (user: User, tenant: Tenant) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  tenant: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: (user, tenant) => {
    set({
      user,
      tenant,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  clearAuth: () => {
    set({
      user: null,
      tenant: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  setLoading: loading => {
    set({ isLoading: loading });
  },

  initialize: () => {
    try {
      const token = getStoredAccessToken();
      const user = getStoredUser();
      const tenant = getStoredTenant();

      if (token && user && tenant) {
        set({
          user,
          tenant,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          user: null,
          tenant: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      set({
        user: null,
        tenant: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
