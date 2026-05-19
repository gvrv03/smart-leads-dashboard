import apiClient from './axios';
import { ILead, ICreateLeadDTO, IUpdateLeadDTO, ILeadFilters, IPaginatedLeads } from '@/types/lead.types';
import { ApiSuccessResponse } from '@/types/api.types';

export const getLeadsApi = async (filters: ILeadFilters): Promise<IPaginatedLeads> => {
  const params = new URLSearchParams();

  if (filters.status) params.append('status', filters.status);
  if (filters.source) params.append('source', filters.source);
  if (filters.search) params.append('search', filters.search);
  if (filters.sort) params.append('sort', filters.sort);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const response = await apiClient.get<ApiSuccessResponse<IPaginatedLeads>>(
    `/leads?${params.toString()}`
  );
  return response.data.data;
};

export const getLeadByIdApi = async (id: string): Promise<ILead> => {
  const response = await apiClient.get<ApiSuccessResponse<ILead>>(`/leads/${id}`);
  return response.data.data;
};

export const createLeadApi = async (data: ICreateLeadDTO): Promise<ILead> => {
  const response = await apiClient.post<ApiSuccessResponse<ILead>>('/leads', data);
  return response.data.data;
};

export const updateLeadApi = async (id: string, data: IUpdateLeadDTO): Promise<ILead> => {
  const response = await apiClient.put<ApiSuccessResponse<ILead>>(`/leads/${id}`, data);
  return response.data.data;
};

export const updateLeadStatusApi = async (id: string, status: string): Promise<ILead> => {
  const response = await apiClient.patch<ApiSuccessResponse<ILead>>(`/leads/${id}/status`, { status });
  return response.data.data;
};

export const deleteLeadApi = async (id: string): Promise<void> => {
  await apiClient.delete(`/leads/${id}`);
};

export const exportLeadsApi = async (filters: ILeadFilters): Promise<Blob> => {
  const params = new URLSearchParams();

  if (filters.status) params.append('status', filters.status);
  if (filters.source) params.append('source', filters.source);
  if (filters.search) params.append('search', filters.search);
  if (filters.sort) params.append('sort', filters.sort);

  const response = await apiClient.get(`/leads/export?${params.toString()}`, {
    responseType: 'blob',
  });
  return response.data as Blob;
};

export interface ILeadStats {
  total: number;
  byStatus: Record<string, number>;
  bySource: Record<string, number>;
  daily: { date: string; count: number }[];
}

export const getLeadStatsApi = async (from?: string, to?: string): Promise<ILeadStats> => {
  const params = new URLSearchParams();
  if (from) params.append('from', from);
  if (to) params.append('to', to);

  const response = await apiClient.get<ApiSuccessResponse<ILeadStats>>(
    `/leads/stats?${params.toString()}`
  );
  return response.data.data;
};

export interface IImportResult {
  imported: number;
  failed: number;
  errors: string[];
  total: number;
}

export const importLeadsApi = async (file: File): Promise<IImportResult> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<ApiSuccessResponse<IImportResult>>(
    '/leads/import',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data.data;
};
