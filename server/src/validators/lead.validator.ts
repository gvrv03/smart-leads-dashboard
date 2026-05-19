import { z } from 'zod';

export const createLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']),
  source: z.enum(['Website', 'Instagram', 'Referral']),
});

export const updateLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']).optional(),
  source: z.enum(['Website', 'Instagram', 'Referral']).optional(),
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']),
});

export const leadFiltersSchema = z.object({
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']).optional(),
  source: z.enum(['Website', 'Instagram', 'Referral']).optional(),
  search: z.string().optional(),
  sort: z.enum(['latest', 'oldest']).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});
