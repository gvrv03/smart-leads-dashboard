'use client';

import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { CalendarDays, X } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

interface DateFilterProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export function DateFilter({ dateRange, onDateRangeChange }: DateFilterProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
        <span className="font-medium">Filter by date:</span>
      </div>
      <DateRangePicker dateRange={dateRange} onDateRangeChange={onDateRangeChange} />
      {dateRange && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDateRangeChange(undefined)}
          className="gap-1 text-muted-foreground hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </Button>
      )}
      {dateRange?.from && dateRange?.to && (
        <p className="text-xs text-muted-foreground">
          {format(dateRange.from, 'MMM dd, yyyy')} — {format(dateRange.to, 'MMM dd, yyyy')}
        </p>
      )}
    </div>
  );
}
