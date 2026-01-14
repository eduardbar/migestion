import { API_BASE, STORAGE_KEYS } from '@/lib/constants';
import type { ApiResponse, ApiError } from '@/types';

/**
 * API client with automatic token refresh and error handling.
 *
 * @remarks
 * Following Clean Code principles:
 * - Single responsibility: only handles HTTP communication
 * - Centralized error handling
 * - Automatic token management
 */

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  skipAuth?: boolean;
};

class ApiClient {
  private baseUrl: string;
  private refreshPromise: Promise<string | null> | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TENANT);
  }

  private async refreshAccessToken(): Promise<string | null> {
    // Prevent multiple simultaneous refresh attempts
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    this.refreshPromise = this.doRefresh(refreshToken);

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async doRefresh(refreshToken: string): Promise<string | null> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        // Refresh failed (token expired or invalid)
        this.clearTokens();
        return null;
      }

      const data = await response.json();
      if (data.success && data.data.accessToken) {
        this.setTokens(data.data.accessToken, data.data.refreshToken);
        return data.data.accessToken;
      }

      // Unexpected response format
      this.clearTokens();
      return null;
    } catch (error) {
      // Network error or other issue
      console.error('Token refresh failed:', error);
      this.clearTokens();
      return null;
    }
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {}, skipAuth = false } = options;

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (!skipAuth) {
      const token = this.getAccessToken();
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    const config: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    let response = await fetch(`${this.baseUrl}${endpoint}`, config);

    // Handle token expiration - only retry if we have a refresh token
    if (response.status === 401 && !skipAuth) {
      const refreshToken = this.getRefreshToken();

      if (refreshToken) {
        const newToken = await this.refreshAccessToken();

        if (newToken) {
          requestHeaders['Authorization'] = `Bearer ${newToken}`;
          config.headers = requestHeaders;
          response = await fetch(`${this.baseUrl}${endpoint}`, config);
        } else {
          this.clearTokens();
          this.redirectToLogin();
          throw new Error('Session expired');
        }
      } else {
        this.clearTokens();
        this.redirectToLogin();
        throw new Error('No valid session');
      }
    }

    const data = await response.json();

    if (!response.ok) {
      const error = data as ApiError;
      throw new ApiRequestError(
        error.error.message,
        error.error.code,
        response.status,
        error.error.errors
      );
    }

    return (data as ApiResponse<T>).data;
  }

  private redirectToLogin(): void {
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }

  // Convenience methods
  get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  put<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  patch<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

/**
 * Custom error class for API requests.
 */
export class ApiRequestError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

// Export singleton instance
export const api = new ApiClient(API_BASE);
