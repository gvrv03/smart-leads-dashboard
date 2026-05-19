'use client';

import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:pt-32 sm:pb-24">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <FadeIn delay={0.1}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Smart Lead Management for Modern Teams</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Manage Your Leads{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Smarter & Faster
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            A powerful full-stack dashboard to track, filter, and manage your leads pipeline.
            Built with role-based access, real-time analytics, and seamless CSV import/export.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="gap-2 px-8 shadow-lg shadow-primary/25">
              <Link href="/register">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2 px-8">
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
