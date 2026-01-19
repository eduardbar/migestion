import { create } from 'zustand';
import type { Interaction, PaginationMeta } from '@/types';
import * as interactionsService from '@/services/interactions.service';
import type {
  InteractionListParams,
  CreateInteractionInput,
  UpdateInteractionInput,
  InteractionStats,
} from '@/services/interactions.service';

/**
 * Interactions state store.
 * Manages interaction list, filters, pagination, and CRUD operations.
 */

interface InteractionsState {
  // Data
  interactions: Interaction[];
  selectedInteraction: Interaction | null;
  stats: InteractionStats | null;

  // Pagination
  pagination: PaginationMeta;

  // Filters
  filters: InteractionListParams;

  // UI State
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;

  // Actions - Data Fetching
  fetchInteractions: () => Promise<void>;
  fetchInteraction: (id: string) => Promise<void>;
  fetchClientTimeline: (clientId: string) => Promise<void>;
  fetchStats: () => Promise<void>;

  // Actions - CRUD
  createInteraction: (data: CreateInteractionInput) => Promise<Interaction>;
  updateInteraction: (id: string, data: UpdateInteractionInput) => Promise<Interaction>;
  deleteInteraction: (id: string) => Promise<void>;

  // Actions - Filters & Pagination
  setFilters: (filters: Partial<InteractionListParams>) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;

  // Actions - Selection
  setSelectedInteraction: (interaction: Interaction | null) => void;

  // Actions - Error Handling
  clearError: () => void;
}

const DEFAULT_FILTERS: InteractionListParams = {
  page: 1,
  limit: 20,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

const DEFAULT_PAGINATION: PaginationMeta = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
};

export const useInteractionsStore = create<InteractionsState>((set, get) => ({
  // Initial State
  interactions: [],
  selectedInteraction: null,
  stats: null,
  pagination: DEFAULT_PAGINATION,
  filters: DEFAULT_FILTERS,
  isLoading: false,
  isSubmitting: false,
  error: null,

  // ─────────────────────────────────────────
  // Data Fetching
  // ─────────────────────────────────────────

  fetchInteractions: async () => {
    try {
      set({ isLoading: true, error: null });

      const { filters } = get();
      const response = await interactionsService.getInteractions(filters);

      // Handle both array response and object response
      const interactions = Array.isArray(response) ? response : response?.interactions || [];
      const meta = response && !Array.isArray(response) ? response.meta : DEFAULT_PAGINATION;

      set({
        interactions,
        pagination: meta,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch interactions',
        isLoading: false,
        interactions: [],
      });
    }
  },

  fetchInteraction: async (id: string) => {
    try {
      set({ isLoading: true, error: null });

      const interaction = await interactionsService.getInteraction(id);

      set({
        selectedInteraction: interaction,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch interaction',
        isLoading: false,
      });
    }
  },

  fetchClientTimeline: async (clientId: string) => {
    try {
      set({ isLoading: true, error: null });

      const { filters } = get();
      const response = await interactionsService.getClientTimeline(clientId, {
        page: filters.page,
        limit: filters.limit,
      });

      set({
        interactions: response.interactions,
        pagination: response.meta,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch client timeline',
        isLoading: false,
      });
    }
  },

  fetchStats: async () => {
    try {
      const stats = await interactionsService.getInteractionStats();
      set({ stats });
    } catch (error) {
      console.error('Failed to fetch interaction stats:', error);
    }
  },

  // ─────────────────────────────────────────
  // CRUD Operations
  // ─────────────────────────────────────────

  createInteraction: async (data: CreateInteractionInput) => {
    try {
      set({ isSubmitting: true, error: null });

      const interaction = await interactionsService.createInteraction(data);

      await get().fetchInteractions();
      await get().fetchStats();

      set({ isSubmitting: false });
      return interaction;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create interaction',
        isSubmitting: false,
      });
      throw error;
    }
  },

  updateInteraction: async (id: string, data: UpdateInteractionInput) => {
    try {
      set({ isSubmitting: true, error: null });

      const interaction = await interactionsService.updateInteraction(id, data);

      // Update in list
      set(state => ({
        interactions: state.interactions.map(i => (i.id === id ? interaction : i)),
        selectedInteraction:
          state.selectedInteraction?.id === id ? interaction : state.selectedInteraction,
        isSubmitting: false,
      }));

      return interaction;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update interaction',
        isSubmitting: false,
      });
      throw error;
    }
  },

  deleteInteraction: async (id: string) => {
    try {
      set({ isSubmitting: true, error: null });

      await interactionsService.deleteInteraction(id);

      await get().fetchInteractions();
      await get().fetchStats();

      set({ isSubmitting: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete interaction',
        isSubmitting: false,
      });
      throw error;
    }
  },

  // ─────────────────────────────────────────
  // Filters & Pagination
  // ─────────────────────────────────────────

  setFilters: (newFilters: Partial<InteractionListParams>) => {
    set(state => ({
      filters: {
        ...state.filters,
        ...newFilters,
        page: 1, // Reset to first page when filters change
      },
    }));
    get().fetchInteractions();
  },

  setPage: (page: number) => {
    set(state => ({
      filters: {
        ...state.filters,
        page,
      },
    }));
    get().fetchInteractions();
  },

  resetFilters: () => {
    set({ filters: DEFAULT_FILTERS });
    get().fetchInteractions();
  },

  // ─────────────────────────────────────────
  // Selection
  // ─────────────────────────────────────────

  setSelectedInteraction: (interaction: Interaction | null) => {
    set({ selectedInteraction: interaction });
  },

  // ─────────────────────────────────────────
  // Error Handling
  // ─────────────────────────────────────────

  clearError: () => {
    set({ error: null });
  },
}));
