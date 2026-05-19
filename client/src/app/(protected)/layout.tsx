'use client';

import { Navbar } from '@/components/layout/Navbar';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { ReactNode } from 'react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-2 pb-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
