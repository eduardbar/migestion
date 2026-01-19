import { create } from 'zustand';
import type {
  Client,
  ClientStatus,
  ClientListParams,
  CreateClientInput,
  UpdateClientInput,
  ClientStats,
  PaginationMeta,
} from '@/types';
import * as clientsService from '@/services/clients.service';

/**
 * Clients state store.
 * Manages client list, filters, pagination, and CRUD operations.
 */

interface ClientsState {
  // Data
  clients: Client[];
  selectedClient: Client | null;
  segments: string[];
  stats: ClientStats[];

  // Pagination
  pagination: PaginationMeta;

  // Filters
  filters: ClientListParams;

  // UI State
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;

  // Actions - Data Fetching
  fetchClients: () => Promise<void>;
  fetchClient: (id: string) => Promise<void>;
  fetchSegments: () => Promise<void>;
  fetchStats: () => Promise<void>;

  // Actions - CRUD
  createClient: (data: CreateClientInput) => Promise<Client>;
  updateClient: (id: string, data: UpdateClientInput) => Promise<Client>;
  deleteClient: (id: string) => Promise<void>;

  // Actions - Bulk
  bulkUpdateStatus: (clientIds: string[], status: ClientStatus) => Promise<number>;
  bulkAssign: (clientIds: string[], assignedToId: string | null) => Promise<number>;

  // Actions - Filters & Pagination
  setFilters: (filters: Partial<ClientListParams>) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;

  // Actions - Selection
  setSelectedClient: (client: Client | null) => void;

  // Actions - Error Handling
  clearError: () => void;
}

const DEFAULT_FILTERS: ClientListParams = {
  page: 1,
  limit: 20,
  status: undefined,
  segment: undefined,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

const DEFAULT_PAGINATION: PaginationMeta = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
};

export const useClientsStore = create<ClientsState>((set, get) => ({
  // Initial State
  clients: [],
  selectedClient: null,
  segments: [],
  stats: [],
  pagination: DEFAULT_PAGINATION,
  filters: DEFAULT_FILTERS,
  isLoading: false,
  isSubmitting: false,
  error: null,

  // ─────────────────────────────────────────
  // Data Fetching
  // ─────────────────────────────────────────

  fetchClients: async () => {
    try {
      set({ isLoading: true, error: null });

      const { filters } = get();
      const response = await clientsService.getClients(filters);

      set({
        clients: response.clients,
        pagination: response.meta,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch clients',
        isLoading: false,
      });
    }
  },

  fetchClient: async (id: string) => {
    try {
      set({ isLoading: true, error: null });

      const client = await clientsService.getClient(id);

      set({
        selectedClient: client,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch client',
        isLoading: false,
      });
    }
  },

  fetchSegments: async () => {
    try {
      const segments = await clientsService.getSegments();
      set({ segments });
    } catch (error) {
      console.error('Failed to fetch segments:', error);
    }
  },

  fetchStats: async () => {
    try {
      const stats = await clientsService.getClientStats();
      set({ stats });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  },

  // ─────────────────────────────────────────
  // CRUD Operations
  // ─────────────────────────────────────────

  createClient: async (data: CreateClientInput) => {
    try {
      set({ isSubmitting: true, error: null });

      const client = await clientsService.createClient(data);

      // Refresh list to include new client
      await get().fetchClients();
      await get().fetchStats();

      set({ isSubmitting: false });
      return client;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create client',
        isSubmitting: false,
      });
      throw error;
    }
  },

  updateClient: async (id: string, data: UpdateClientInput) => {
    try {
      set({ isSubmitting: true, error: null });

      const client = await clientsService.updateClient(id, data);

      // Update in list
      set(state => ({
        clients: state.clients.map(c => (c.id === id ? client : c)),
        selectedClient: state.selectedClient?.id === id ? client : state.selectedClient,
        isSubmitting: false,
      }));

      // Refresh stats if status changed
      if (data.status !== undefined) {
        await get().fetchStats();
      }

      return client;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update client',
        isSubmitting: false,
      });
      throw error;
    }
  },

  deleteClient: async (id: string) => {
    try {
      set({ isSubmitting: true, error: null });

      await clientsService.deleteClient(id);

      await get().fetchClients();
      await get().fetchStats();

      set({ isSubmitting: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete client',
        isSubmitting: false,
      });
      throw error;
    }
  },

  // ─────────────────────────────────────────
  // Bulk Operations
  // ─────────────────────────────────────────

  bulkUpdateStatus: async (clientIds: string[], status: ClientStatus) => {
    try {
      set({ isSubmitting: true, error: null });

      const result = await clientsService.bulkUpdateStatus(clientIds, status);

      // Refresh list and stats
      await get().fetchClients();
      await get().fetchStats();

      set({ isSubmitting: false });
      return result.updatedCount;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update status',
        isSubmitting: false,
      });
      throw error;
    }
  },

  bulkAssign: async (clientIds: string[], assignedToId: string | null) => {
    try {
      set({ isSubmitting: true, error: null });

      const result = await clientsService.bulkAssign(clientIds, assignedToId);

      // Refresh list
      await get().fetchClients();

      set({ isSubmitting: false });
      return result.updatedCount;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to assign clients',
        isSubmitting: false,
      });
      throw error;
    }
  },

  // ─────────────────────────────────────────
  // Filters & Pagination
  // ─────────────────────────────────────────

  setFilters: (newFilters: Partial<ClientListParams>) => {
    set(state => ({
      filters: {
        ...state.filters,
        ...newFilters,
        page: 1, // Reset to first page when filters change
      },
    }));
    get().fetchClients();
  },

  setPage: (page: number) => {
    set(state => ({
      filters: {
        ...state.filters,
        page,
      },
    }));
    get().fetchClients();
  },

  resetFilters: () => {
    set({ filters: DEFAULT_FILTERS });
    get().fetchClients();
  },

  // ─────────────────────────────────────────
  // Selection
  // ─────────────────────────────────────────

  setSelectedClient: (client: Client | null) => {
    set({ selectedClient: client });
  },

  // ─────────────────────────────────────────
  // Error Handling
  // ─────────────────────────────────────────

  clearError: () => {
    set({ error: null });
  },
}));
