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
import { Loader2, LayoutDashboard, Shield, Users } from 'lucide-react';
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
    icon: Shield,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10 hover:bg-amber-500/20',
  },
  sales: {
    email: 'itsgaurav3112003@gmail.com',
    password: 'itsgaurav3112003@gmail.com',
    label: 'Sales',
    icon: Users,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10 hover:bg-blue-500/20',
  },
};

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await login(data);
      toast.success('Login successful! Welcome back.');
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
    setValue('email', creds.email);
    setValue('password', creds.password);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />

      <main className="relative flex-1 flex items-center justify-center p-0 sm:p-4">
        {/* Background — hidden on mobile for clean white/dark look */}
        <div className="absolute inset-0 -z-10 hidden sm:block">
          <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
        </div>

        <FadeIn direction="up" duration={0.5}>
          {/* On mobile: no card wrapper. On desktop: card with shadow */}
          <div className="w-full max-w-md">
            {/* Mobile: plain full-width content */}
            <div className="sm:hidden px-5 py-6 space-y-6">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
                  <LayoutDashboard className="h-7 w-7 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-sm text-muted-foreground mt-1">Sign in to your Smart Leads account</p>
              </div>

              <QuickLoginButtons onQuickLogin={handleQuickLogin} />

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                  or continue with email
                </span>
              </div>

              <LoginFormContent
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                error={error}
                isSubmitting={isSubmitting}
              />

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Register
                </Link>
              </p>
            </div>

            {/* Desktop: card wrapper */}
            <Card className="hidden sm:block shadow-xl border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <LayoutDashboard className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                <CardDescription>Sign in to your Smart Leads account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <QuickLoginButtons onQuickLogin={handleQuickLogin} />

                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                    or continue with email
                  </span>
                </div>

                <LoginFormContent
                  register={register}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  errors={errors}
                  error={error}
                  isSubmitting={isSubmitting}
                />

                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link href="/register" className="text-primary hover:underline font-medium">
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

// --- Sub-components ---

function QuickLoginButtons({ onQuickLogin }: { onQuickLogin: (role: 'admin' | 'sales') => void }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground text-center">Quick Login</p>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(QUICK_LOGIN).map(([role, creds]) => (
          <button
            key={role}
            type="button"
            onClick={() => onQuickLogin(role as 'admin' | 'sales')}
            className={`flex items-center gap-2 rounded-lg border p-2.5 text-left transition-colors ${creds.bg}`}
          >
            <creds.icon className={`h-4 w-4 ${creds.color}`} />
            <div>
              <p className="text-xs font-semibold">{creds.label}</p>
              <p className="text-[10px] text-muted-foreground truncate max-w-[100px]">{creds.email}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

interface LoginFormContentProps {
  register: ReturnType<typeof useForm<LoginFormData>>['register'];
  handleSubmit: ReturnType<typeof useForm<LoginFormData>>['handleSubmit'];
  onSubmit: (data: LoginFormData) => Promise<void>;
  errors: ReturnType<typeof useForm<LoginFormData>>['formState']['errors'];
  error: string | null;
  isSubmitting: boolean;
}

function LoginFormContent({ register, handleSubmit, onSubmit, errors, error, isSubmitting }: LoginFormContentProps) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          aria-invalid={!!errors.email}
          className="h-11 w-full rounded-lg"
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          aria-invalid={!!errors.password}
          className="h-11 w-full rounded-lg"
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full h-11 rounded-lg bg-gradient-to-r from-primary to-primary/80 shadow-md shadow-primary/20 font-semibold" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </Button>
    </form>
  );
}
