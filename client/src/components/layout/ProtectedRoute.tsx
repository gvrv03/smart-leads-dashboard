'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { UserRole } from '@/types/auth.types';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Give hydration a moment to complete
    const timer = setTimeout(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      if (requiredRole && user && user.role !== requiredRole) {
        router.push('/dashboard');
        return;
      }

      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, requiredRole, router]);

  if (isChecking) {
    return (
      <div className="container mx-auto max-w-7xl p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return <>{children}</>;
}
