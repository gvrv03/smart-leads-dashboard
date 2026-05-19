'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LeadStatusBadge } from './LeadStatusBadge';
import { LeadSourceBadge } from './LeadSourceBadge';
import { ILead } from '@/types/lead.types';
import { formatDateTime } from '@/utils/formatDate';
import { Mail, User, Clock, RefreshCw } from 'lucide-react';

interface LeadDetailCardProps {
  lead: ILead;
}

export function LeadDetailCard({ lead }: LeadDetailCardProps) {
  return (
    <Card className="shadow-sm py-0 overflow-hidden">
      {/* Header with name */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary font-bold text-lg">
            {lead.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold">{lead.name}</h2>
            <p className="text-sm text-muted-foreground">{lead.email}</p>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <Mail className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</p>
              <p className="mt-0.5 text-sm font-medium">{lead.email}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-amber-500/10 p-2">
              <User className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</p>
              <div className="mt-1">
                <LeadStatusBadge status={lead.status} />
              </div>
            </div>
          </div>

          {/* Source */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2">
              <RefreshCw className="h-4 w-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Source</p>
              <div className="mt-1">
                <LeadSourceBadge source={lead.source} />
              </div>
            </div>
          </div>

          {/* Created */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-purple-500/10 p-2">
              <Clock className="h-4 w-4 text-purple-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Created</p>
              <p className="mt-0.5 text-sm">{formatDateTime(lead.createdAt)}</p>
            </div>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          Last updated: {formatDateTime(lead.updatedAt)}
        </div>
      </CardContent>
    </Card>
  );
}
