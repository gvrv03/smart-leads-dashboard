'use client';

import { create } from 'zustand';
import { ILead, ILeadFilters } from '@/types/lead.types';
import { DEFAULT_PAGE_LIMIT } from '@/constants';

interface LeadsState {
  leads: ILead[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  isLoading: boolean;
  error: string | null;
  filters: ILeadFilters;
  setLeads: (leads: ILead[], total: number, page: number, totalPages: number, limit: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilter: (filters: Partial<ILeadFilters>) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

const defaultFilters: ILeadFilters = {
  sort: 'latest',
  page: 1,
  limit: DEFAULT_PAGE_LIMIT,
};

export const useLeadsStore = create<LeadsState>((set) => ({
  leads: [],
  total: 0,
  page: 1,
  totalPages: 0,
  limit: DEFAULT_PAGE_LIMIT,
  isLoading: false,
  error: null,
  filters: defaultFilters,

  setLeads: (leads, total, page, totalPages, limit) => {
    set({ leads, total, page, totalPages, limit, error: null });
  },

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error, isLoading: false }),

  setFilter: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters, page: 1 },
    })),

  setPage: (page) =>
    set((state) => ({
      filters: { ...state.filters, page },
    })),

  resetFilters: () => set({ filters: defaultFilters }),
}));
