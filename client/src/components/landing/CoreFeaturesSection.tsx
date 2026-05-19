'use client';

import { ScrollAnimate, ScrollStagger, ScrollStaggerItem } from '@/components/ui/scroll-animate';
import { Card, CardContent } from '@/components/ui/card';
import {
  Shield,
  Database,
  Search,
  Layers,
  Layout,
  Server,
} from 'lucide-react';

const coreFeatures = [
  {
    icon: Shield,
    title: '1. Authentication System',
    items: [
      'JWT-based secure authentication',
      'User Registration & Login',
      'Protected Routes (frontend + backend)',
      'Password Hashing with bcrypt (10 salt rounds)',
      'Auth Middleware with token verification',
      'Proper validation & error handling',
    ],
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Database,
    title: '2. Leads Management (CRUD)',
    items: [
      'Create, Update, Delete leads',
      'View Leads List with details',
      'View Single Lead Detail page',
      'Fields: Name, Email, Status, Source, Created At',
      'Status: New, Contacted, Qualified, Lost',
      'Source: Website, Instagram, Referral',
    ],
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: Search,
    title: '3. Advanced Filtering & Search',
    items: [
      'Filter by Status (New/Contacted/Qualified/Lost)',
      'Filter by Source (Website/Instagram/Referral)',
      'Search by Name or Email',
      'Sort by Latest or Oldest',
      'All filters work together in combination',
      'Debounced search (400ms) — no excess API calls',
    ],
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Layers,
    title: '4. Pagination',
    items: [
      'Backend pagination with skip & limit',
      '10 records per page (configurable)',
      'Pagination metadata in API response',
      'Total count, current page, total pages',
      'Numbered page buttons with prev/next',
    ],
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: Layout,
    title: '5. Frontend UI',
    items: [
      'Responsive Design (mobile, tablet, desktop)',
      'Reusable component architecture',
      'Proper folder structure with barrel exports',
      'Loading states with skeleton loaders',
      'Empty states with illustrations',
      'Error handling UI with toast notifications',
      'Form validation with Zod + React Hook Form',
    ],
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
  {
    icon: Server,
    title: '6. API Standards',
    items: [
      'RESTful API structure',
      'Proper HTTP status codes (200, 201, 400, 401, 403, 404, 409, 429, 500)',
      'Centralized error handling middleware',
      'Request validation with Zod schemas',
      'Clean response format: { success, data, message }',
    ],
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
];

export function CoreFeaturesSection() {
  return (
    <section className="px-4 py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <ScrollAnimate direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Core{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Features
              </span>{' '}
              Implemented
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Every requirement from the assignment — implemented with clean architecture and best practices.
            </p>
          </div>
        </ScrollAnimate>

        <ScrollStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coreFeatures.map((feature) => (
            <ScrollStaggerItem key={feature.title}>
              <Card className={`h-full shadow-sm hover:shadow-md transition-shadow border ${feature.border}`}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`rounded-lg p-2 ${feature.bg}`}>
                      <feature.icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <h3 className="font-bold text-sm">{feature.title}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {feature.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className={`mt-1.5 h-1 w-1 rounded-full shrink-0 ${feature.bg.replace('/10', '')}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
