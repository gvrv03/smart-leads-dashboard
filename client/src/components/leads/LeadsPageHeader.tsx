'use client';

import { Button } from '@/components/ui/button';
import { Plus, Download, Upload, Users } from 'lucide-react';

interface LeadsPageHeaderProps {
  isAdmin: boolean;
  isExporting: boolean;
  onAddLead: () => void;
  onExport: () => void;
  onImport: () => void;
}

export function LeadsPageHeader({ isAdmin, isExporting, onAddLead, onExport, onImport }: LeadsPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-2.5">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Leads</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track your leads pipeline
          </p>
        </div>
      </div>

      {isAdmin && (
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={onImport}
            className="gap-2"
          >
          <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Import CSV</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            disabled={isExporting}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
          <Button size="sm" onClick={onAddLead} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
        </div>
      )}
    </div>
  );
}
