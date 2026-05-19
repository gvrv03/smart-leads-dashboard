'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useLeads } from '@/hooks/useLeads';
import { LeadFilters } from '@/components/leads/LeadFilters';
import { LeadTable } from '@/components/leads/LeadTable';
import { LeadPagination } from '@/components/leads/LeadPagination';
import { LeadForm } from '@/components/leads/LeadForm';
import { DeleteLeadDialog } from '@/components/leads/DeleteLeadDialog';
import { LeadsPageHeader } from '@/components/leads/LeadsPageHeader';
import { ImportLeadsDialog } from '@/components/leads/ImportLeadsDialog';
import { StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { ILead, ICreateLeadDTO, LeadStatus } from '@/types/lead.types';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';

export default function LeadsPage() {
  const user = useAuthStore((state) => state.user);
  const {
    leads,
    total,
    page,
    totalPages,
    limit,
    isLoading,
    error,
    createLead,
    updateLead,
    updateLeadStatus,
    deleteLead,
    exportLeads,
    fetchLeads,
    setPage,
  } = useLeads();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<ILead | null>(null);
  const [deletingLead, setDeletingLead] = useState<ILead | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const isAdmin = user?.role === 'admin';

  const handleCreate = async (data: ICreateLeadDTO) => {
    try {
      await createLead(data);
      toast.success('Lead created successfully');
    } catch (err) {
      toast.error(getErrorMessage(err));
      throw err;
    }
  };

  const handleUpdate = async (data: ICreateLeadDTO) => {
    if (!editingLead) return;
    try {
      await updateLead(editingLead._id, data);
      toast.success('Lead updated successfully');
    } catch (err) {
      toast.error(getErrorMessage(err));
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLead(id);
      toast.success('Lead deleted successfully');
    } catch (err) {
      toast.error(getErrorMessage(err));
      throw err;
    }
  };

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    try {
      await updateLeadStatus(id, status);
      toast.success('Status updated');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportLeads();
      toast.success('CSV exported successfully');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportSuccess = () => {
    fetchLeads();
    toast.success('Leads imported successfully');
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header — not sticky */}
      <div className="mb-6">
        <LeadsPageHeader
          isAdmin={isAdmin}
          isExporting={isExporting}
          onAddLead={() => { setEditingLead(null); setIsFormOpen(true); }}
          onExport={handleExport}
          onImport={() => setIsImportOpen(true)}
        />
      </div>

      {/* Filters — sticky (outside motion container so sticky works) */}
      <LeadFilters />

      {/* Content */}
      <StaggerContainer className="space-y-6 mt-6">
        {error && (
          <StaggerItem>
            <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
              {error}
            </div>
          </StaggerItem>
        )}

        <StaggerItem>
          <LeadTable
            leads={leads}
            isLoading={isLoading}
            isAdmin={isAdmin}
            onEdit={(lead) => { setEditingLead(lead); setIsFormOpen(true); }}
            onDelete={(lead) => setDeletingLead(lead)}
            onStatusChange={handleStatusChange}
          />
        </StaggerItem>

        <StaggerItem>
          <LeadPagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={limit}
            onPageChange={setPage}
          />
        </StaggerItem>
      </StaggerContainer>

      <LeadForm
        open={isFormOpen}
        onClose={() => { setIsFormOpen(false); setEditingLead(null); }}
        onSubmit={editingLead ? handleUpdate : handleCreate}
        lead={editingLead}
      />

      <ImportLeadsDialog
        open={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onSuccess={handleImportSuccess}
      />

      <DeleteLeadDialog
        open={!!deletingLead}
        lead={deletingLead}
        onClose={() => setDeletingLead(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
