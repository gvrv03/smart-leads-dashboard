'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { loginApi, registerApi } from '@/api/auth.api';
import { ILoginDTO, IRegisterDTO } from '@/types/auth.types';

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, logout: storeLogout, hydrate } = useAuthStore();
  const router = useRouter();

  const login = useCallback(
    async (data: ILoginDTO) => {
      const response = await loginApi(data);
      setAuth(response.user, response.token);
      router.push('/dashboard');
    },
    [setAuth, router]
  );

  const register = useCallback(
    async (data: IRegisterDTO) => {
      const response = await registerApi(data);
      setAuth(response.user, response.token);
      router.push('/dashboard');
    },
    [setAuth, router]
  );

  const logout = useCallback(() => {
    storeLogout();
    router.push('/login');
  }, [storeLogout, router]);

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    hydrate,
  };
}
