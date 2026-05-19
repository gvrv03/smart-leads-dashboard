'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';

const chartConfig: ChartConfig = {
  New: { label: 'New', color: 'var(--chart-1)' },
  Contacted: { label: 'Contacted', color: 'var(--chart-2)' },
  Qualified: { label: 'Qualified', color: 'var(--chart-3)' },
  Lost: { label: 'Lost', color: 'var(--chart-4)' },
};

const COLORS = [
  'var(--color-New)',
  'var(--color-Contacted)',
  'var(--color-Qualified)',
  'var(--color-Lost)',
];

interface StatusBarChartProps {
  data: { name: string; value: number }[];
  isLoading: boolean;
  chartKey: number;
}

export function StatusBarChart({ data, isLoading, chartKey }: StatusBarChartProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-1.5">
            <BarChart3 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">Leads by Status</CardTitle>
            <CardDescription className="text-xs">Distribution across statuses</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {isLoading ? (
          <Skeleton className="h-[220px] w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[220px] w-full" key={`status-${chartKey}`}>
            <BarChart data={data} accessibilityLayer>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
