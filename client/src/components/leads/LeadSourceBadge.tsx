import { Badge } from '@/components/ui/badge';
import { LeadSource } from '@/types/lead.types';
import { Globe, Camera, Users } from 'lucide-react';

interface LeadSourceBadgeProps {
  source: LeadSource;
}

const sourceIconMap: Record<LeadSource, React.ReactNode> = {
  Website: <Globe className="h-3 w-3" />,
  Instagram: <Camera className="h-3 w-3" />,
  Referral: <Users className="h-3 w-3" />,
};

export function LeadSourceBadge({ source }: LeadSourceBadgeProps) {
  return (
    <Badge variant="outline" className="gap-1">
      {sourceIconMap[source]}
      {source}
    </Badge>
  );
}
