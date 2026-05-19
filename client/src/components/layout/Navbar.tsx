'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from './ThemeToggle';
import { LogoutDialog } from './LogoutDialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { LogOut, LayoutDashboard, Users, ChevronDown, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const pathname = usePathname();

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    setShowLogoutDialog(false);
    logout();
    toast.success('Logged out successfully.');
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/leads', label: 'Leads', icon: Users },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-14 items-center justify-between px-4 mx-auto max-w-7xl">
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-6">
            <Link href={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2 font-bold text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="hidden sm:inline">Smart Leads</span>
            </Link>

            {/* Navigation Links (only when authenticated) */}
            {isAuthenticated && (
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                      pathname === link.href || pathname.startsWith(link.href + '/')
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    <link.icon className="h-3.5 w-3.5" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          {/* Right: Theme + User */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 rounded-full pl-1 pr-2 h-9">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-bold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm font-medium max-w-[100px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3 py-1">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-0.5 min-w-0">
                        <p className="text-sm font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        <Badge
                          variant={user.role === 'admin' ? 'default' : 'secondary'}
                          className="w-fit text-[10px] px-1.5 py-0 h-4 mt-0.5"
                        >
                          {user.role === 'admin' && <Shield className="h-2.5 w-2.5 mr-0.5" />}
                          {user.role}
                        </Badge>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Mobile nav links */}
                  <div className="md:hidden">
                    {navLinks.map((link) => (
                      <DropdownMenuItem key={link.href} asChild>
                        <Link href={link.href} className="cursor-pointer gap-2">
                          <link.icon className="h-4 w-4" />
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </div>

                  <DropdownMenuItem
                    onClick={() => setShowLogoutDialog(true)}
                    className="cursor-pointer text-destructive focus:text-destructive gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <LogoutDialog
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
