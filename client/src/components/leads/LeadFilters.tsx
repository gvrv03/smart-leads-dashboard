'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDebounce } from '@/hooks/useDebounce';
import { useLeads } from '@/hooks/useLeads';
import { STATUS_OPTIONS, SOURCE_OPTIONS, SORT_OPTIONS } from '@/constants';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export function LeadFilters() {
  const { filters, setFilter, resetFilters, fetchLeads } = useLeads();
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const debouncedSearch = useDebounce(searchInput, 400);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFilter({ search: debouncedSearch || undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const activeFilterCount = [filters.status, filters.source, filters.sort !== 'latest' ? filters.sort : null].filter(Boolean).length;

  return (
    <>
      {/* Desktop: Full sticky filter bar */}
      <div className="hidden sm:block sticky top-20 z-40">
        <Card className="shadow-sm py-0">
          <CardContent className="p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="font-medium">Filters</span>
                {(activeFilterCount > 0 || filters.search) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchInput('');
                      resetFilters();
                    }}
                    className="ml-auto gap-1 h-7 text-xs"
                  >
                    <X className="h-3 w-3" />
                    Clear all
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>

                <Select
                  value={filters.status || 'all'}
                  onValueChange={(value) => setFilter({ status: value === 'all' ? undefined : value as typeof filters.status })}
                >
                  <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.source || 'all'}
                  onValueChange={(value) => setFilter({ source: value === 'all' ? undefined : value as typeof filters.source })}
                >
                  <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    {SOURCE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.sort || 'latest'}
                  onValueChange={(value) => setFilter({ sort: value as 'latest' | 'oldest' })}
                >
                  <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile: Search + Filter icon button */}
      <div className="sm:hidden sticky top-14 z-40 bg-background pt-2 pb-3 -mx-4 px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 h-10 w-full rounded-lg"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 shrink-0 relative"
            onClick={() => setIsFilterOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {activeFilterCount > 0 && (
              <Badge className="absolute -top-1.5 -right-1.5 h-4 w-4 p-0 flex items-center justify-center text-[9px]">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile: Filter bottom sheet dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              Filter Leads
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Status</Label>
              <Select
                value={filters.status || 'all'}
                onValueChange={(value) => setFilter({ status: value === 'all' ? undefined : value as typeof filters.status })}
              >
                <SelectTrigger className="w-full h-11 rounded-lg">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Source</Label>
              <Select
                value={filters.source || 'all'}
                onValueChange={(value) => setFilter({ source: value === 'all' ? undefined : value as typeof filters.source })}
              >
                <SelectTrigger className="w-full h-11 rounded-lg">
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {SOURCE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Sort By</Label>
              <Select
                value={filters.sort || 'latest'}
                onValueChange={(value) => setFilter({ sort: value as 'latest' | 'oldest' })}
              >
                <SelectTrigger className="w-full h-11 rounded-lg">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 h-11 rounded-lg"
              onClick={() => {
                setSearchInput('');
                resetFilters();
              }}
            >
              Clear All
            </Button>
            <Button
              className="flex-1 h-11 rounded-lg"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
