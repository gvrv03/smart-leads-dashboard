'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ScrollAnimate, ScrollStagger, ScrollStaggerItem } from '@/components/ui/scroll-animate';
import {
  Shield,
  BarChart3,
  Upload,
  Download,
  Search,
  Users,
  Moon,
  Filter,
  Zap,
  Lock,
  PieChart,
  RefreshCw,
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Role-Based Access',
    description: 'Admin and Sales roles with granular permissions. Admins manage leads, sales updates statuses.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Interactive charts showing lead distribution by status, source, and daily trends.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Upload,
    title: 'CSV Import',
    description: 'Bulk import leads from CSV files with validation, error reporting, and downloadable templates.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Download,
    title: 'CSV Export',
    description: 'Export filtered leads to CSV with one click. Apply filters before exporting for targeted data.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Search,
    title: 'Debounced Search',
    description: 'Smart 400ms debounced search across names and emails. No unnecessary API calls.',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
  },
  {
    icon: Filter,
    title: 'Advanced Filtering',
    description: 'Filter by status, source, and sort order. All filters work in combination with pagination.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: Users,
    title: 'Lead Management',
    description: 'Full CRUD operations with form validation. Create, edit, delete, and track lead lifecycle.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    icon: Moon,
    title: 'Dark/Light Theme',
    description: 'Beautiful UI in both modes. System preference detection with manual toggle support.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
  },
  {
    icon: PieChart,
    title: 'Date Range Analytics',
    description: 'Filter dashboard analytics by custom date ranges. See trends for any time period.',
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
  },
  {
    icon: Lock,
    title: 'JWT Authentication',
    description: 'Secure token-based auth with bcrypt password hashing. Protected routes on both ends.',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  {
    icon: Zap,
    title: 'Responsive Design',
    description: 'Mobile-first UI with bottom-sheet modals, adaptive layouts, and touch-friendly controls.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: RefreshCw,
    title: 'Status Updates',
    description: 'Sales team can update lead statuses directly from the table. Real-time pipeline tracking.',
    color: 'text-lime-500',
    bg: 'bg-lime-500/10',
  },
];

export function FeaturesSection() {
  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollAnimate direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Manage Leads
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete lead management solution with powerful features built for productivity.
            </p>
          </div>
        </ScrollAnimate>

        <ScrollStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature) => (
            <ScrollStaggerItem key={feature.title}>
              <Card className="h-full border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <CardContent className="p-5">
                  <div className={`inline-flex rounded-lg p-2.5 ${feature.bg} mb-3`}>
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
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
