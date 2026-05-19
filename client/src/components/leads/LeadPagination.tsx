'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LeadPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function LeadPagination({ page, totalPages, total, limit, onPageChange }: LeadPaginationProps) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border bg-card p-3 shadow-sm">
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{start}–{end}</span> of{' '}
        <span className="font-medium text-foreground">{total}</span> leads
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={pageNum === page ? 'default' : 'ghost'}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
