'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarSection {
  id: string;
  label: string;
  level?: number;
}

interface DocsSidebarProps {
  sections: SidebarSection[];
  activeId: string;
  onSectionClick: (id: string) => void;
}

export function DocsSidebar({ sections, activeId, onSectionClick }: DocsSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = (id: string) => {
    onSectionClick(id);
    setOpen(false);
  };

  const navLinks = [
    { href: '/docs', label: 'Documentation' },
    { href: '/api-docs', label: 'API Reference' },
    { href: '/setup-guide', label: 'Setup Guide' },
  ];

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Page navigation */}
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Pages
        </p>
        <nav className="space-y-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'block rounded-md px-3 py-1.5 text-sm transition-colors',
                pathname === link.href
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Section navigation */}
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          On this page
        </p>
        <nav className="space-y-0.5">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={cn(
                'block w-full text-left rounded-md px-3 py-1.5 text-sm transition-colors',
                section.level === 2 && 'pl-5 text-xs',
                section.level === 3 && 'pl-7 text-xs',
                activeId === section.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile sidebar trigger */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 pt-10">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
