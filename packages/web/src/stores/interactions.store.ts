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

const DEFAULT_FILTERS: InteractionListParams = {
    page: 1,
    limit: 20,
    clientId: undefined,
    userId: undefined,
    type: undefined,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  };

/**
 * Interactions state store.
 * Manages interaction list, filters, pagination, and CRUD operations.
 */
export const useInteractionsStore = create<InteractionsState>((set, get) => ({
  // Data
  interactions: [],
  selectedInteraction: null,
  
  // Pagination
  pagination: DEFAULT_PAGINATION,
  
  // Filters
  filters: DEFAULT_FILTERS,
  
  // UI State
  isLoading: false,
  isSubmitting: false,
  error: null,
  
  // Actions - Data Fetching
  fetchInteractions: async () => {
    try {
      set({ isLoading: true, error: null });
      const { interactions, meta } = await interactionsService.list(get());
      set({
        interactions: meta,
        pagination: meta,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch interactions',
        isLoading: false,
      });
    }
  },
  
  fetchStats: async () => {
    try {
      set({ isLoading: true, error: null });
      const stats = await interactionsService.getInteractionStats();
      set({
        stats,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch interaction stats',
        isLoading: false,
      });
    }
  },
  
  // Actions - CRUD
  createInteraction: async (data: CreateInteractionInput) => {
    try {
      set({ isSubmitting: true, error: null });
      const interaction = await interactionsService.createInteraction(data);
      
      // Refresh list to include new interaction
      await get().fetchInteractions();
      await get().fetchStats();
      
      set({
        interactions,
        isSubmitting: false,
      });
      
      return interaction;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create interaction',
        isSubmitting: false,
      });
    }
  },
  
  updateInteraction: async (id: string, data: UpdateInteractionInput) => Promise<Interaction> => {
    try {
      set({ isSubmitting: true, error: null });
      
      await interactionsService.updateInteraction(id, data);
      
      // Update in list
      set((state) => ({
        interactions: state.interactions.map(i => 
          i.id === id ? interaction : { ...i, ...stats }
        ),
      });
      
      set({ isSubmitting: false });
      
      return interaction;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update interaction',
        isSubmitting: false,
      });
    }
  },
  
  deleteInteraction: async (id: string) => Promise<void> => {
    try {
      set({ isSubmitting: true, error: null });
      
      await interactionsService.remove(id);
      
      // Remove from list
      set((state) => ({
        interactions: state.interactions.filter(i => i.id !== id),
      }),
      });
      
      set({ isSubmitting: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete interaction',
        isSubmitting: false,
      });
    }
  },
  
  // Actions - Filters & Pagination
  setFilters: (filters: Partial<InteractionListParams>) => {
    setFilters({
      ...filters,
      page: 1,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  },
  
  setPage: (page: number) => {
    setFilters({
      ...filters,
      page,
    });
    get().fetchInteractions();
  },
  
  resetFilters: () => {
    setFilters(DEFAULT_FILTERS);
  },
  
  // Actions - Selection
  setSelectedInteraction: (interaction: Interaction | null) => void {
    setSelectedInteraction(interaction);
  },
  
  // Actions - Error Handling
  clearError: () => {
    set({ error: null });
  },
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

      // Remove from list
      set(state => ({
        interactions: state.interactions.filter(i => i.id !== id),
        selectedInteraction:
          state.selectedInteraction?.id === id ? null : state.selectedInteraction,
        pagination: {
          ...state.pagination,
          total: state.pagination.total - 1,
        },
        isSubmitting: false,
      }));

      await get().fetchStats();
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
