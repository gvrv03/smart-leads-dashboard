'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { LayoutDashboard, ArrowRight } from 'lucide-react';

export function LandingNavbar() {
  const { user, isAuthenticated } = useAuthStore();

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline">Smart Leads</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAuthenticated && user ? (
            // Logged in: show avatar + go to dashboard
            <Button size="sm" asChild className="gap-2">
              <Link href="/dashboard">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="bg-primary-foreground text-primary text-[8px] font-bold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">Dashboard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          ) : (
            // Not logged in: show login + register
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="gap-1.5">
                <Link href="/register">
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
