'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Pie, PieChart, Cell } from 'recharts';
import { PieChartIcon } from 'lucide-react';

const chartConfig: ChartConfig = {
  Website: { label: 'Website', color: 'var(--chart-1)' },
  Instagram: { label: 'Instagram', color: 'var(--chart-2)' },
  Referral: { label: 'Referral', color: 'var(--chart-3)' },
};

const COLORS = [
  'var(--color-Website)',
  'var(--color-Instagram)',
  'var(--color-Referral)',
];

interface SourcePieChartProps {
  data: { name: string; value: number }[];
  isLoading: boolean;
  chartKey: number;
}

export function SourcePieChart({ data, isLoading, chartKey }: SourcePieChartProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-1.5">
            <PieChartIcon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">Leads by Source</CardTitle>
            <CardDescription className="text-xs">Where your leads come from</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {isLoading ? (
          <Skeleton className="h-[220px] w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[220px] w-full" key={`source-${chartKey}`}>
            <PieChart accessibilityLayer>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                strokeWidth={2}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
