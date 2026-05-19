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
import { Separator } from '@/components/ui/separator';
import { FadeIn } from '@/components/ui/motion';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { Loader2, LayoutDashboard, Shield, Users, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const QUICK_LOGIN = {
  admin: {
    email: 'gxurav.work@gmail.com',
    password: '#Gxurav3112003',
    label: 'Admin',
    description: 'Full access',
    icon: Shield,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50',
  },
  sales: {
    email: 'itsgaurav3112003@gmail.com',
    password: 'itsgaurav3112003@gmail.com',
    label: 'Sales',
    description: 'View & update',
    icon: Users,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50',
  },
};

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quickFilled, setQuickFilled] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await login(data);
      toast.success('Login successful!');
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = (role: 'admin' | 'sales') => {
    const creds = QUICK_LOGIN[role];
    setValue('email', creds.email, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    setValue('password', creds.password, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    setQuickFilled(role);
    toast.success(`${creds.label} credentials filled`);
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          value={watchedEmail || ''}
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
          placeholder="••••••••"
          {...register('password')}
          value={watchedPassword || ''}
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
        Sign In
      </Button>
    </form>
  );

  const quickLoginContent = (
    <div className="space-y-3">
      <p className="text-xs font-medium text-muted-foreground text-center uppercase tracking-wide">
        Quick Demo Access
      </p>
      <div className="grid grid-cols-1 gap-2.5">
        {Object.entries(QUICK_LOGIN).map(([role, creds]) => (
          <button
            key={role}
            type="button"
            onClick={() => handleQuickLogin(role as 'admin' | 'sales')}
            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all w-full ${creds.bg} ${quickFilled === role ? 'ring-2 ring-primary' : ''}`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-black/20 shadow-sm shrink-0`}>
              <creds.icon className={`h-5 w-5 ${creds.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{creds.label}</p>
                {quickFilled === role && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
              </div>
              <p className="text-xs text-muted-foreground truncate">{creds.email}</p>
              <p className="text-[10px] text-muted-foreground">{creds.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingNavbar />

      <main className="relative flex-1 flex items-center justify-center">
        {/* Background — desktop only */}
        <div className="absolute inset-0 -z-10 hidden sm:block">
          <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/8 blur-[100px]" />
        </div>

        <FadeIn direction="up" duration={0.5} className="w-full">
          {/* Mobile layout — full width, no card */}
          <div className="sm:hidden w-full px-6 py-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
                <LayoutDashboard className="h-7 w-7 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold mt-4">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Sign in to your account</p>
            </div>

            {quickLoginContent}

            <div className="relative py-1">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
                or
              </span>
            </div>

            {formContent}

            <p className="text-center text-sm text-muted-foreground pt-2">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-primary hover:underline font-semibold">
                Register
              </Link>
            </p>
          </div>

          {/* Desktop layout — card */}
          <div className="hidden sm:block w-full max-w-md mx-auto px-4">
            <Card className="shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20">
                  <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                <CardDescription>Sign in to your Smart Leads account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {quickLoginContent}

                <div className="relative py-1">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                    or continue with email
                  </span>
                </div>

                {formContent}

                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link href="/register" className="text-primary hover:underline font-semibold">
                    Register
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      </main>
    </div>
  );
}
