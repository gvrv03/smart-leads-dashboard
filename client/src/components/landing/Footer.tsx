'use client';

import Link from 'next/link';
import { LayoutDashboard, GitBranch, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const footerLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Leads', href: '/leads' },
  { label: 'Documentation', href: '/docs' },
  { label: 'API Reference', href: '/api-docs' },
  { label: 'Setup Guide', href: '/setup-guide' },
  { label: 'Login', href: '/login' },
];

const techHighlights = [
  'Next.js 16',
  'Express.js',
  'MongoDB',
  'TypeScript',
  'Tailwind CSS',
  'shadcn/ui',
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold">Smart Leads</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A full-stack Lead Management Dashboard built with the MERN stack and TypeScript. Features authentication, CRUD, filtering, pagination, and role-based access.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Tech Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {techHighlights.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Developer</h4>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">Gaurav Narnaware</p>
              <div className="flex items-center gap-2">
                <a
                  href="mailto:gxurav.work@gmail.com"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Smart Leads Dashboard. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with MERN + TypeScript for ServiceHive Internship
          </p>
        </div>
      </div>
    </footer>
  );
}
