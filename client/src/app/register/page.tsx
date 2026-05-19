'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/motion';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { Loader2, LayoutDashboard, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';
import Link from 'next/link';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const FEATURES = [
  'View and filter all leads',
  'Update lead statuses in real-time',
  'Access analytics dashboard',
  'Search across your pipeline',
];

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await registerUser(data);
      toast.success('Account created successfully!');
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          {...register('name')}
          aria-invalid={!!errors.name}
          className="h-12 w-full text-base rounded-xl px-4"
        />
        {errors.name && (
          <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          aria-invalid={!!errors.email}
          className="h-12 w-full text-base rounded-xl px-4"
        />
        {errors.email && (
          <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Min 6 characters"
          {...register('password')}
          aria-invalid={!!errors.password}
          className="h-12 w-full text-base rounded-xl px-4"
        />
        {errors.password && (
          <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/20"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        Create Account
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingNavbar />

      <main className="relative flex-1 flex items-center justify-center">
        {/* Background — desktop only */}
        <div className="absolute inset-0 -z-10 hidden sm:block">
          <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/8 blur-[100px]" />
        </div>

        <FadeIn direction="up" duration={0.5} className="w-full">
          {/* Mobile layout — full width, no card */}
          <div className="sm:hidden w-full px-6 py-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
                <LayoutDashboard className="h-7 w-7 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold mt-4">Create an account</h1>
              <p className="text-sm text-muted-foreground">Join as a Sales team member</p>
            </div>

            {formContent}

            <p className="text-center text-sm text-muted-foreground pt-2">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>

          {/* Desktop layout — two columns */}
          <div className="hidden sm:block w-full max-w-4xl mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              {/* Left — Info panel (lg only) */}
              <div className="hidden lg:block space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                      <LayoutDashboard className="h-4.5 w-4.5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-xl">Smart Leads</span>
                  </div>
                  <h2 className="text-3xl font-bold">
                    Start managing leads{' '}
                    <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      today
                    </span>
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Create your free sales account and get instant access to the lead management dashboard.
                  </p>
                </div>

                <div className="space-y-3">
                  {FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-muted/50 p-4 border">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Note:</strong> Registration creates a Sales account.
                    Admin accounts are provisioned by the system administrator.
                  </p>
                </div>
              </div>

              {/* Right — Form card */}
              <Card className="shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20 lg:hidden">
                    <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                  <CardDescription>Join as a Sales team member</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {formContent}

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary hover:underline font-semibold">
                      Sign in
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </FadeIn>
      </main>
    </div>
  );
}
