'use client';

import { ScrollAnimate, ScrollStagger, ScrollStaggerItem } from '@/components/ui/scroll-animate';
import { Card, CardContent } from '@/components/ui/card';
import {
  ShieldCheck,
  Gauge,
  Container,
  FileCode2,
  GitBranch,
  Moon,
  Upload,
  Download,
  Users,
  Lock,
} from 'lucide-react';

const scalabilityFeatures = [
  {
    icon: Gauge,
    title: 'Rate Limiting',
    description: 'Express rate limiter with 100 req/15min general and 10 req/15min for auth endpoints. Prevents brute force and DDoS.',
    tag: 'Security',
  },
  {
    icon: ShieldCheck,
    title: 'Role-Based Access Control',
    description: 'Admin and Sales roles with granular permissions. Backend middleware enforces RBAC on every protected route.',
    tag: 'Mandatory',
  },
  {
    icon: Upload,
    title: 'CSV Import',
    description: 'Bulk import leads with validation, error reporting per row, and downloadable template. Multer handles file uploads.',
    tag: 'Extra',
  },
  {
    icon: Download,
    title: 'CSV Export',
    description: 'Export filtered leads to CSV. Respects current filters so you export exactly what you need.',
    tag: 'Mandatory',
  },
  {
    icon: Container,
    title: 'Docker Setup',
    description: 'Docker Compose with MongoDB, Express server, and Next.js client. Multi-stage builds for production.',
    tag: 'Mandatory',
  },
  {
    icon: Moon,
    title: 'Dark Mode',
    description: 'Full dark/light theme with next-themes. System preference detection. Charts re-render on theme change.',
    tag: 'Bonus',
  },
  {
    icon: FileCode2,
    title: 'TypeScript Everywhere',
    description: 'Zero .js files. Strict mode enabled. All interfaces in dedicated /types/ folders. No untyped any usage.',
    tag: 'Mandatory',
  },
  {
    icon: Lock,
    title: 'Input Validation',
    description: 'Zod schemas on both frontend (react-hook-form) and backend (middleware). No unvalidated data reaches the DB.',
    tag: 'Security',
  },
  {
    icon: Users,
    title: 'Debounced Search',
    description: '400ms debounce on search input. Prevents API spam on every keystroke. Custom useDebounce hook.',
    tag: 'Mandatory',
  },
  {
    icon: GitBranch,
    title: 'Clean Architecture',
    description: 'Component-based frontend with barrel exports. Backend with controllers, middleware, validators, and utils separation.',
    tag: 'Quality',
  },
];

const tagColors: Record<string, string> = {
  Mandatory: 'bg-primary/10 text-primary',
  Security: 'bg-red-500/10 text-red-500',
  Bonus: 'bg-emerald-500/10 text-emerald-500',
  Extra: 'bg-purple-500/10 text-purple-500',
  Quality: 'bg-amber-500/10 text-amber-500',
};

export function ScalabilitySection() {
  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollAnimate direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Scalability &{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Production-Ready
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Beyond the core requirements — built with security, performance, and real-world engineering practices.
            </p>
          </div>
        </ScrollAnimate>

        <ScrollStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {scalabilityFeatures.map((feature) => (
            <ScrollStaggerItem key={feature.title}>
              <Card className="h-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${tagColors[feature.tag] || 'bg-muted text-muted-foreground'}`}>
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
