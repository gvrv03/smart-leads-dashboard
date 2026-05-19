'use client';

import { useCallback, useRef } from 'react';
import { useLeadsStore } from '@/store/leads.store';
import {
  getLeadsApi,
  createLeadApi,
  updateLeadApi,
  updateLeadStatusApi,
  deleteLeadApi,
  exportLeadsApi,
} from '@/api/leads.api';
import { ICreateLeadDTO, IUpdateLeadDTO, ILeadFilters, LeadStatus } from '@/types/lead.types';

export function useLeads() {
  const leads = useLeadsStore((s) => s.leads);
  const total = useLeadsStore((s) => s.total);
  const page = useLeadsStore((s) => s.page);
  const totalPages = useLeadsStore((s) => s.totalPages);
  const limit = useLeadsStore((s) => s.limit);
  const isLoading = useLeadsStore((s) => s.isLoading);
  const error = useLeadsStore((s) => s.error);
  const filters = useLeadsStore((s) => s.filters);
  const setLeads = useLeadsStore((s) => s.setLeads);
  const setLoading = useLeadsStore((s) => s.setLoading);
  const setError = useLeadsStore((s) => s.setError);
  const setFilter = useLeadsStore((s) => s.setFilter);
  const setPage = useLeadsStore((s) => s.setPage);
  const resetFilters = useLeadsStore((s) => s.resetFilters);

  // Use ref to avoid stale closures without adding to dependency arrays
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const fetchLeads = useCallback(async (overrideFilters?: ILeadFilters) => {
    const currentFilters = overrideFilters || useLeadsStore.getState().filters;
    setLoading(true);
    try {
      const data = await getLeadsApi(currentFilters);
      setLeads(data.leads, data.total, data.page, data.totalPages, data.limit);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch leads';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setLeads, setError]);

  const createLead = useCallback(async (data: ICreateLeadDTO) => {
    await createLeadApi(data);
    await fetchLeads();
  }, [fetchLeads]);

  const updateLead = useCallback(async (id: string, data: IUpdateLeadDTO) => {
    await updateLeadApi(id, data);
    await fetchLeads();
  }, [fetchLeads]);

  const updateLeadStatus = useCallback(async (id: string, status: LeadStatus) => {
    await updateLeadStatusApi(id, status);
    await fetchLeads();
  }, [fetchLeads]);

  const deleteLead = useCallback(async (id: string) => {
    await deleteLeadApi(id);
    await fetchLeads();
  }, [fetchLeads]);

  const exportLeads = useCallback(async () => {
    const currentFilters = useLeadsStore.getState().filters;
    const blob = await exportLeadsApi(currentFilters);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'leads-export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, []);

  return {
    leads,
    total,
    page,
    totalPages,
    limit,
    isLoading,
    error,
    filters,
    fetchLeads,
    createLead,
    updateLead,
    updateLeadStatus,
    deleteLead,
    exportLeads,
    setFilter,
    setPage,
    resetFilters,
  };
}
