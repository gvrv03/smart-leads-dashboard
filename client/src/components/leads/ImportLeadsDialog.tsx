'use client';

import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { importLeadsApi, IImportResult } from '@/api/leads.api';
import { getErrorMessage } from '@/utils/getErrorMessage';
import {
  Upload,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  X,
} from 'lucide-react';

interface ImportLeadsDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type ImportState = 'idle' | 'uploading' | 'success' | 'error';

export function ImportLeadsDialog({ open, onClose, onSuccess }: ImportLeadsDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<ImportState>('idle');
  const [result, setResult] = useState<IImportResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setState('idle');
      setResult(null);
      setErrorMessage(null);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setState('uploading');
    setErrorMessage(null);

    try {
      const data = await importLeadsApi(file);
      setResult(data);
      setState('success');
      onSuccess();
    } catch (err) {
      setErrorMessage(getErrorMessage(err));
      setState('error');
    }
  };

  const handleDownloadTemplate = () => {
    const template = 'Name,Email,Status,Source\nJohn Doe,john@example.com,New,Website\nJane Smith,jane@example.com,Contacted,Instagram\nBob Wilson,bob@example.com,Qualified,Referral';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'leads-import-template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setFile(null);
    setState('idle');
    setResult(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Import Leads from CSV
          </DialogTitle>
          <DialogDescription>
            Upload a CSV file to bulk import leads. Download the template for the correct format.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Template Download */}
          <Card className="border-dashed">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <FileSpreadsheet className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">CSV Template</p>
                    <p className="text-xs text-muted-foreground">
                      Download to see the required format
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleDownloadTemplate} className="gap-2">
                  <Download className="h-3.5 w-3.5" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Format Info */}
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground text-sm">Required columns:</p>
            <p><strong>Name</strong> — min 2 characters</p>
            <p><strong>Email</strong> — valid email format</p>
            <p><strong>Status</strong> — New, Contacted, Qualified, or Lost</p>
            <p><strong>Source</strong> — Website, Instagram, or Referral</p>
          </div>

          <Separator />

          {/* File Upload Area */}
          <div
            className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            {file ? (
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setState('idle');
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Click to upload CSV</p>
                <p className="text-xs text-muted-foreground">or drag and drop (max 5MB)</p>
              </>
            )}
          </div>

          {/* Result */}
          {state === 'success' && result && (
            <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <div className="space-y-2 min-w-0">
                    <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                      Import Complete
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 font-medium text-emerald-700 dark:text-emerald-300">
                        ✓ {result.imported} imported
                      </span>
                      {result.failed > 0 && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/50 px-2 py-0.5 font-medium text-amber-700 dark:text-amber-300">
                          ⚠ {result.failed} failed
                        </span>
                      )}
                      <span className="text-muted-foreground">
                        of {result.total} total rows
                      </span>
                    </div>
                    {result.errors.length > 0 && (
                      <div className="mt-2 max-h-32 overflow-y-auto rounded-md bg-white/50 dark:bg-black/20 p-2 space-y-0.5">
                        {result.errors.map((err, i) => (
                          <p key={i} className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                            • {err}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {state === 'error' && errorMessage && (
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-destructive">Import Failed</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose}>
            {state === 'success' ? 'Done' : 'Cancel'}
          </Button>
          {state !== 'success' && (
            <Button
              onClick={handleImport}
              disabled={!file || state === 'uploading'}
              className="gap-2"
            >
              {state === 'uploading' && <Loader2 className="h-4 w-4 animate-spin" />}
              {state === 'uploading' ? 'Importing...' : 'Import Leads'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
