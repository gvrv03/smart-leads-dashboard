'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

const chartConfig: ChartConfig = {
  count: { label: 'Leads', color: 'var(--chart-1)' },
};

interface DailyLineChartProps {
  data: { date: string; count: number }[];
  isLoading: boolean;
  chartKey: number;
}

export function DailyLineChart({ data, isLoading, chartKey }: DailyLineChartProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-1.5">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">Leads Over Time</CardTitle>
            <CardDescription className="text-xs">Daily lead creation trend</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {isLoading ? (
          <Skeleton className="h-[220px] w-full" />
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">
            No data available for the selected period.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[220px] w-full" key={`daily-${chartKey}`}>
            <LineChart data={data} accessibilityLayer>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickFormatter={(value: string) => {
                  const date = new Date(value);
                  return format(date, 'MMM dd');
                }}
              />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="var(--color-count)"
                strokeWidth={2.5}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
