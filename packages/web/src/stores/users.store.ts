import { create } from 'zustand';
import type { UserRole, PaginationMeta } from '@/types';
import * as usersService from '@/services/users.service';
import type {
  TeamMember,
  TeamListParams,
  InviteUserInput,
  UpdateUserInput,
  TeamStats,
} from '@/services/users.service';

/**
 * Team/Users state store.
 * Manages team member list, filters, pagination, and CRUD operations.
 */

interface UsersState {
  // Data
  users: TeamMember[];
  selectedUser: TeamMember | null;
  stats: TeamStats | null;
  
  // Pagination
  pagination: PaginationMeta;
  
  // Filters
  filters: TeamListParams;
  
  // UI State
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  
  // Actions - Data Fetching
  fetchUsers: () => Promise<void>;
  fetchUser: (id: string) => Promise<void>;
  fetchStats: () => Promise<void>;
  
  // Actions - CRUD
  inviteUser: (data: InviteUserInput) => Promise<TeamMember>;
  updateUser: (id: string, data: UpdateUserInput) => Promise<TeamMember>;
  changeRole: (id: string, role: UserRole) => Promise<TeamMember>;
  deactivateUser: (id: string) => Promise<TeamMember>;
  reactivateUser: (id: string) => Promise<TeamMember>;
  removeUser: (id: string) => Promise<void>;
  
  // Actions - Filters & Pagination
  setFilters: (filters: Partial<TeamListParams>) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
  
  // Actions - Selection
  setSelectedUser: (user: TeamMember | null) => void;
  
  // Actions - Error Handling
  clearError: () => void;
}

const DEFAULT_FILTERS: TeamListParams = {
  page: 1,
  limit: 20,
  sortBy: 'firstName',
  sortOrder: 'asc',
};

const DEFAULT_PAGINATION: PaginationMeta = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
};

export const useUsersStore = create<UsersState>((set, get) => ({
  // Initial State
  users: [],
  selectedUser: null,
  stats: null,
  pagination: DEFAULT_PAGINATION,
  filters: DEFAULT_FILTERS,
  isLoading: false,
  isSubmitting: false,
  error: null,

  // ─────────────────────────────────────────
  // Data Fetching
  // ─────────────────────────────────────────

  fetchUsers: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { filters } = get();
      const response = await usersService.getTeamMembers(filters);
      
      set({
        users: response.users,
        pagination: response.meta,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch team members',
        isLoading: false,
      });
    }
  },

  fetchUser: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const user = await usersService.getTeamMember(id);
      
      set({
        selectedUser: user,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch team member',
        isLoading: false,
      });
    }
  },

  fetchStats: async () => {
    try {
      const stats = await usersService.getTeamStats();
      set({ stats });
    } catch (error) {
      console.error('Failed to fetch team stats:', error);
    }
  },

  // ─────────────────────────────────────────
  // CRUD Operations
  // ─────────────────────────────────────────

  inviteUser: async (data: InviteUserInput) => {
    try {
      set({ isSubmitting: true, error: null });
      
      const user = await usersService.inviteUser(data);
      
      // Refresh list to include new user
      await get().fetchUsers();
      await get().fetchStats();
      
      set({ isSubmitting: false });
      return user;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to invite user',
        isSubmitting: false,
      });
      throw error;
    }
  },

  updateUser: async (id: string, data: UpdateUserInput) => {
    try {
      set({ isSubmitting: true, error: null });
      
      const user = await usersService.updateUser(id, data);
      
      // Update in list
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? user : u)),
        selectedUser: state.selectedUser?.id === id ? user : state.selectedUser,
        isSubmitting: false,
      }));
      
      return user;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update user',
        isSubmitting: false,
      });
      throw error;
    }
  },

  changeRole: async (id: string, role: UserRole) => {
    try {
      set({ isSubmitting: true, error: null });
      
      const user = await usersService.changeUserRole(id, { role });
      
      // Update in list
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? user : u)),
        selectedUser: state.selectedUser?.id === id ? user : state.selectedUser,
        isSubmitting: false,
      }));
      
      await get().fetchStats();
      return user;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to change role',
        isSubmitting: false,
      });
      throw error;
    }
  },

  deactivateUser: async (id: string) => {
    try {
      set({ isSubmitting: true, error: null });
      
      const user = await usersService.deactivateUser(id);
      
      // Update in list
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? user : u)),
        isSubmitting: false,
      }));
      
      await get().fetchStats();
      return user;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to deactivate user',
        isSubmitting: false,
      });
      throw error;
    }
  },

  reactivateUser: async (id: string) => {
    try {
      set({ isSubmitting: true, error: null });
      
      const user = await usersService.reactivateUser(id);
      
      // Update in list
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? user : u)),
        isSubmitting: false,
      }));
      
      await get().fetchStats();
      return user;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to reactivate user',
        isSubmitting: false,
      });
      throw error;
    }
  },

  removeUser: async (id: string) => {
    try {
      set({ isSubmitting: true, error: null });
      
      await usersService.removeUser(id);
      
      // Remove from list
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
        pagination: {
          ...state.pagination,
          total: state.pagination.total - 1,
        },
        isSubmitting: false,
      }));
      
      await get().fetchStats();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to remove user',
        isSubmitting: false,
      });
      throw error;
    }
  },

  // ─────────────────────────────────────────
  // Filters & Pagination
  // ─────────────────────────────────────────

  setFilters: (newFilters: Partial<TeamListParams>) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
        page: 1, // Reset to first page when filters change
      },
    }));
    get().fetchUsers();
  },

  setPage: (page: number) => {
    set((state) => ({
      filters: {
        ...state.filters,
        page,
      },
    }));
    get().fetchUsers();
  },

  resetFilters: () => {
    set({ filters: DEFAULT_FILTERS });
    get().fetchUsers();
  },

  // ─────────────────────────────────────────
  // Selection
  // ─────────────────────────────────────────

  setSelectedUser: (user: TeamMember | null) => {
    set({ selectedUser: user });
  },

  // ─────────────────────────────────────────
  // Error Handling
  // ─────────────────────────────────────────

  clearError: () => {
    set({ error: null });
  },
}));
