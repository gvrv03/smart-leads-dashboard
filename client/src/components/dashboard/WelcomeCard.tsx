'use client';

import { IUser } from '@/types/auth.types';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface WelcomeCardProps {
  user: IUser | null;
}

export function WelcomeCard({ user }: WelcomeCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/90 to-primary p-6 text-primary-foreground shadow-lg">
      {/* Background decoration */}
      <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10" />
      <div className="absolute -right-2 -bottom-8 h-24 w-24 rounded-full bg-white/5" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5" />
            <p className="text-sm font-medium text-primary-foreground/80">Dashboard Overview</p>
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-sm text-primary-foreground/70">
            {user?.role === 'admin'
              ? 'You have full access to manage leads, export data, and view analytics.'
              : 'You can view leads, filter data, and update lead statuses.'}
          </p>
        </div>

        <Button
          asChild
          variant="secondary"
          className="w-fit gap-2 shadow-md"
        >
          <Link href="/leads">
            View All Leads
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
