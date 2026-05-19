'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ILead } from '@/types/lead.types';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteLeadDialogProps {
  open: boolean;
  lead: ILead | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export function DeleteLeadDialog({ open, lead, onClose, onConfirm }: DeleteLeadDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!lead) return;
    setIsDeleting(true);
    try {
      await onConfirm(lead._id);
      onClose();
    } catch {
      // Error handled by parent
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Lead</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{lead?.name}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
