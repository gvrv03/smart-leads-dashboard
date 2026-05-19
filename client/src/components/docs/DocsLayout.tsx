'use client';

import { useState, useCallback, ReactNode } from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { DocsSidebar, SidebarSection } from './DocsSidebar';
import { FadeIn } from '@/components/ui/motion';

interface DocsLayoutProps {
  title: string;
  description: string;
  sections: SidebarSection[];
  children: ReactNode;
}

export function DocsLayout({ title, description, sections, children }: DocsLayoutProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id || '');

  const handleSectionClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />

      <main className="flex-1">
        {/* Header */}
        <div className="border-b bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
            <FadeIn>
              <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
              <p className="mt-2 text-muted-foreground">{description}</p>
            </FadeIn>
          </div>
        </div>

        {/* Content with sidebar */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex gap-8">
            <DocsSidebar
              sections={sections}
              activeId={activeId}
              onSectionClick={handleSectionClick}
            />

            <div className="flex-1 min-w-0">
              <FadeIn>
                {children}
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
