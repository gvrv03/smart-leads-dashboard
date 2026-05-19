'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/store/auth.store';
import { getLeadStatsApi, ILeadStats } from '@/api/leads.api';
import { StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

import {
  WelcomeCard,
  StatsGrid,
  DateFilter,
  StatusBarChart,
  SourcePieChart,
  DailyLineChart,
} from '@/components/dashboard';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { theme } = useTheme();
  const [stats, setStats] = useState<ILeadStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    setChartKey((prev) => prev + 1);
  }, [theme]);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const from = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined;
      const to = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined;
      const data = await getLeadStatsApi(from, to);
      setStats(data);
    } catch {
      // Stats will remain null
    } finally {
      setIsLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const statusData = stats
    ? Object.entries(stats.byStatus).map(([name, value]) => ({ name, value }))
    : [];

  const sourceData = stats
    ? Object.entries(stats.bySource).map(([name, value]) => ({ name, value }))
    : [];

  const dailyData = stats?.daily || [];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <StaggerContainer className="space-y-8">
        {/* Welcome Banner with Gradient */}
        <StaggerItem>
          <WelcomeCard user={user} />
        </StaggerItem>

        {/* Date Filter — positioned below welcome, above stats */}
        <StaggerItem>
          <DateFilter dateRange={dateRange} onDateRangeChange={setDateRange} />
        </StaggerItem>

        {/* Stats Cards */}
        <StaggerItem>
          <StatsGrid stats={stats} isLoading={isLoading} />
        </StaggerItem>

        {/* Charts Row */}
        <StaggerItem>
          <div className="grid gap-6 lg:grid-cols-2">
            <StatusBarChart data={statusData} isLoading={isLoading} chartKey={chartKey} />
            <SourcePieChart data={sourceData} isLoading={isLoading} chartKey={chartKey} />
          </div>
        </StaggerItem>

        {/* Daily Trend */}
        <StaggerItem>
          <DailyLineChart data={dailyData} isLoading={isLoading} chartKey={chartKey} />
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
