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
import { LogOut } from 'lucide-react';

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutDialog({ open, onClose, onConfirm }: LogoutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md max-sm:bottom-0 max-sm:top-auto max-sm:translate-y-0 max-sm:rounded-b-none max-sm:w-full max-sm:max-w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Confirm Logout
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to logout? You will need to sign in again to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
