import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores';
import { authService } from '@/services';
import { ROUTES, STORAGE_KEYS } from '@/lib/constants';
import type { LoginCredentials, RegisterData } from '@/types';

/**
 * Authentication hook.
 * Provides login, register, and logout functionality with navigation.
 */
export function useAuth() {
  const navigate = useNavigate();
  const { user, tenant, isAuthenticated, isLoading, setAuth, clearAuth, setLoading } =
    useAuthStore();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setLoading(true);
      try {
        const response = await authService.login(credentials);
        setAuth(response.user, response.tenant);
        navigate(ROUTES.DASHBOARD);
        return response;
      } finally {
        setLoading(false);
      }
    },
    [navigate, setAuth, setLoading]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      setLoading(true);
      try {
        const response = await authService.register(data);
        setAuth(response.user, response.tenant);
        navigate(ROUTES.DASHBOARD);
        return response;
      } finally {
        setLoading(false);
      }
    },
    [navigate, setAuth, setLoading]
  );

  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    await authService.logout(refreshToken || undefined);
    clearAuth();
    navigate(ROUTES.LOGIN);
  }, [clearAuth, navigate]);

  const logoutAll = useCallback(async () => {
    await authService.logoutAll();
    clearAuth();
    navigate(ROUTES.LOGIN);
  }, [clearAuth, navigate]);

  return {
    user,
    tenant,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    logoutAll,
  };
}
