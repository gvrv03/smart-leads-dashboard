'use client';

import { useEffect, ReactNode } from 'react';
import { useAuthStore } from '@/store/auth.store';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}
