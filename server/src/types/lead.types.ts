export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';

export interface ILead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateLeadDTO {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export interface IUpdateLeadDTO extends Partial<ICreateLeadDTO> {}

export interface ILeadFilters {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: 'latest' | 'oldest';
  page?: number;
  limit?: number;
}

export interface IPaginatedLeads {
  leads: ILead[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}
