'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, UserPlus, UserCheck, UserX, TrendingUp } from 'lucide-react';
import { ILeadStats } from '@/api/leads.api';

interface StatsGridProps {
  stats: ILeadStats | null;
  isLoading: boolean;
}

interface StatCardData {
  title: string;
  value: number;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  trend?: string;
}

export function StatsGrid({ stats, isLoading }: StatsGridProps) {
  const statCards: StatCardData[] = [
    {
      title: 'Total Leads',
      value: stats?.total ?? 0,
      icon: Users,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      title: 'New',
      value: stats?.byStatus.New ?? 0,
      icon: UserPlus,
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
    },
    {
      title: 'Contacted',
      value: stats?.byStatus.Contacted ?? 0,
      icon: UserCheck,
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-500',
    },
    {
      title: 'Qualified',
      value: stats?.byStatus.Qualified ?? 0,
      icon: TrendingUp,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500',
    },
    {
      title: 'Lost',
      value: stats?.byStatus.Lost ?? 0,
      icon: UserX,
      iconBg: 'bg-destructive/10',
      iconColor: 'text-destructive',
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {statCards.map((card) => (
        <Card key={card.title} className="relative overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {card.title}
                </p>
                {isLoading ? (
                  <Skeleton className="h-8 w-14" />
                ) : (
                  <p className="text-2xl font-bold tracking-tight">{card.value}</p>
                )}
              </div>
              <div className={`rounded-lg p-2 ${card.iconBg}`}>
                <card.icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
