/**
 * NONVIPAY BACKOFFICE — useAuth Hook
 * Gestion de la session admin
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/auth.service';
import { tokenStorage } from '@/services/api';
import type { AdminUser, LoginCredentials } from '@/types';

interface AuthState {
  user:       AdminUser | null;
  isLoading:  boolean;
  isLoggedIn: boolean;
  error:      string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user:       null,
    isLoading:  true,
    isLoggedIn: false,
    error:      null,
  });

  // Charger l'utilisateur courant au montage
  useEffect(() => {
    const token = tokenStorage.getAccess();
    if (!token) {
      setState((s) => ({ ...s, isLoading: false }));
      return;
    }
    authService.me().then((res) => {
      if (res.data) {
        setState({ user: res.data, isLoading: false, isLoggedIn: true, error: null });
      } else {
        setState({ user: null, isLoading: false, isLoggedIn: false, error: null });
      }
    });
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    const res = await authService.login(credentials);
    if (res.data) {
      setState({ user: res.data.user, isLoading: false, isLoggedIn: true, error: null });
      return true;
    } else {
      setState((s) => ({ ...s, isLoading: false, error: res.error?.message ?? 'Erreur de connexion' }));
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setState({ user: null, isLoading: false, isLoggedIn: false, error: null });
    window.location.href = '/login';
  }, []);

  return { ...state, login, logout };
}
