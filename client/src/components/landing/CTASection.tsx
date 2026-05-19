'use client';

import { Button } from '@/components/ui/button';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="px-4 py-16 sm:py-24">
      <ScrollAnimate direction="up">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-12 text-center text-primary-foreground shadow-2xl shadow-primary/20">
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-white/5" />

            <div className="relative">
              <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                Ready to Streamline Your Lead Management?
              </h2>
              <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
                Start managing your leads with powerful analytics, role-based access, and seamless data import/export.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="gap-2 px-8 shadow-lg"
                >
                  <Link href="/register">
                    Create Free Account
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  asChild
                  className="text-primary-foreground hover:text-primary-foreground hover:bg-white/10"
                >
                  <Link href="/login">
                    Sign In Instead
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimate>
    </section>
  );
}
