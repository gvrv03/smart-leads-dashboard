'use client';

import { cn } from '@/lib/utils';

interface DocsBadgeProps {
  children: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline';
}

const variantStyles = {
  default: 'bg-primary/10 text-primary',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  destructive: 'bg-destructive/10 text-destructive',
  outline: 'border text-muted-foreground',
};

export function DocsBadge({ children, variant = 'default' }: DocsBadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium', variantStyles[variant])}>
      {children}
    </span>
  );
}
