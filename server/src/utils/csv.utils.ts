import { ILeadDocument } from '../models/Lead.model';

export const generateCSV = (leads: ILeadDocument[]): string => {
  const headers = ['Name', 'Email', 'Status', 'Source', 'Created At', 'Updated At'];
  const rows = leads.map((lead) => [
    escapeCsvField(lead.name),
    escapeCsvField(lead.email),
    escapeCsvField(lead.status),
    escapeCsvField(lead.source),
    escapeCsvField(new Date(lead.createdAt).toISOString()),
    escapeCsvField(new Date(lead.updatedAt).toISOString()),
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  return csvContent;
};

const escapeCsvField = (field: string): string => {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
};
