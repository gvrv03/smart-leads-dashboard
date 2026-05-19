'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LayoutDashboard, ArrowRight, Menu, FileText, Code, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const docsLinks = [
  { href: '/docs', label: 'Docs', icon: FileText },
  { href: '/api-docs', label: 'API', icon: Code },
  { href: '/setup-guide', label: 'Setup', icon: Wrench },
];

export function LandingNavbar() {
  const { user, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline">Smart Leads</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {docsLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAuthenticated && user ? (
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
            <>
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="hidden sm:inline-flex gap-1.5">
                <Link href="/register">
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </>
          )}

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              {/* Sidebar header */}
              <div className="flex items-center gap-2 px-5 py-4 border-b">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold">Smart Leads</span>
              </div>

              {/* Navigation */}
              <div className="px-3 py-4">
                <p className="px-3 mb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  Resources
                </p>
                <nav className="flex flex-col gap-0.5">
                  {docsLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        pathname === link.href
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:bg-muted'
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {!isAuthenticated && (
                  <>
                    <div className="my-4 border-t" />
                    <p className="px-3 mb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                      Account
                    </p>
                    <nav className="flex flex-col gap-0.5">
                      <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground mt-1"
                      >
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </nav>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
