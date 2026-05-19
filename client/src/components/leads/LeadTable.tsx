'use client';

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LeadStatusBadge } from './LeadStatusBadge';
import { LeadSourceBadge } from './LeadSourceBadge';
import { ILead, LeadStatus } from '@/types/lead.types';
import { STATUS_OPTIONS } from '@/constants';
import { formatDate } from '@/utils/formatDate';
import { Eye, Pencil, Trash2, Inbox } from 'lucide-react';
import Link from 'next/link';

interface LeadTableProps {
  leads: ILead[];
  isLoading: boolean;
  isAdmin: boolean;
  onEdit: (lead: ILead) => void;
  onDelete: (lead: ILead) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
}

export function LeadTable({ leads, isLoading, isAdmin, onEdit, onDelete, onStatusChange }: LeadTableProps) {
  if (isLoading) {
    return <LeadTableSkeleton />;
  }

  if (leads.length === 0) {
    return <LeadTableEmpty />;
  }

  return (
    <Card className="shadow-sm overflow-hidden py-0">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Source</TableHead>
            <TableHead className="font-semibold">Created</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead._id} className="group">
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell className="text-muted-foreground text-sm">{lead.email}</TableCell>
              <TableCell>
                <Select
                  value={lead.status}
                  onValueChange={(value) => onStatusChange(lead._id, value as LeadStatus)}
                >
                  <SelectTrigger className="w-[125px] h-7 text-xs border-dashed">
                    <SelectValue>
                      <LeadStatusBadge status={lead.status} />
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <LeadSourceBadge source={lead.source} />
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {formatDate(lead.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <Link href={`/leads/${lead._id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View lead</span>
                    </Link>
                  </Button>
                  {isAdmin && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onEdit(lead)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit lead</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => onDelete(lead)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete lead</span>
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function LeadTableSkeleton() {
  return (
    <Card className="shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Source</TableHead>
            <TableHead className="font-semibold">Created</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell><Skeleton className="h-4 w-36" /></TableCell>
              <TableCell><Skeleton className="h-5 w-20" /></TableCell>
              <TableCell><Skeleton className="h-5 w-20" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function LeadTableEmpty() {
  return (
    <Card className="shadow-sm">
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Inbox className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No leads found</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Try adjusting your filters or create a new lead to get started.
        </p>
      </div>
    </Card>
  );
}
