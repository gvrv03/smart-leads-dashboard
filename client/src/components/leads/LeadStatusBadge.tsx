import { Badge } from '@/components/ui/badge';
import { LeadStatus } from '@/types/lead.types';

interface LeadStatusBadgeProps {
  status: LeadStatus;
}

const statusVariantMap: Record<LeadStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  New: 'default',
  Contacted: 'secondary',
  Qualified: 'outline',
  Lost: 'destructive',
};

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  return <Badge variant={statusVariantMap[status]}>{status}</Badge>;
}
