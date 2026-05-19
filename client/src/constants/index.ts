import { LeadStatus, LeadSource } from '@/types/lead.types';

export const STATUS_OPTIONS: { label: string; value: LeadStatus }[] = [
  { label: 'New', value: 'New' },
  { label: 'Contacted', value: 'Contacted' },
  { label: 'Qualified', value: 'Qualified' },
  { label: 'Lost', value: 'Lost' },
];

export const SOURCE_OPTIONS: { label: string; value: LeadSource }[] = [
  { label: 'Website', value: 'Website' },
  { label: 'Instagram', value: 'Instagram' },
  { label: 'Referral', value: 'Referral' },
];

export const SORT_OPTIONS: { label: string; value: 'latest' | 'oldest' }[] = [
  { label: 'Latest First', value: 'latest' },
  { label: 'Oldest First', value: 'oldest' },
];

export const DEFAULT_PAGE_LIMIT = 10;
