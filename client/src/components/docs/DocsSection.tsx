'use client';

import { ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';

interface DocsSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  showSeparator?: boolean;
}

export function DocsSection({ id, title, children, showSeparator = true }: DocsSectionProps) {
  return (
    <>
      <section id={id} className="scroll-mt-20 py-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-4">{children}</div>
      </section>
      {showSeparator && <Separator />}
    </>
  );
}
